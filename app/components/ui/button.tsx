import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  props?: ButtonProps;
}

export default function Button({ children, props }: ButtonProps) {
  return (
    <button
      className="rounded-md rounded-s-none border-y-2 border-green-500 bg-green-500 p-2 py-[0.64rem] text-base font-bold text-slate-950 hover:border-green-600 hover:bg-green-600"
      {...props}
    >
      {children}
    </button>
  );
}
