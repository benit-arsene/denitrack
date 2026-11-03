import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from './navItems';

const MobileIcon = ({ name, active }) => {
  const color = active ? '#60A5FA' : '#737373';
  const icons = {
    overview: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" ry="1"></rect>
        <rect x="14" y="3" width="7" height="7" rx="1" ry="1"></rect>
        <rect x="14" y="14" width="7" height="7" rx="1" ry="1"></rect>
        <rect x="3" y="14" width="7" height="7" rx="1" ry="1"></rect>
      </svg>
    ),
    customers: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
      </svg>
    ),
    transactions: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>
    ),
    reports: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
    settings: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33"></path>
      </svg>
    ),
  };

  return icons[name];
};

export default function MobileNavigation() {
  const { pathname } = useLocation();

  return (
    <nav className="mobile-nav" aria-label="Bottom navigation">
      <ul className="mobile-nav-list">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.path;
          return (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link--active' : ''}`}
                end={item.path === '/overview'}
              >
                <span className="mobile-nav-icon">
                  <MobileIcon name={item.label.toLowerCase()} active={active} />
                </span>
                <span className="mobile-nav-label">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
