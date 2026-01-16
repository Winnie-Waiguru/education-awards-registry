function FormWrapper({ onSubmit, children, ...rest }) {
  return (
    <form onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
}

export default FormWrapper;
