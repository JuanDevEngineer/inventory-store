import styled from 'styled-components';
import { ClimbingBoxLoader } from 'react-spinners';
import { useOperations } from '../../index';

export function Spinner() {
  const { categoryColor } = useOperations();
  return (
    <Container>
      <ClimbingBoxLoader color={categoryColor} size={`100%`} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: ${(props) => props.theme.bg};
  transform: all 0.3s;
  color: #6df643;
`;
