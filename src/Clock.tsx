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
  row-gap: 2rem;
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
  gap: 1rem;
`;
const StyledLabel = styled.label`
  grid-column: 1 / -1;
  justify-self: center;
  font-size: 2rem;
  font-weight: bold;
`;
const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: orange;
  border-radius: 1rem;
  width: 5rem;
  height: 2rem;
  font-size: 1.5rem;
`;
const Arrow = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
`;
const IconsContainer = styled.div`
  grid-column: 1 / 3;
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  margin: 1rem;
`;

const Clock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const updateBreakLength = (e: React.FormEvent<HTMLInputElement>): void =>
    setBreakLength(parseInt(e.currentTarget.value));
  const updateSessionLength = (e: React.FormEvent<HTMLInputElement>): void =>
    setSessionLength(parseInt(e.currentTarget.value));
  const incrementBreak = () => {
    if (breakLength < 59) {
      setBreakLength((prev) => prev + 1);
    }
  };
  const decrementBreak = () => {
    if (breakLength >= 1) {
      setBreakLength((prev) => prev - 1);
    }
  };
  const incrementSession = () => {
    if (sessionLength < 59) {
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
          value={sessionLength}
          onChange={updateSessionLength}
        />
        <Arrow
          icon={faArrowDown}
          id="session-decrement"
          onClick={decrementSession}
        />
      </LengthContainer>
      <Timer />
      <IconsContainer>
        <Icon icon={faPlay} id="start_stop" />
        <Icon icon={faPause} />
        <Icon icon={faArrowsRotate} id="reset" />
      </IconsContainer>
    </ClockContainer>
  );
};

export default Clock;
