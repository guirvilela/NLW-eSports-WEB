import React from "react";

interface ILabel {
  children: React.ReactNode;
}

export const Label: React.FC<ILabel> = ({ children }) => {
  return <label className="font-semibold">{children}</label>;
};
