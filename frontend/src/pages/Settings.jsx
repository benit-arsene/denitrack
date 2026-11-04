import { useState } from 'react';
import { SETTINGS_SECTIONS } from '../components/settings/settingsSections';
import BusinessProfile from '../components/settings/BusinessProfile';
import AccountSettings from '../components/settings/AccountSettings';
import Preferences from '../components/settings/Preferences';
import Notifications from '../components/settings/Notifications';
import SecurityData from '../components/settings/SecurityData';
import '../components/settings/settings.css';

const SECTION_COMPONENTS = {
  business: BusinessProfile,
  account: AccountSettings,
  preferences: Preferences,
  notifications: Notifications,
  security: SecurityData,
};

const SECTION_ICONS = {
  business: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" ry="1"></rect>
      <rect x="14" y="3" width="7" height="7" rx="1" ry="1"></rect>
      <rect x="14" y="14" width="7" height="7" rx="1" ry="1"></rect>
      <rect x="3" y="14" width="7" height="7" rx="1" ry="1"></rect>
    </svg>
  ),
  account: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  preferences: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1h-1a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H15a1.65 1.65 0 0 0 1 1.51V11a2 2 0 0 1 2 2h4a2 2 0 0 1 2 2v1a1.65 1.65 0 0 0 1.51 1 1.65 1.65 0 0 0 1-1h1a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z"></path>
    </svg>
  ),
  notifications: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  security: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
};

export default function Settings() {
  const [activeSection, setActiveSection] = useState('business');
  const SectionComponent = SECTION_COMPONENTS[activeSection];

  return (
    <div className="page dt-settings-page">
      <header className="page-header dt-page-header">
        <div className="dt-header-content">
          <div>
            <h2>Settings</h2>
            <p className="page-description">Manage your business and application preferences.</p>
          </div>
        </div>
      </header>

      <div className="dt-settings-body">
        <nav className="dt-settings-nav" aria-label="Settings sections">
          <ul className="dt-settings-nav-list">
            {SETTINGS_SECTIONS.map((item) => {
              const active = activeSection === item.key;
              return (
                <li key={item.key}>
                  <button
                    className={`dt-settings-nav-link ${active ? 'dt-settings-nav-link--active' : ''}`}
                    onClick={() => setActiveSection(item.key)}
                    aria-pressed={active}
                  >
                    <span className="dt-settings-nav-icon" aria-hidden="true">
                      {SECTION_ICONS[item.key]}
                    </span>
                    <span className="dt-settings-nav-label">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <main className="dt-settings-content">
          <div className="dt-mobile-section-selector">
            <label htmlFor="mobile-section-select" className="dt-section-select-label">Section</label>
            <select
              id="mobile-section-select"
              className="dt-section-select"
              value={activeSection}
              onChange={(event) => setActiveSection(event.target.value)}
            >
              {SETTINGS_SECTIONS.map((item) => (
                <option key={item.key} value={item.key}>{item.label}</option>
              ))}
            </select>
          </div>
          <SectionComponent />
        </main>
      </div>
    </div>
  );
}

Settings.displayName = 'Settings';
