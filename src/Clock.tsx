import {
  faArrowDown,
  faArrowsRotate,
  faArrowUp,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

import Timer from "./Timer";

const ClockContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  row-gap: 2.5rem;
  column-gap: 1rem;
`;
const Title = styled.h1`
  grid-column: 1 / 3;
  font-size: 3rem;
  font-weight: bold;
  justify-items: center;
`;
const LengthContainer = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr 2rem;
  justify-items: center;
  align-items: center;
  row-gap: 1rem;
  column-gap: 0.5rem;
`;
const StyledLabel = styled.label`
  grid-column: 1 / -1;
  justify-self: center;
  font-size: 1.5rem;
  font-weight: bold;
  @media (min-width: 1200px) {
    font-size: 2rem;
  }
`;
const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: orange;
  border-radius: 1rem;
  width: 5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  text-align: center;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;
const Arrow = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  cursor: pointer;
`;
const IconsContainer = styled.div`
  grid-column: 1 / 3;
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  margin: 1rem;
  cursor: pointer;
`;

const Clock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [start, setStart] = useState(false);
  const handleStart = () => setStart(true);
  const handlePause = () => setStart(false);
  const handleReset = () => {
    setStart(false);
    setBreakLength(5);
    setSessionLength(25);
  };

  const updateBreakLength = (e: React.FormEvent<HTMLInputElement>): void => {
    const breakInput = e.currentTarget.value;
    if (breakInput) {
      setBreakLength(parseInt(breakInput));
    } else {
      setBreakLength(0);
    }
  };

  const updateSessionLength = (e: React.FormEvent<HTMLInputElement>): void => {
    const sessionInput = e.currentTarget.value;
    if (sessionInput) {
      setSessionLength(parseInt(sessionInput));
    } else {
      setSessionLength(0);
    }
  };

  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength((prev) => prev + 1);
    }
  };

  const decrementBreak = () => {
    if (breakLength >= 1) {
      setBreakLength((prev) => prev - 1);
    }
  };

  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength((prev) => prev + 1);
    }
  };

  const decrementSession = () => {
    if (sessionLength >= 1) {
      setSessionLength((prev) => prev - 1);
    }
  };

  return (
    <ClockContainer>
      <Title>25 + 5 Clock</Title>
      <LengthContainer>
        <StyledLabel htmlFor="break-length" id="break-label">
          Break Length
        </StyledLabel>
        <Arrow icon={faArrowUp} id="break-increment" onClick={incrementBreak} />
        <StyledInput
          id="break-length"
          name="break-length"
          type="number"
          min="1"
          max="60"
          value={breakLength}
          onChange={updateBreakLength}
        />
        <Arrow
          icon={faArrowDown}
          id="break-decrement"
          onClick={decrementBreak}
        />
      </LengthContainer>
      <LengthContainer>
        <StyledLabel htmlFor="session-length" id="session-label">
          Session Length
        </StyledLabel>
        <Arrow
          icon={faArrowUp}
          id="session-increment"
          onClick={incrementSession}
        />
        <StyledInput
          id="session-length"
          name="session-length"
          type="number"
          min="1"
          max="60"
          value={sessionLength}
          onChange={updateSessionLength}
        />
        <Arrow
          icon={faArrowDown}
          id="session-decrement"
          onClick={decrementSession}
        />
      </LengthContainer>
      <Timer
        start={start}
        breakLength={breakLength}
        sessionLength={sessionLength}
      />
      <IconsContainer>
        <Icon icon={faPlay} id="start_stop" onClick={handleStart} />
        <Icon icon={faPause} onClick={handlePause} />
        <Icon icon={faArrowsRotate} id="reset" onClick={handleReset} />
      </IconsContainer>
    </ClockContainer>
  );
};

export default Clock;
