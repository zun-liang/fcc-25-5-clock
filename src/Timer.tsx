import { useEffect, useState } from "react";
import styled from "styled-components";

const TimerContainer = styled.div`
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

interface TimeProps {
  start: boolean;
  breakLength: number;
  sessionLength: number;
}
const Timer = ({ start, breakLength, sessionLength }: TimeProps) => {
  const [onBreak, setOnBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [sessionSeconds, setSessionSeconds] = useState(sessionLength * 60);
  const [breakSeconds, setBreakSeconds] = useState(breakLength * 60);

  useEffect(() => {
    setSessionSeconds(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    setBreakSeconds(breakLength * 60);
  }, [breakLength]);

  const formatTimeLeft = () => {
    const secondsLeft = timeLeft;
    const minutes = Math.floor(secondsLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (secondsLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (start) {
      setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
  }, [start]);

  useEffect(() => {
    if (start && sessionSeconds === 0) {
      setOnBreak(true);
      setTimeLeft(breakSeconds);
    } else if (start && breakSeconds === 0) {
      setOnBreak(false);
      setTimeLeft(sessionSeconds);
    }
  }, [start, sessionSeconds, breakSeconds]);

  return (
    <TimerContainer>
      <StyledP id="timer-label">{onBreak ? "Break" : "Session"}</StyledP>
      <Time id="time-left">{formatTimeLeft()}</Time>
    </TimerContainer>
  );
};

export default Timer;
