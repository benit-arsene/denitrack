import Badge from '../ui/Badge';

const ATTENTION_CUSTOMERS = [
  {
    name: 'Kigali General Store',
    status: 'Payment follow-up',
    amount: 45000,
    days: 12,
  },
  {
    name: 'Nyamirambo Market',
    status: 'Overdue account',
    amount: 22000,
    days: 5,
  },
  {
    name: 'Kimironko Traders',
    status: 'Payment follow-up',
    amount: 9000,
    days: 8,
  },
];

export default function AttentionList() {
  return (
    <section className="dt-attention-list" aria-label="Customers needing attention">
      <div className="dt-section-header">
        <h2 className="dt-section-title">Customers needing attention</h2>
        <span className="dt-sample-badge">Demo data</span>
      </div>
      <div className="dt-attention-wrap">
        {ATTENTION_CUSTOMERS.map((c) => (
          <article key={c.name} className="dt-attention-card">
            <div className="dt-attention-info">
              <span className="dt-attention-name">{c.name}</span>
              <span className="dt-attention-status">{c.status}</span>
            </div>
            <div className="dt-attention-meta">
              <span className="dt-attention-due">{c.days} days overdue</span>
              <span className="dt-attention-amount">RWF {c.amount.toLocaleString('en-US')}</span>
            </div>
            <Badge variant="danger">Follow up</Badge>
          </article>
        ))}
      </div>
      <p className="dt-attention-note">
        Example accounts shown for illustration. Customer names and amounts are sample data.
      </p>
    </section>
  );
}

AttentionList.displayName = 'AttentionList';
