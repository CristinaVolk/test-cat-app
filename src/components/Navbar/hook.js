import { useState, useEffect, useRef } from "react";

export const useComponent = () => {
  const navBarRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    onResize(navBarRef);
    window.addEventListener("resize", () => {
      setIsMobile(onResize(navBarRef));
    });
    return () =>
      window.removeEventListener("resize", () => onResize(navBarRef));
  });
  return {
    navBarRef,
    isMobile,
  };
};

function onResize(navBarRef) {
  if (window.innerWidth <= 580) {
    navBarRef.current.setAttribute("style", "line-height:23px;");
    return true;
  } else {
    return false;
  }
}
