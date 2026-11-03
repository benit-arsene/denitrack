import './button.css';

const VARIANT_CLASSES = {
  primary: 'dt-button',
  secondary: 'dt-button dt-button--secondary',
  outline: 'dt-button dt-button--outline',
  danger: 'dt-button dt-button--danger',
};

const SIZE_CLASSES = {
  sm: 'dt-button--sm',
  md: '',
  lg: 'dt-button--lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  onClick,
  leading,
  trailing,
  children,
  ...props
}) {
  const classes = [
    VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary,
    SIZE_CLASSES[size] || '',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (event) => {
    if (disabled || loading) return;
    if (typeof onClick === 'function') onClick(event);
  };

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading ? (
        <span className="dt-button-spinner" aria-hidden="true"></span>
      ) : (
        <>
          {leading && <span className="dt-button-leading">{leading}</span>}
          {children}
          {trailing && <span className="dt-button-trailing">{trailing}</span>}
        </>
      )}
    </button>
  );
}

Button.displayName = 'Button';
