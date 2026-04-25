"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VideoScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Set canvas dimensions
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawPlaceholder(0); // Draw initial frame
    };
    resize();
    window.addEventListener("resize", resize);

    // Using procedural gradient/noise placeholder since we don't have WebP frames
    function drawPlaceholder(progress: number) {
      if (!canvas || !ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear
      ctx.clearRect(0, 0, width, height);
      
      // Draw background dark
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, width, height);
      
      // Draw procedural visual based on progress
      // Progress goes 0 to 1
      const cx = width / 2;
      const cy = height / 2;
      
      // Create a gradient that shifts with scroll
      const r = Math.floor(10 + progress * 20);
      const g = Math.floor(10 + progress * 30);
      const b = Math.floor(20 + progress * 150); // Becomes more blue
      
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.8);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.15)`);
      grad.addColorStop(1, "rgba(10, 10, 10, 1)");
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw some "noise" lines that scale
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.02 + progress * 0.05})`;
      ctx.lineWidth = 1;
      
      for(let i = 0; i < 50; i++) {
        const y = (i * (height / 50) + progress * height) % height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        // Distorted line
        ctx.bezierCurveTo(width * 0.3, y + Math.sin(progress * 10 + i) * 50, width * 0.7, y - Math.cos(progress * 10 + i) * 50, width, y);
        ctx.stroke();
      }
    }

    drawPlaceholder(0);

    // Scroll trigger object
    const animation = { frame: 0 };
    
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5, // Smooth scrubbing
      onUpdate: (self) => {
        // self.progress is between 0 and 1
        drawPlaceholder(self.progress);
        
        // In a real scenario with image sequence:
        // const frameIndex = Math.floor(self.progress * (frameCount - 1));
        // renderImage(frameIndex);
      }
    });

    return () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover"
      />
      {/* Noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
}
