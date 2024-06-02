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
  const [sessionSeconds, setSessionSeconds] = useState(sessionLength * 60);
  const [breakSeconds, setBreakSeconds] = useState(breakLength * 60);

  useEffect(() => {
    setSessionSeconds(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    setBreakSeconds(breakLength * 60);
  }, [breakLength]);

  const timeLeft = () => {
    let minutes = Math.floor(sessionSeconds / 60)
      .toString()
      .padStart(2, "0");
    let seconds = (sessionSeconds % 60).toString().padStart(2, "0");
    const formattedTimeLeft = minutes + ":" + seconds;
    if (start && formattedTimeLeft === "00:00") {
      setOnBreak(true);
      minutes = Math.floor(breakSeconds / 60)
        .toString()
        .padStart(2, "0");
      seconds = (breakSeconds % 60).toString().padStart(2, "0");
    }
    return formattedTimeLeft;

  };

  useEffect(() => {
    if (start && !onBreak) {
      setInterval(() => {
        setSessionSeconds((prev) => prev - 1);
      }, 1000);
    } else if (start && onBreak) {
      setInterval(() => {
        setBreakSeconds(prev => prev - 1);
      }, 1000)
    }
  }, [start, onBreak]);

  return (
    <TimerContainer>
      <StyledP id="timer-label">
        {onBreak ? "Break" : "Session"}
      </StyledP>
      <Time id="time-left">{timeLeft()}</Time>
    </TimerContainer>
  );
};

export default Timer;
