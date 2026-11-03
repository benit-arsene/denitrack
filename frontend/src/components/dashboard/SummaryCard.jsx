import './dashboard.css';

const TREND_ICONS = {
  up: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="18 6 12 12 6 6"></polyline>
    </svg>
  ),
  down: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 18 12 12 18 18"></polyline>
    </svg>
  ),
  none: null,
};

const TREND_VARIANT = {
  up: 'dt-summary-trend--up',
  down: 'dt-summary-trend--down',
  none: 'dt-summary-trend--none',
};

export default function SummaryCard({
  label,
  value,
  icon,
  trend,
  sample = true,
  className = '',
}) {
  const trendClass = trend ? TREND_VARIANT[trend.direction] || '' : '';
  const trendLabel = trend ? trend.label : null;

  return (
    <article
      className={[
        'dt-summary-card',
        trend ? 'dt-summary-card--has-trend' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="dt-summary-card-body">
        <div className="dt-summary-card-header">
          <span className="dt-summary-label">{label}</span>
          {sample && (
            <span className="dt-summary-sample">Demo data</span>
          )}
        </div>
        <div className="dt-summary-value">{value}</div>
        {icon && <div className="dt-summary-icon" aria-hidden="true">{icon}</div>}
        {trend && (
          <div className={[
            'dt-summary-trend',
            trendClass,
          ].filter(Boolean).join(' ')}>
            {TREND_ICONS[trend.direction]}
            {trendLabel && <span className="dt-summary-trend-label">{trendLabel}</span>}
          </div>
        )}
      </div>
    </article>
  );
}

SummaryCard.displayName = 'SummaryCard';
