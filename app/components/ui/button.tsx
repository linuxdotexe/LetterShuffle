import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  props?: ButtonProps;
}

export default function Button({ children, props }: ButtonProps) {
  return (
    <button
      className="h-fit rounded-md bg-green-500 px-2 py-1 text-base font-bold text-slate-950 hover:bg-green-600"
      {...props}
    >
      {children}
    </button>
  );
}
