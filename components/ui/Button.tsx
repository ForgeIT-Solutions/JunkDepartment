import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "dark" | "outline-dark";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  dark: "btn-dark",
  "outline-dark": "btn-outline-dark",
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", className, children } = props;
  const cls = clsx(variantClass[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={clsx(cls, props.disabled && "opacity-60 cursor-not-allowed")}
    >
      {children}
    </button>
  );
}
