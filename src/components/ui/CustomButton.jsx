function CustomButton({
  children,
  variant = "light", // "light" | "dark"
  fullWidth = false, // true = เพิ่ม w-full
  className = "", // custom classes เพิ่มเติม
  ...props // onClick, disabled, etc.
}) {
  const baseClass =
    "h-12 px-10 py-3 flex items-center justify-center gap-1.5 text-body-1 rounded-full transition-colors cursor-pointer";

  const widthClass = fullWidth ? "w-full" : "w-fit";

  const variantClass = {
    light:
      "text-brown-600 hover:text-brown-300 bg-white border border-brown-400 hover:border-brown-300",
    dark: "text-white bg-brown-600 hover:bg-brown-400",
  };

  return (
    <button
      className={`${widthClass} ${baseClass} ${variantClass[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default CustomButton;
