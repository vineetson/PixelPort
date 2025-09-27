import { ReactNode } from "react";

interface RetroTextProps {
  children: ReactNode;
  size?: "small" | "medium" | "large" | "xl";
  color?: "green" | "pink" | "cyan" | "white";
  glow?: boolean;
  className?: string;
  typing?: boolean;
  delay?: number;
}

export default function RetroText({
  children,
  size = "medium",
  color = "green",
  glow = false,
  className = "",
  typing = false,
  delay = 0
}: RetroTextProps) {
  const sizeClasses = {
    small: "text-xs",
    medium: "text-base",
    large: "text-xl",
    xl: "text-4xl"
  };

  const colorClasses = {
    green: "text-retro-green",
    pink: "text-retro-pink",
    cyan: "text-retro-cyan",
    white: "text-white"
  };

  const glowClasses = {
    green: "retro-glow-green",
    pink: "retro-glow-pink",
    cyan: "retro-glow-cyan",
    white: "retro-glow-white"
  };

  return (
    <div
      className={`
        font-mono 
        ${sizeClasses[size]} 
        ${colorClasses[color]} 
        ${glow ? glowClasses[color] : ""}
        ${typing ? "retro-typing" : ""}
        pixelated
        ${className}
      `}
      style={typing ? { animationDelay: `${delay}s` } : {}}
    >
      {children}
    </div>
  );
}
