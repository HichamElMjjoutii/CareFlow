import Sidebar, { NavItem } from './components/Sidebar';
import { usePersistentState } from './hooks/usePersistentState';
import Dashboard from './pages/Dashboard';

function ComingSoon({ title }: { title: string }) {
  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '.5rem' }}>{title}</h2>
      <p style={{ opacity: .75 }}>This section isn’t implemented yet.</p>
    </div>
  );
}

export default function App() {
  const [collapsed, setCollapsed] = usePersistentState<boolean>('ui.layout.sidebarCollapsed', false);
  const [activePage, setActivePage] = usePersistentState<string>('ui.layout.activePage', 'dashboard');

  const items: NavItem[] = [
    { id: 'dashboard',     label: 'Dashboard',      icon: 'fas fa-chart-pie' },
    { id: 'patients',      label: 'Patients',       icon: 'fas fa-users' },
    { id: 'appointments',  label: 'Appointments',   icon: 'fas fa-calendar-alt' },
    { id: 'records',       label: 'Medical Records',icon: 'fas fa-file-medical' },
    { id: 'prescriptions', label: 'Prescriptions',  icon: 'fas fa-pills' },
    { id: 'analytics',     label: 'Analytics',      icon: 'fas fa-chart-line' },
    { id: 'users',         label: 'Users',          icon: 'fas fa-user-friends' }, // FA fix
    { id: 'ai perks',         label: 'Ai Perks',          icon: 'fa fa-cube' },
  ];

  return (
    <div
      className="app-shell"
      style={{
        display: 'grid',
        gridTemplateColumns: `${collapsed ? '84px' : '280px'} 1fr`,
        minHeight: '100vh'
      }}
    >
      <Sidebar
        items={items}
        activeId={activePage}
        onSelect={setActivePage}
        collapsed={collapsed}
        onToggle={setCollapsed}
        appName="Careflow"
      />

      <main style={{ padding: 24 }}>
        {activePage === 'dashboard'
          ? <Dashboard />
          : <ComingSoon title={items.find(i => i.id === activePage)?.label ?? 'Page'} />
        }
      </main>
    </div>
  );
}
