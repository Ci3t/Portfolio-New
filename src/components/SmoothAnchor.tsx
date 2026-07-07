"use client";

interface SmoothAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function SmoothAnchor({ href, children, onClick, ...props }: SmoothAnchorProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (href.startsWith("#")) {
      event.preventDefault();
      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        try {
          window.dispatchEvent(new CustomEvent("lenisScrollTo", { detail: { target } }));
        } catch (e) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
