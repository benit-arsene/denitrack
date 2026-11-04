import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCustomers } from '../hooks/useCustomers';
import Badge from '../components/ui/Badge';
import './../components/customers/customers.css';

export default function CustomerDetail() {
  const { id } = useParams();
  const {
    getCustomer,
    getCustomerTransactions,
    getCustomerBalance,
    CUSTOMER_STATUSES,
    computeStatus,
    formatCurrency,
  } = useCustomers();

  const customer = getCustomer(id);

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

  const customerTransactions = getCustomerTransactions(customer.id);
  const balance = getCustomerBalance(customer.id);
  const creditLimit = customer.creditLimit || 0;
  const status = computeStatus(balance, creditLimit);
  const statusInfo = CUSTOMER_STATUSES[status] || CUSTOMER_STATUSES.current;

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
            <p className="page-description">{customer.notes || 'No additional notes.'}</p>
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
                  {creditLimit > 0 ? formatCurrency(creditLimit) : 'Not set'}
                </span>
              </div>
              <div className="dt-detail-field">
                <span className="dt-detail-label">Customer since</span>
                <span className="dt-detail-value">{customer.joinedAt}</span>
              </div>
              <div className="dt-detail-field">
                <span className="dt-detail-label">Notes</span>
                <span className="dt-detail-value">
                  {customer.notes || 'Not specified'}
                </span>
              </div>
            </div>
          </div>

          <div className="dt-detail-summary">
            <div className="dt-summary-card">
              <div className="dt-summary-label">Outstanding balance</div>
              <div className="dt-summary-amount">{formatCurrency(balance)}</div>
              <Badge variant={statusInfo.variant} className="dt-status-badge">
                {statusInfo.label}
              </Badge>
            </div>
          </div>
        </div>

        <section className="dt-transactions-section">
          <div className="dt-section-header">
            <h2 className="dt-section-title">Transaction history</h2>
            <p className="dt-section-subtitle">
              All credit sales and payments for {customer.name}.
            </p>
          </div>

          {customerTransactions.length === 0 ? (
            <div className="dt-empty-transactions">
              <p>No transactions recorded yet.</p>
            </div>
          ) : (
            <table className="dt-transactions-table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Type</th>
                  <th scope="col">Description</th>
                  <th scope="col" className="dt-align-right">Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {customerTransactions.map((tx) => {
                  const typeVariant = tx.type === 'debt' ? 'danger' : 'success';
                  return (
                    <tr key={tx.id} className="dt-transaction-row">
                      <td className="dt-tx-date">{tx.date}</td>
                      <td>
                        <Badge variant={typeVariant}>
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </Badge>
                      </td>
                      <td className="dt-tx-description">{tx.description || '—'}</td>
                      <td className="dt-align-right dt-tx-amount">
                        {tx.type === 'debt' ? '-' : '+'} {formatCurrency(tx.amount)}
                      </td>
                      <td>
                        <Badge variant="neutral">{tx.status}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}

CustomerDetail.displayName = 'CustomerDetail';
