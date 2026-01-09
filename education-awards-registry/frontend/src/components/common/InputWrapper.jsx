function InputWrapper({
  label,
  id,
  type = "text",
  placeholder,
  error,
  value,
  onChange,
  children: icon,
  ...rest
}) {
  return (
    <div>
      <label htmlFor={id} className="label-txt">
        {label}
      </label>

      <div className="input-container">
        <input
          className={`input-field ${
            error ? "border-error" : "border-input-outline/30"
          }`}
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        <button type="button"> {icon}</button>
      </div>
      {error && (
        <div id={`${id}-error`} className="error-msg">
          {error}
        </div>
      )}
    </div>
  );
}

export default InputWrapper;
