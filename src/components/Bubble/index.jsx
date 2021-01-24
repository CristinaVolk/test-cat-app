import React from "react";
import { animated } from "react-spring";
import { useComponent } from "./hook";

export function Bubble() {
  const { trans, trail, set } = useComponent();

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id='goo'>
          <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='30' />
          <feColorMatrix
            in='blur'
            values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7'
          />
        </filter>
      </svg>
      <div
        className='hooks-main'
        onMouseMove={(e) => set({ xy: [e.clientX, e.clientY] })}
      >
        {trail.map((props, index) => (
          <animated.div
            key={index}
            style={{ transform: props.xy.interpolate(trans) }}
          />
        ))}
      </div>
    </>
  );
}
