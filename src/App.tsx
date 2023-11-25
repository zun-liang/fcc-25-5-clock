import { useEffect } from "react";
import styled from "styled-components";

import Clock from "./Clock";

import "./App.css";

const AppContainer = styled.div`
  width: 100%;
  height: var(--app-height);
  background-color: #fffdaf;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App: React.FC = () => {
  const doc: HTMLElement = document.documentElement;
  const setAppHeight = () => {
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  useEffect(() => {
    window.addEventListener("resize", setAppHeight);
    setAppHeight();
    return () => window.removeEventListener("resize", setAppHeight);
  }, []);

  return (
    <main>
      <AppContainer>
        <Clock />
      </AppContainer>
    </main>
  );
};

export default App;
