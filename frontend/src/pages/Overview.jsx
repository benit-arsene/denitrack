import SummaryCard from '../components/dashboard/SummaryCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import AttentionList from '../components/dashboard/AttentionList';
import '../components/dashboard/dashboard.css';

const formatRWF = (amount) => {
  return `RWF ${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
};

const OVERVIEW_ICONS = {
  debt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  ),
  payments: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  ),
  customers: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
    </svg>
  ),
  overdue: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
      <line x1="12" y1="12" x2="12.01" y2="12"></line>
    </svg>
  ),
};

export default function Overview() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let dateLabel;
  try {
    dateLabel = now.toLocaleDateString('en-RW', options);
  } catch {
    dateLabel = now.toLocaleDateString(undefined, options);
  }

  const hour = now.getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="page">
      <header className="page-header">
        <div className="dt-dashboard-header">
          <h1 className="dt-dashboard-greeting">{greeting}</h1>
          <p className="dt-dashboard-description">
            Here is a summary of your business credit activity.
          </p>
          <div className="dt-dashboard-meta">
            <span aria-hidden="true">{dateLabel}</span>
          </div>
        </div>
      </header>

      <div className="dt-dashboard-divider" aria-hidden="true"></div>

      {/* Summary cards */}
      <section className="dt-summary-grid" aria-label="Summary cards">
        <SummaryCard
          label="Total outstanding debt"
          value={formatRWF(85000)}
          icon={OVERVIEW_ICONS.debt}
          trend={{ direction: 'down', label: '12% vs last month' }}
          sample
        />
        <SummaryCard
          label="Payments collected"
          value={formatRWF(27000)}
          icon={OVERVIEW_ICONS.payments}
          trend={{ direction: 'up', label: '8% vs last month' }}
          sample
        />
        <SummaryCard
          label="Total customers"
          value={14}
          icon={OVERVIEW_ICONS.customers}
          trend={{ direction: 'up', label: '2 new this week' }}
          sample
        />
        <SummaryCard
          label="Overdue accounts"
          value={3}
          icon={OVERVIEW_ICONS.overdue}
          trend={{ direction: 'down', label: '1 resolved' }}
          sample
        />
      </section>

      {/* Quick actions */}
      <QuickActions />

      {/* Recent transactions */}
      <RecentTransactions />

      {/* Customers needing attention */}
      <AttentionList />
    </div>
  );
}
