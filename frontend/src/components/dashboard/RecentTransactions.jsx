import Badge from '../ui/Badge';

const TRANSACTIONS = [
  {
    customer: 'Kigali General Store',
    type: 'Credit sale',
    date: '02 Nov 2026',
    amount: 45000,
    kind: 'sale',
  },
  {
    customer: 'Nyamirambo Market',
    type: 'Payment received',
    date: '01 Nov 2026',
    amount: 12000,
    kind: 'payment',
  },
  {
    customer: 'Kimironko Traders',
    type: 'Credit sale',
    date: '31 Oct 2026',
    amount: 28000,
    kind: 'sale',
  },
  {
    customer: 'Gikondo Shop',
    type: 'Payment received',
    date: '30 Oct 2026',
    amount: 15000,
    kind: 'payment',
  },
  {
    customer: 'Remera Supplies',
    type: 'Credit sale',
    date: '29 Oct 2026',
    amount: 18000,
    kind: 'sale',
  },
];

export default function RecentTransactions() {
  return (
    <section className="dt-recent-transactions" aria-label="Recent transactions">
      <div className="dt-section-header">
        <h2 className="dt-section-title">Recent transactions</h2>
        <span className="dt-sample-badge">Demo data</span>
      </div>
      <div className="dt-table-wrap">
        <table className="dt-transactions-table">
          <thead>
            <tr>
              <th scope="col">Customer</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col" className="dt-align-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((tx) => (
              <tr key={`${tx.customer}-${tx.date}`} className="dt-transaction-row">
                <td className="dt-tx-customer">{tx.customer}</td>
                <td>
                  <Badge variant={tx.kind === 'sale' ? 'info' : 'success'}>
                    {tx.type}
                  </Badge>
                </td>
                <td className="dt-tx-date">{tx.date}</td>
                <td className="dt-align-right dt-tx-amount">
                  RWF {tx.amount.toLocaleString('en-US')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

RecentTransactions.displayName = 'RecentTransactions';
