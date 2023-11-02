/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, ReactNode } from "react";

interface SliderProps {
  children: ReactNode;
  className: string;
}

const Slider: React.FC<SliderProps> = ({ children, className }) => {
  const slider = useRef<HTMLDivElement | null>(null);

  const handleMouseScroll: EventListener = (e: Event) => {
    const wheelEvent = e as WheelEvent;
    if (slider.current) {
      slider.current.scrollLeft += wheelEvent.deltaY;
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (slider.current) {
      slider.current.addEventListener("wheel", handleMouseScroll, {
        passive: false,
      });
    }

    return () => {
      if (slider.current) {
        slider.current.removeEventListener("wheel", handleMouseScroll);
      }
    };
  }, []);

  return (
    <div className={`flex flex-row ${className}`}>
      <div
        className="w-full mx-auto overflow-x-auto whitespace-nowrap scrollbar pt-5"
        ref={slider}
      >
        {children}
      </div>
    </div>
  );
};

export default Slider;
