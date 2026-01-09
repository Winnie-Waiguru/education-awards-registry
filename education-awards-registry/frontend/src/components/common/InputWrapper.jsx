function InputWrapper({
  label,
  htmlFor,
  type = "text",
  placeholder,
  children,
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label-txt">
        {label}
      </label>
      <br />
      <div className="input-container">
        <input
          className="input-field"
          type={type}
          id={htmlFor}
          name={htmlFor}
          placeholder={placeholder}
        />
        {children}
      </div>
    </div>
  );
}

export default InputWrapper;
