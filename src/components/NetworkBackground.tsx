"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    if (process.env.NODE_ENV === "test") return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let points: Point[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * window.devicePixelRatio);
      canvas.height = Math.floor(height * window.devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      points = Array.from({ length: Math.min(90, Math.floor(width / 22)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }));
    };

    const move = (event: MouseEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(10, 10, 12, 0.18)";
      context.fillRect(0, 0, width, height);

      for (const point of points) {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < -40) point.x = width + 40;
        if (point.x > width + 40) point.x = -40;
        if (point.y < -40) point.y = height + 40;
        if (point.y > height + 40) point.y = -40;
      }

      for (let i = 0; i < points.length; i += 1) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j += 1) {
          const b = points[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          const pointerDistance = Math.min(
            Math.hypot(a.x - pointer.x, a.y - pointer.y),
            Math.hypot(b.x - pointer.x, b.y - pointer.y)
          );
          const threshold = pointerDistance < 220 ? 170 : 96;

          if (distance < threshold) {
            const opacity = (1 - distance / threshold) * (pointerDistance < 220 ? 0.55 : 0.16);
            context.strokeStyle = `rgba(0, 204, 220, ${opacity})`;
            context.lineWidth = pointerDistance < 220 ? 1.1 : 0.65;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      for (const point of points) {
        const pointerDistance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
        context.fillStyle = pointerDistance < 190 ? "rgba(57,211,83,0.92)" : "rgba(6,182,212,0.44)";
        context.beginPath();
        context.arc(point.x, point.y, pointerDistance < 190 ? 2 : 1.3, 0, Math.PI * 2);
        context.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 hidden opacity-60 md:block"
      aria-hidden="true"
    />
  );
}
