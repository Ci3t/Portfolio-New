"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useRef } from "react";

class Point {
  x: number;
  y: number;
  age: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.age = 0;
  }
}

export function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || typeof window === "undefined" || window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: Point[] = [];
    let animationFrameId: number;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const addPoint = (e: MouseEvent) => {
      points.push(new Point(e.clientX, e.clientY));
    };
    window.addEventListener("mousemove", addPoint);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update ages and filter out dead points
      points.forEach((p) => (p.age += 1));
      points = points.filter((p) => p.age < 35); // Trail length

      if (points.length > 1) {
        ctx.beginPath();
        // Move to first point
        ctx.moveTo(points[0].x, points[0].y);

        // Draw smooth curve through points
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        // Connect to the last point
        const lastPoint = points[points.length - 1];
        ctx.lineTo(lastPoint.x, lastPoint.y);

        // Gradient for the trail (fading out at the tail)
        if (points.length > 1) {
          const grad = ctx.createLinearGradient(
            points[0].x, points[0].y,
            lastPoint.x, lastPoint.y
          );
          // Purple to transparent
          grad.addColorStop(0, "rgba(6, 182, 212, 0)"); // Tail end (oldest)
          grad.addColorStop(1, "rgba(6, 182, 212, 0.8)"); // Head (newest)
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = 4;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowBlur = 15;
          ctx.shadowColor = "rgba(6, 182, 212, 0.5)";
          ctx.stroke();
        }
        
        // Draw the head glow
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#a5f3fc";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#06b6d4";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", addPoint);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
      aria-hidden="true"
    />
  );
}
