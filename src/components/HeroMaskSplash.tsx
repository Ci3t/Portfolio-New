"use client";

interface HeroMaskSplashProps {
  splashRef: React.RefObject<HTMLDivElement | null>;
}

export function HeroMaskSplash({ splashRef }: HeroMaskSplashProps) {
  return (
    <div
      ref={splashRef}
      className="pointer-events-none fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="zoom-mask">
            {/* White makes the overlay visible */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black punches a hole in the mask */}
            <polygon
              className="hero-mask-shape"
              points="50,0 100,50 50,100 0,50"
              fill="black"
            />
          </mask>
        </defs>
        {/* The solid black screen that gets punched through */}
        <rect width="100%" height="100%" fill="#0a0a0c" mask="url(#zoom-mask)" />
      </svg>
    </div>
  );
}
