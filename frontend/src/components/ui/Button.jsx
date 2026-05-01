export default function Button({
  as: Component = "button",
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <Component
      {...props}
      className={`button button-${variant} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
