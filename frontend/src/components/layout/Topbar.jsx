import { useLocation } from 'react-router-dom';
import { PAGE_TITLES } from './navItems';

export default function Topbar() {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] || 'DeniTrack';

  return (
    <header className="topbar" role="banner">
      <div className="topbar-inner">
        <div className="topbar-start">
          <h1 className="topbar-title">{title}</h1>
        </div>
        <div className="topbar-center" hidden>
          <span className="visually-hidden">DeniTrack navigation</span>
        </div>
        <div className="topbar-end">
          <button className="topbar-icon-btn" aria-label="Notifications" title="Notifications" aria-haspopup="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <button className="topbar-icon-btn topbar-icon-btn--avatar" aria-label="User profile" title="Profile">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="7"></circle>
              <path d="M5 21v-3a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v3"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
