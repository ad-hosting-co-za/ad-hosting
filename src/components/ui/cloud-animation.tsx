import { useEffect, useState } from "react";

interface CloudProps {
  className?: string;
}

const Cloud = ({ className }: CloudProps) => {
  const [position, setPosition] = useState({
    x: Math.random() * 100,
    y: Math.random() * 20,
    speed: 0.01 + Math.random() * 0.02,
    scale: 0.5 + Math.random() * 0.5,
    opacity: 0.4 + Math.random() * 0.3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => ({
        ...prev,
        x: prev.x > 100 ? -20 : prev.x + prev.speed,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src="/Logo Pictures/Web Size/Cloud1.png"
      alt=""
      className={`absolute pointer-events-none transition-transform duration-1000 ${className}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `scale(${position.scale})`,
        opacity: position.opacity,
      }}
    />
  );
};

interface CloudAnimationProps {
  count?: number;
  className?: string;
}

const CloudAnimation = ({ count = 5, className = "" }: CloudAnimationProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Cloud key={i} />
      ))}
    </div>
  );
};

export default CloudAnimation; 