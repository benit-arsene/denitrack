import './badge.css';

const VARIANT_CLASSES = {
  neutral: 'dt-badge dt-badge--neutral',
  success: 'dt-badge dt-badge--success',
  warning: 'dt-badge dt-badge--warning',
  danger: 'dt-badge dt-badge--danger',
  info: 'dt-badge dt-badge--info',
};

export default function Badge({
  variant = 'neutral',
  children,
  className = '',
  ...props
}) {
  const classes = [
    VARIANT_CLASSES[variant] || VARIANT_CLASSES.neutral,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';
