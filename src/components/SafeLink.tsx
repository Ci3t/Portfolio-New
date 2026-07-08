import Link from "next/link";

interface SafeLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
}

export function SafeLink({ href, children, ...props }: SafeLinkProps) {
  const external = isExternal(href);

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}
