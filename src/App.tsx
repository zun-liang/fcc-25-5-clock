import { useEffect } from "react";

import "./App.css";

const App = () => {
  const doc = document.documentElement;
  const setAppHeight = () => {
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  useEffect(() => {
    window.addEventListener("resize", setAppHeight);
    setAppHeight();
    return () => window.removeEventListener("resize", setAppHeight);
  }, []);
  return <></>;
};

export default App;
