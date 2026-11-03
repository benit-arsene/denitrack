import './loading-state.css';

export default function LoadingState({
  message = 'Loading...',
  className = '',
  ...props
}) {
  return (
    <div
      className={[
        'dt-loading-state',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="dt-loading-spinner" aria-hidden="true"></div>
      <p className="dt-loading-message">{message}</p>
    </div>
  );
}

LoadingState.displayName = 'LoadingState';
