import { ReactNode } from "react";

interface buttonType {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const Button = ({ children, type,  disabled, onClick }: buttonType) => {
  return (
    <button
      className="mt-4 w-full min-w-[110px] bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
