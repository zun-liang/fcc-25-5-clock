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
  font-size: 4rem;
`;

const Timer = () => {
  return (
    <TimerContainer>
      <StyledP id="timer-label">Session</StyledP>
      <Time>25:00</Time>
    </TimerContainer>
  );
};

export default Timer;
