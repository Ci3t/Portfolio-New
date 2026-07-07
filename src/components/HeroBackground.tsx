"use client";

import { useEffect, useRef } from "react";

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    const particles: Particle[] = [];
    const particleCount = Math.floor((width * height) / 10000); // More particles for better effect

    const mouse = { x: -1000, y: -1000, isDown: false };
    const shockwaves: { x: number; y: number; radius: number; life: number }[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 0.5;
      }

      update() {
        // Natural movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse repel logic (Game vibe interaction)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const forceDirectionX = dx / dist;
          const forceDirectionY = dy / dist;
          const force = (150 - dist) / 150;
          
          this.vx -= forceDirectionX * force * 0.6;
          this.vy -= forceDirectionY * force * 0.6;
        }

        // Shockwave logic
        shockwaves.forEach((sw) => {
          const swDx = sw.x - this.x;
          const swDy = sw.y - this.y;
          const swDist = Math.sqrt(swDx * swDx + swDy * swDy);
          if (swDist < sw.radius && swDist > sw.radius - 40) {
            this.vx -= (swDx / swDist) * 5;
            this.vy -= (swDy / swDist) * 5;
          }
        });

        // Friction to prevent infinite acceleration
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Ensure minimum speed so they don't stop completely
        if (Math.abs(this.vx) < 0.2) this.vx += (Math.random() - 0.5) * 0.5;
        if (Math.abs(this.vy) < 0.2) this.vy += (Math.random() - 0.5) * 0.5;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(168, 85, 247, 0.7)"; // Purple
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.fillStyle = "rgba(9, 9, 11, 0.3)"; 
      ctx.fillRect(0, 0, width, height);

      // Render shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 15;
        sw.life -= 0.02;
        
        if (sw.life <= 0) {
          shockwaves.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(34, 211, 238, ${sw.life})`; // Cyan shockwave
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      particles.forEach((p, i) => {
        p.update();
        p.draw(ctx);

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 - dist / 600})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      shockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        life: 1
      });
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#09090b]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#09090b_100%)] pointer-events-none" />
      {/* Subtle purple glow */}
      <div className="absolute -top-[20%] -right-[10%] h-[700px] w-[700px] rounded-full bg-primary/10 blur-[120px] mix-blend-screen opacity-50 pointer-events-none" />
      <div className="absolute -bottom-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-secondary/10 blur-[150px] mix-blend-screen opacity-40 pointer-events-none" />
    </div>
  );
}