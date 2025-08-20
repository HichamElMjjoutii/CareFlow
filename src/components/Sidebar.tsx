import React, { useEffect, useMemo, useState } from 'react';
import '../styles/Sidebar.css';

export type NavItem = {
  id: string;
  label: string;
  icon: string;   // e.g. "fas fa-chart-pie"
  href?: string;
  title?: string; // optional: tooltip when collapsed
};

export type SidebarProps = {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void; 
  collapsed?: boolean;     /** When provided with onToggle, component is controlled. */
  onToggle?: (next: boolean) => void; /** Called when user toggles collapse. */
  className?: string;
  appName?: string;
};

function cx(...p: Array<string | false | undefined>) {
  return p.filter(Boolean).join(' ');
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeId,
  onSelect,
  collapsed,
  onToggle,
  className,
  appName = 'CareFlow',
}) => {
  // Support controlled (collapsed prop) and uncontrolled (internal state) modes.
  const isControlled = typeof collapsed === 'boolean' && typeof onToggle === 'function';
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(!!collapsed);

  // Keep internal state in sync if parent controls it.
  useEffect(() => {
    if (isControlled) setInternalCollapsed(!!collapsed);
  }, [collapsed, isControlled]);

  const isCollapsed = isControlled ? !!collapsed : internalCollapsed;

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.(!isCollapsed);
    } else {
      setInternalCollapsed(prev => !prev);
    }
  };

  const asideClasses = useMemo(
    () => cx('sidebar', isCollapsed && 'is-collapsed', className),
    [isCollapsed, className]
  );

  return (
    <aside className={asideClasses} aria-label="Primary" aria-expanded={!isCollapsed}>
    <div className="logo" aria-label={`${appName} logo`}>
      <div className="logo-left">
        <div className="logo-icon">
          <i className="fa fa-leaf" aria-hidden="true" />
        </div>
        <h1 className="logo-title">{appName}</h1>
      </div>

      {/* same toggle button, same handler & icon flip */}
      <button
        type="button"
        className="collapse-btn"
        onClick={handleToggle}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-pressed={isCollapsed}
        title={isCollapsed ? 'Open' : 'Minimize'}
      >
        <i className={isCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'} aria-hidden="true" />
      </button>
    </div>
      <nav aria-label="Main">
        <ul className="nav-menu">
          {items.map(item => {
            const isActive = item.id === activeId;
            const handleClick = (e: React.MouseEvent) => {
              if (onSelect) e.preventDefault();
              onSelect?.(item.id);
            };
            return (
              <li className="nav-item" key={item.id}>
                <a
                  href={item.href || '#'}
                  className={cx('nav-link', isActive && 'active')}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={handleClick}
                  // When collapsed, the title becomes a helpful tooltip
                  title={isCollapsed ? (item.title || item.label) : undefined}
                >
                  <i className={item.icon} aria-hidden="true" />
                  <span className="nav-label">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
