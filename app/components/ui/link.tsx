import { ReactNode } from "react";
import Link from "next/link";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
  isExternal?: boolean;
  props?: LinkProps;
  small?: boolean;
}

export default function Anchor({
  children,
  href,
  isExternal = false,
  className,
  small = false,
  props,
}: LinkProps) {
  return (
    <Link
      className={`group inline-flex items-center font-medium ${small ? "text-sm lg:text-base" : "text-base lg:text-lg"} ${className}`}
      href={href}
      {...props}
    >
      {children}
      {isExternal ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={`${small ? "20" : "24"}`}
          height={`${small ? "20" : "24"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:animate-pulse"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      ) : (
        <></>
      )}
    </Link>
  );
}
