import { ReactNode } from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
  props?: LinkProps;
}

export default function Link({ children, href, props }: LinkProps) {
  return (
    <a
      className="h-fit rounded-md bg-green-500 px-2 py-1 text-base font-bold text-slate-950 hover:bg-green-300"
      href={href}
      {...props}
    >
      {children}
    </a>
  );
}
