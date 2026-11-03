import Button from '../ui/Button';

const ACTIONS = [
  {
    label: 'Record new debt',
    description: 'Log a new credit sale',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    ),
  },
  {
    label: 'Record payment',
    description: 'Log a customer payment',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 3L9 18l6-6-4-4H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5z"></path>
      </svg>
    ),
  },
  {
    label: 'Add customer',
    description: 'Create a new customer profile',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
];

export default function QuickActions() {
  return (
    <section className="dt-quick-actions" aria-label="Quick actions">
      <h2 className="dt-section-title">Quick actions</h2>
      <div className="dt-action-grid">
        {ACTIONS.map((action) => (
          <article key={action.label} className="dt-action-card">
            <div className="dt-action-icon" aria-hidden="true">{action.icon}</div>
            <div className="dt-action-content">
              <h3 className="dt-action-title">{action.label}</h3>
              <p className="dt-action-desc">{action.description}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled
              aria-label={action.label}
              title="Action not yet connected"
            >
              Coming soon
            </Button>
          </article>
        ))}
      </div>
      <p className="dt-actions-note">Actions are UI-only placeholders and do not save data yet.</p>
    </section>
  );
}

QuickActions.displayName = 'QuickActions';
