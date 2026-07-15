import { useEffect, useRef, useState } from "react";

export function A4ScaleWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(1123);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const padding = 32; // padding for visual breathing room
      const availableWidth = width - padding;
      const A4_WIDTH = 794;
      setScale(Math.min(availableWidth / A4_WIDTH, 1));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const observer = new ResizeObserver((entries) => {
      const { height } = entries[0].contentRect;
      setContentHeight(Math.max(height, 1123)); // At least one A4 page height
    });

    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center pb-12 pt-8">
      <div 
        style={{ 
          width: 794 * scale, 
          height: contentHeight * scale 
        }} 
        className="relative"
      >
        <div 
          ref={contentRef}
          style={{ 
            width: '794px', 
            minHeight: '1123px', 
            transform: `scale(${scale})`, 
            transformOrigin: 'top left' 
          }}
          className="absolute top-0 left-0 bg-white shadow-2xl transition-transform duration-200"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
