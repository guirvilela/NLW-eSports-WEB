import React from "react";

interface IButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<IButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};

export default Button;
