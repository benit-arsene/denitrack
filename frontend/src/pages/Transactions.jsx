import { useState } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Badge from '../components/ui/Badge';
import RecordDebtModal from '../components/transactions/RecordDebtModal';
import RecordPaymentModal from '../components/transactions/RecordPaymentModal';
import '../components/transactions/transactions.css';

export default function Transactions() {
  const { customers, transactions, formatCurrency } = useCustomers();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [debtModalOpen, setDebtModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const customerMap = customers.reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {});

  const filteredTransactions = transactions.filter((tx) => {
    const customer = customerMap[tx.customerId];
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      customer.name.toLowerCase().includes(query) ||
      tx.description.toLowerCase().includes(query);
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    return matchesQuery && matchesType;
  });

  const TYPE_LABELS = {
    debt: 'Debt',
    payment: 'Payment',
  };

  const TYPE_VARIANTS = {
    debt: 'danger',
    payment: 'success',
  };

  return (
    <div className="page dt-transactions-page">
      <header className="page-header dt-page-header">
        <div className="dt-header-content">
          <div>
            <h2>Transactions</h2>
            <p className="page-description">
              Track all credit sales and payments.
            </p>
          </div>
          <div className="dt-action-buttons">
            <Button
              variant="outline"
              onClick={() => setDebtModalOpen(true)}
            >
              Record debt
            </Button>
            <Button
              variant="primary"
              onClick={() => setPaymentModalOpen(true)}
            >
              Record payment
            </Button>
          </div>
        </div>
      </header>

      <div className="page-body dt-page-body">
        <div className="dt-filters">
          <div className="dt-search-wrapper">
            <input
              type="search"
              placeholder="Search by customer or description"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="dt-search-field"
            />
          </div>
          <select
            className="dt-input dt-select"
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="all">All types</option>
            <option value="debt">Debt</option>
            <option value="payment">Payment</option>
          </select>
        </div>

        {filteredTransactions.length === 0 ? (
          <EmptyState
            title="No transactions"
            description="No transactions match your filters."
            action={
              <Button variant="outline" onClick={() => setDebtModalOpen(true)}>
                Record debt
              </Button>
            }
          />
        ) : (
          <div className="dt-table-wrapper">
            <table className="dt-transactions-table">
              <thead>
                <tr>
                  <th scope="col">Customer</th>
                  <th scope="col">Type</th>
                  <th scope="col">Description</th>
                  <th scope="col" className="dt-align-right">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => {
                  const customer = customerMap[tx.customerId];
                  const typeVariant = TYPE_VARIANTS[tx.type] || 'neutral';
                  return (
                    <tr key={tx.id} className="dt-transaction-row">
                      <td className="dt-tx-customer">{customer ? customer.name : 'Unknown'}</td>
                      <td>
                        <Badge variant={typeVariant}>{TYPE_LABELS[tx.type]}</Badge>
                      </td>
                      <td className="dt-tx-description">{tx.description || '—'}</td>
                      <td className="dt-align-right dt-tx-amount">
                        {tx.type === 'debt' ? '-' : '+'} {formatCurrency(tx.amount)}
                      </td>
                      <td className="dt-tx-date">{tx.date}</td>
                      <td>
                        <Badge variant="neutral">{tx.status}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

      <RecordDebtModal
        isOpen={debtModalOpen}
        onClose={() => setDebtModalOpen(false)}
      />
      <RecordPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      />
    </div>
  );
}

Transactions.displayName = 'Transactions';
