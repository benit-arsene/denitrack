import Badge from '../ui/Badge';
import './customers.css';

const STATUS_INFO = {
  active: { label: 'Active', variant: 'success' },
  overdue: { label: 'Payment follow-up', variant: 'danger' },
  current: { label: 'Current', variant: 'neutral' },
};

export default function CustomerRow({ customer, onSelect }) {
  const statusInfo = STATUS_INFO[customer.status] || STATUS_INFO.current;

  return (
    <article
      className="dt-customer-row"
      onClick={() => onSelect(customer.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(customer.id);
        }
      }}
    >
      <div className="dt-customer-avatar" aria-hidden="true">
        {customer.name.charAt(0)}
      </div>
      <div className="dt-customer-info">
        <h3 className="dt-customer-name">{customer.name}</h3>
        <div className="dt-customer-meta">
          <span className="dt-customer-phone" aria-label="Phone">{customer.phone}</span>
          <span className="dt-customer-divider">·</span>
          <span className="dt-customer-joined">Joined {customer.joinedAt}</span>
        </div>
      </div>
      <div className="dt-customer-status">
        <Badge variant={statusInfo.variant} className="dt-customer-status-badge">
          {statusInfo.label}
        </Badge>
      </div>
      <div className="dt-customer-balance">
        <span className="dt-balance-label">Outstanding</span>
        <span className="dt-balance-amount">{`RWF ${customer.outstandingBalance.toLocaleString('en-US')}`}</span>
      </div>
      <button className="dt-customer-select" aria-label={`View profile for ${customer.name}`} title="View profile">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </article>
  );
}

CustomerRow.displayName = 'CustomerRow';
