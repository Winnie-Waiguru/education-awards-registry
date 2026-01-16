import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [inputType, setInputType] = useState(type);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setInputType(isPasswordVisible ? type : "text");
    setIsPasswordVisible(!isPasswordVisible);
  };

  // check if the input type is password to show the toggle icon
  const iconToShow = type === "password";

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
          type={inputType}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {iconToShow ? (
            isPasswordVisible ? (
              <FaEye className="icon" />
            ) : (
              <FaEyeSlash className="icon" />
            )
          ) : (
            icon
          )}
        </button>
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
