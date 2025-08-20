// electron/main.ts
import { app, BrowserWindow,screen} from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import net from 'node:net';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DEV_URL = process.env.ELECTRON_RENDERER_URL || 'http://localhost:5173';
const wantDev = process.env.VITE_DEV_SERVER === 'true';

function isPortOpen(port: number, host = '127.0.0.1', timeout = 400): Promise<boolean> {
  return new Promise((resolve) => {
    const s = net.connect({ port, host });
    const done = (ok: boolean) => {
      try { s.destroy(); } catch {}
      resolve(ok);
    };
    s.on('connect', () => done(true));
    s.on('error', () => done(false));
    setTimeout(() => done(false), timeout);
  });
}

async function loadRenderer(win: BrowserWindow) {
  console.log('[main] VITE_DEV_SERVER =', process.env.VITE_DEV_SERVER);

  if (wantDev && await isPortOpen(5173)) {
    console.log('[main] Loading DEV URL:', DEV_URL);
    await win.loadURL(DEV_URL);
    win.webContents.openDevTools({ mode: 'detach' });
    return;
  }

  const indexFile = path.join(process.cwd(), 'dist', 'index.html');
  console.log('[main] Loading FILE:', indexFile);
  await win.loadFile(indexFile);
}

async function createWindow() {
  const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
  const { x, y, width, height } = display.workArea; // excludes taskbar/dock
  const win = new BrowserWindow({
    // width: 1000,
    // height: 700,
    x, y, width, height,
    show: false,
    useContentSize: true,   // size refers to web content, not including frame     
    autoHideMenuBar: true, 
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      
      preload: path.join(__dirname, 'preload.js'), // make sure this file exists
    },
  });

  try {
    await loadRenderer(win);
    win.maximize();            // fills the work area of that display
    win.show();
  } catch (err) {
    console.error('Failed to load renderer:', err);
  }

  win.webContents.on('did-fail-load', (_e, code, desc, url) => {
    console.error('did-fail-load:', { code, desc, url });
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
