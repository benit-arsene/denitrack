import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';
import Badge from '../ui/Badge';
import './customers.css';

export default function CustomerRow({ customer }) {
  const navigate = useNavigate();
  const { getCustomerBalance, CUSTOMER_STATUSES, computeStatus, formatCurrency } =
    useCustomers();

  const balance = getCustomerBalance(customer.id);
  const creditLimit = customer.creditLimit || 0;
  const status = computeStatus(balance, creditLimit);
  const statusInfo = CUSTOMER_STATUSES[status] || CUSTOMER_STATUSES.current;

  const handleSelect = () => {
    navigate(`/customers/${customer.id}`);
  };

  return (
    <article
      className="dt-customer-row"
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleSelect();
        }
      }}
    >
      <div className="dt-customer-top">
        <div className="dt-customer-avatar" aria-hidden="true">
          {customer.name.charAt(0)}
        </div>
        <div className="dt-customer-info">
          <h3 className="dt-customer-name">{customer.name}</h3>
          <div className="dt-customer-meta">
            <span className="dt-customer-phone" aria-label="Phone">{customer.phone}</span>
          </div>
        </div>
      </div>
      <div className="dt-customer-footer">
        <Badge variant={statusInfo.variant} className="dt-customer-status-badge">
          {statusInfo.label}
        </Badge>
        <div className="dt-customer-balance">
          <span className="dt-balance-label">Outstanding</span>
          <span className="dt-balance-amount">{formatCurrency(balance)}</span>
        </div>
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
