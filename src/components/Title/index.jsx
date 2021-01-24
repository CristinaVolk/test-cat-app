import React from "react";
import { animated } from "react-spring";
import { useComponent } from "./hook";

export function Title() {
  const { transitions, reset } = useComponent();

  return (
    <div className='trails-wrapper'>
      {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
        <animated.div
          className='transitions-item'
          key={key}
          style={rest}
          onClick={reset}
        >
          <animated.div style={{ overflow: "hidden", height: innerHeight }}>
            {item}
          </animated.div>
        </animated.div>
      ))}
    </div>
  );
}
