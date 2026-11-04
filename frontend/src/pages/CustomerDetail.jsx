import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import { DEMO_CUSTOMERS, CUSTOMER_STATUSES, formatRWF } from '../data/customers';
import './../components/customers/customers.css';

export default function CustomerDetail() {
  const { id } = useParams();
  const customer = DEMO_CUSTOMERS.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="page dt-customer-not-found">
        <header className="page-header">
          <h2>Customer not found</h2>
        </header>
        <div className="page-body">
          <p>The customer you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const statusInfo = CUSTOMER_STATUSES[customer.status] || CUSTOMER_STATUSES.current;

  return (
    <div className="page dt-customer-detail-page">
      <header className="page-header dt-page-header">
        <div className="dt-header-content">
          <div>
            <Link to="/customers" className="dt-back-link" aria-label="Back to customers">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to customers
            </Link>
            <h1>{customer.name}</h1>
            <p className="page-description">{customer.location}</p>
          </div>
        </div>
      </header>

      <div className="page-body dt-page-body">
        <div className="dt-detail-grid">
          <div className="dt-detail-info">
            <div className="dt-detail-card">
              <div className="dt-detail-field">
                <span className="dt-detail-label">Phone</span>
                <span className="dt-detail-value">{customer.phone}</span>
              </div>
              <div className="dt-detail-field">
                <span className="dt-detail-label">Credit limit</span>
                <span className="dt-detail-value">
                  {customer.creditLimit > 0 ? formatRWF(customer.creditLimit) : 'Not set'}
                </span>
              </div>
              <div className="dt-detail-field">
                <span className="dt-detail-label">Customer since</span>
                <span className="dt-detail-value">{customer.joinedAt}</span>
              </div>
              <div className="dt-detail-field">
                <span className="dt-detail-label">Location</span>
                <span className="dt-detail-value">
                  {customer.location || 'Not specified'}
                </span>
              </div>
            </div>
          </div>

          <div className="dt-detail-summary">
            <div className="dt-summary-card">
              <div className="dt-summary-label">Outstanding balance</div>
              <div className="dt-summary-amount">{formatRWF(customer.outstandingBalance)}</div>
              <Badge variant={statusInfo.variant} className="dt-status-badge">
                {statusInfo.label}
              </Badge>
            </div>
          </div>
        </div>

        <section className="dt-transactions-section">
          <div className="dt-section-header">
            <h2 className="dt-section-title">Transaction history</h2>
            <p className="dt-section-subtitle">All credit sales and payments for {customer.name}.</p>
          </div>

          {customer.transactions.length === 0 ? (
            <div className="dt-empty-transactions">
              <p>No transactions recorded yet.</p>
            </div>
          ) : (
            <table className="dt-transactions-table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Type</th>
                  <th scope="col" className="dt-align-right">Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {customer.transactions.map((tx) => (
                  <tr key={tx.id} className="dt-transaction-row">
                    <td className="dt-tx-date">{tx.date}</td>
                    <td>
                      <Badge variant={tx.type === 'Credit sale' ? 'info' : 'success'}>
                        {tx.type}
                      </Badge>
                    </td>
                    <td className="dt-align-right dt-tx-amount">
                      {tx.type === 'Credit sale' ? '-' : '+'} {formatRWF(tx.amount)}
                    </td>
                    <td>
                      <Badge variant={tx.status === 'paid' ? 'success' : 'danger'}>
                        {tx.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}

CustomerDetail.displayName = 'CustomerDetail';
