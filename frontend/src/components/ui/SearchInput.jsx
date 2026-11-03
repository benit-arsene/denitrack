import './search-input.css';

const SEARCH_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CLEAR_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function SearchInput({
  value = '',
  onChange,
  placeholder = 'Search',
  disabled = false,
  className = '',
  ...props
}) {
  const handleChange = (event) => {
    if (typeof onChange === 'function') onChange(event.target.value);
  };

  const handleClear = (event) => {
    event.preventDefault();
    if (typeof onChange === 'function') onChange('');
  };

  return (
    <div
      className={[
        'dt-search-input',
        className,
      ].filter(Boolean).join(' ')}
    >
      {SEARCH_ICON}
      <input
        className="dt-search-field"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        spellCheck={false}
        {...props}
      />
      {value.length > 0 && (
        <button
          type="button"
          className="dt-search-clear"
          onClick={handleClear}
          aria-label="Clear search"
          title="Clear search"
        >
          {CLEAR_ICON}
        </button>
      )}
    </div>
  );
}

SearchInput.displayName = 'SearchInput';
