import { useId } from 'react';
import './input.css';

export default function Input({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error = false,
  helperText,
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const describedBy = error || helperText ? `${inputId}-helper` : undefined;

  return (
    <div className="dt-input-field">
      {label && (
        <label className="dt-input-label" htmlFor={inputId}>
          {label}{required ? ' *' : ''}
        </label>
      )}
      <div className="dt-input-wrapper">
        <input
          id={inputId}
          className={[
            'dt-input',
            error ? 'dt-input--error' : '',
            className,
          ].filter(Boolean).join(' ')}
          type={type}
          value={value !== undefined && value !== null ? value : ''}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          {...props}
        />
      </div>
      {(error || helperText) && (
        <p
          id={`${inputId}-helper`}
          className={[
            'dt-input-helper',
            error ? 'dt-input-helper--error' : '',
          ].filter(Boolean).join(' ')}
        >
          {error && helperText ? helperText : error ? '' : helperText}
        </p>
      )}
    </div>
  );
}

Input.displayName = 'Input';
