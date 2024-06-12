import {
  faArrowDown,
  faArrowsRotate,
  faArrowUp,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import styled from "styled-components";

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
const StyledLabel = styled.p`
  grid-column: 1 / -1;
  justify-self: center;
  font-size: 1.5rem;
  font-weight: bold;
  @media (min-width: 1200px) {
    font-size: 2rem;
  }
`;
const StyledLength = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: orange;
  border-radius: 1rem;
  width: 5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  text-align: center;
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
const Timer = styled.div`
  grid-column: 1 / 3;
  width: 300px;
  height: 200px;
  border: 5px solid orange;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
const StyledP = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;
const Time = styled.p`
  font-size: 4.5rem;
`;

const Clock = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLeft, setSessionLeft] = useState(25 * 60);
  const [breakLeft, setBreakLeft] = useState(5 * 60);
  const [start, setStart] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const handleStart = () => setStart(true);
  const handlePause = () => setStart(false);
  const handleReset = () => {
    setStart(false);
    setOnBreak(false);
    setSessionLength(25);
    setBreakLength(5);
    setSessionLeft(25 * 60);
    setBreakLeft(5 * 60);
    setPlaySound(false);
  };

  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength((prev) => prev + 1);
    }
  };

  const decrementBreak = () => {
    if (breakLength > 1) {
      setBreakLength((prev) => prev - 1);
    }
  };

  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength((prev) => prev + 1);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setSessionLeft(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    setBreakLeft(breakLength * 60);
  }, [breakLength]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (start && !onBreak) {
        setSessionLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return prev;
          }
        });
      } else if (start && onBreak) {
        setBreakLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return prev;
          }
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [start, onBreak]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (start && sessionLeft === 0) {
        setOnBreak(true);
        setPlaySound(true);
        setSessionLeft(sessionLength * 60);
      } else if (start && breakLeft === 0) {
        setOnBreak(false);
        setPlaySound(true);
        setBreakLeft(breakLength * 60);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [start, sessionLeft, breakLeft]);

  const formatTimeLeft = () => {
    const secondsLeft = onBreak ? breakLeft : sessionLeft;
    const minutes = Math.floor(secondsLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (secondsLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  console.log(
    `start: ${start}, onBreak: ${onBreak}, sessionLeft: ${sessionLeft}, breakLeft: ${breakLeft}, formattedTimeLeft: ${formatTimeLeft()}`
  );

  return (
    <ClockContainer>
      <Title>25 + 5 Clock</Title>
      <LengthContainer>
        <StyledLabel id="break-label">Break Length</StyledLabel>
        <Arrow
          icon={faArrowDown}
          id="break-decrement"
          onClick={decrementBreak}
        />
        <StyledLength id="break-length">{breakLength}</StyledLength>
        <Arrow icon={faArrowUp} id="break-increment" onClick={incrementBreak} />
      </LengthContainer>
      <LengthContainer>
        <StyledLabel id="session-label">Session Length</StyledLabel>
        <Arrow
          icon={faArrowDown}
          id="session-decrement"
          onClick={decrementSession}
        />
        <StyledLength id="session-length">{sessionLength}</StyledLength>
        <Arrow
          icon={faArrowUp}
          id="session-increment"
          onClick={incrementSession}
        />
      </LengthContainer>
      <Timer id="timer">
      <StyledP id="timer-label">{onBreak ? "Break" : "Session"}</StyledP>
      <Time id="time-left">{formatTimeLeft()}</Time>
    </Timer>
      <IconsContainer>
        <Icon icon={faPlay} id="start_stop" onClick={handleStart} />
        <Icon icon={faPause} onClick={handlePause} />
        <Icon icon={faArrowsRotate} id="reset" onClick={handleReset} />
      </IconsContainer>
      <audio id="beep" src="./assets/beep.wav"></audio>
    </ClockContainer>
  );
};

export default Clock;
