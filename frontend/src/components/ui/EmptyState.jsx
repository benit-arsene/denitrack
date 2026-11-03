import './empty-state.css';

const DEFAULT_ICON = (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" ry="1"></rect>
    <rect x="14" y="3" width="7" height="7" rx="1" ry="1"></rect>
    <rect x="14" y="14" width="7" height="7" rx="1" ry="1"></rect>
    <rect x="3" y="14" width="7" height="7" rx="1" ry="1"></rect>
  </svg>
);

export default function EmptyState({
  icon = DEFAULT_ICON,
  title,
  description,
  action,
  className = '',
}) {
  return (
    <div
      className={[
        'dt-empty-state',
        className,
      ].filter(Boolean).join(' ')}
    >
      {icon}
      {title && <h2 className="dt-empty-title">{title}</h2>}
      {description && <p className="dt-empty-description">{description}</p>}
      {action && (
        <div className="dt-empty-action">{action}</div>
      )}
    </div>
  );
}

EmptyState.displayName = 'EmptyState';
