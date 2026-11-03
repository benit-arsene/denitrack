import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from './navItems';

const SidebarIcon = ({ name, size = 20, active }) => {
  const color = active ? '#60A5FA' : '#A3A3A3';
  const icons = {
    overview: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" ry="1"></rect>
        <rect x="14" y="3" width="7" height="7" rx="1" ry="1"></rect>
        <rect x="14" y="14" width="7" height="7" rx="1" ry="1"></rect>
        <rect x="3" y="14" width="7" height="7" rx="1" ry="1"></rect>
      </svg>
    ),
    customers: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    transactions: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>
    ),
    reports: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1h-1a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H15a1.65 1.65 0 0 0 1 1.51V11a2 2 0 0 1 2 2h4a2 2 0 0 1 2 2v1a1.65 1.65 0 0 0 1.51 1 1.65 1.65 0 0 0 1-1h1a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z"></path>
      </svg>
    ),
  };

  return icons[name] || <span>{name}</span>;
};

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18V3H3z"></path>
            <path d="M9 9h6v6H9z"></path>
          </svg>
        </div>
        <span className="brand-text">DeniTrack</span>
      </div>
      <nav className="sidebar-nav" aria-label="Primary">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.path;
          const keyName = item.label.toLowerCase();
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
              end={item.path === '/overview'}
            >
              <span className="sidebar-icon">
                <SidebarIcon name={keyName} active={active} />
              </span>
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
