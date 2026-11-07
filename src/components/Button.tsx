import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement | string;
  theme?: "Danger" | "Default";
  type?: "submit" | "button";
  onClick?: () => void;
  className?: string;
}

const styles = {
  Danger: "bg-rose-600 text-white",
  Default: "bg-gray-100",
};

const Button = ({
  children,
  onClick,
  theme = "Default",
  type = "button",
  className = "",
  ...rest
}: ButtonProps) => {
  const styleClass = styles[theme] ?? styles.Default;
  const { disabled } = rest;

  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 py-3 px-4 h-12 rounded-lg text-md ${!disabled ? "cursor-pointer button-hover" : "cursor-not-allowed opacity-60 bg-gray-300"} ${styleClass} ${className}`}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
