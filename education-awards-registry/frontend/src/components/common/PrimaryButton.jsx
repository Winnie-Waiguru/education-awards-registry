function PrimaryButton({ onClick, type = "button", label }) {
  return (
    <button className="primary-btn" type={type} onClick={onClick}>
      {label}
    </button>
  );
}

export default PrimaryButton;
