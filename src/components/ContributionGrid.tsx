"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const TOOLTIPS = [
  "Built UI",
  "AI Experiment",
  "Refactored Core",
  "Shipped Feature",
  "Squashed Bug",
  "Code Review",
  "System Design",
];

const INTENSITIES = [
  "bg-surface-container", // 0
  "bg-success-dimmer", // 1
  "bg-success-dim", // 2
  "bg-success", // 3
];

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateGrid() {
  const weeks = 52;
  const days = 7;
  const grid = [];
  let seed = 42;

  for (let w = 0; w < weeks; w++) {
    const week = [];
    const weekSeed = seededRandom(w * 7 + 100);
    const isSprintWeek = weekSeed > 0.72;
    const isQuietWeek = weekSeed < 0.13;

    for (let d = 0; d < days; d++) {
      seed++;
      const r = seededRandom(seed);
      const isWeekend = d === 0 || d === 6;

      let intensityIndex = 0;

      if (isQuietWeek) {
        if (r > 0.88 && !isWeekend) intensityIndex = 1;
      } else if (isSprintWeek) {
        if (isWeekend) {
          if (r > 0.5) intensityIndex = 1;
          if (r > 0.72) intensityIndex = 2;
        } else {
          if (r > 0.18) intensityIndex = 1;
          if (r > 0.4) intensityIndex = 2;
          if (r > 0.68) intensityIndex = 3;
        }
      } else {
        if (isWeekend) {
          if (r > 0.72) intensityIndex = 1;
          if (r > 0.92) intensityIndex = 2;
        } else {
          if (r > 0.38) intensityIndex = 1;
          if (r > 0.62) intensityIndex = 2;
          if (r > 0.88) intensityIndex = 3;
        }
      }

      const tooltip =
        intensityIndex > 0
          ? TOOLTIPS[Math.floor(seededRandom(seed + 999) * TOOLTIPS.length)]
          : "No contribution";

      week.push({ id: `${w}-${d}`, intensityIndex, tooltip });
    }
    grid.push(week);
  }
  return grid;
}

export function ContributionGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const grid = useMemo(() => generateGrid(), []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const squares = containerRef.current.querySelectorAll('.contrib-square');
    
    gsap.fromTo(
      squares,
      {
        opacity: 0,
        scale: 0.1,
        y: 10,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: {
          each: 0.002,
          from: "start",
          grid: [7, 52],
        },
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div 
        ref={containerRef} 
        className="flex gap-1 min-w-max p-2 [perspective:1000px]"
      >
        {grid.map((week, wIndex) => (
          <div key={`week-${wIndex}`} className="flex flex-col gap-1">
            {week.map((day) => (
              <div
                key={day.id}
                className={cn(
                  "contrib-square w-3 h-3 rounded-[2px] transition-all duration-300 relative group cursor-crosshair",
                  "hover:scale-150 hover:z-10 hover:shadow-glow-success hover:-translate-y-1 hover:rotate-3",
                  INTENSITIES[day.intensityIndex]
                )}
                title={day.tooltip}
              >
                {/* Custom tooltip could go here, but using native title for simplicity and performance with ~364 dom nodes */}
                <div className="absolute opacity-0 group-hover:opacity-100 bg-surface-container-highest border border-terminal-dim text-on-surface text-[10px] whitespace-nowrap p-1 rounded pointer-events-none -top-6 left-1/2 -translate-x-1/2 z-20 transition-opacity">
                  {day.tooltip}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
