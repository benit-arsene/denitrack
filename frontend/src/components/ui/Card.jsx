import './card.css';

export default function Card({
  title,
  description,
  children,
  className = '',
  padded = true,
  elevated = false,
}) {
  const classes = [
    'dt-card',
    padded ? 'dt-card--padded' : '',
    elevated ? 'dt-card--elevated' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {title || description ? (
        <div className="dt-card-body">
          {title && <h3 className="dt-card-title">{title}</h3>}
          {description && <p className="dt-card-description">{description}</p>}
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

Card.displayName = 'Card';
