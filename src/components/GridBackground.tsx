export function GridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 grid-pulse"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
      }}
      aria-hidden="true"
    />
  );
}
