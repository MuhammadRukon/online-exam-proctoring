import React from "react";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: string;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className = "", children, maxHeight = "320px", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative overflow-auto ${className}`}
        style={{ maxHeight }}
        {...props}
      >
        <div className="h-full w-full">{children}</div>
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";
