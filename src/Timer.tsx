import { Dispatch, SetStateAction, useEffect } from "react";
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
  onBreak: boolean;
  setOnBreak: Dispatch<SetStateAction<boolean>>;
  breakLength: number;
  sessionLength: number;
  sessionLeft: number;
  setSessionLeft: Dispatch<SetStateAction<number>>;
  breakLeft: number;
  setBreakLeft: Dispatch<SetStateAction<number>>;
  setPlaySound: Dispatch<SetStateAction<boolean>>;
}
const Timer = ({
  start,
  onBreak,
  setOnBreak,
  breakLength,
  sessionLength,
  sessionLeft,
  setSessionLeft,
  breakLeft,
  setBreakLeft,
  setPlaySound
}: TimeProps) => {

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
    <TimerContainer id="timer">
      <StyledP id="timer-label">{onBreak ? "Break" : "Session"}</StyledP>
      <Time id="time-left">{formatTimeLeft()}</Time>
    </TimerContainer>
  );
};

export default Timer;
