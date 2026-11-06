import type React from "react";

type ButtonProps = {
  children: React.ReactElement | string;
  style?: "Danger" | "Default";
  type?: "submit" | "button";
  onClick?: () => void;
  className?: string;
};

const styles = {
  Danger: "bg-rose-600 text-white",
  Default: "bg-gray-100",
};

const Button = ({
  children,
  onClick,
  style = "Default",
  type = "button",
  className = "",
}: ButtonProps) => {
  const styleClass = styles[style] ?? styles.Default;

  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 py-3 px-4 h-12 rounded-lg text-md cursor-pointer button-hover ${styleClass} ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
