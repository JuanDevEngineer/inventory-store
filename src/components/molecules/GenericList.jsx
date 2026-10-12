import styled from 'styled-components';
import { Device, BtnClose } from '../../index';

export function GenericList({ data = [], setState, onClick, scroll, bottom }) {
  function handleSelect(p) {
    onClick(p);
    setState();
  }
  
  return (
    <Container scroll={scroll} $bottom={bottom}>
      <section className="contentClose">
        <BtnClose onClick={setState} />
      </section>
      <section className="contentItems">
        {data?.map((item, index) => {
          return (
            <ItemContainer key={index} onClick={() => handleSelect(item)}>
              <span>💎</span>
              <span>{item.description}</span>
            </ItemContainer>
          );
        })}
      </section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  position: absolute;
  margin-bottom: 15px;
  bottom: ${(props) => props.$bottom};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
  z-index: 3;
  height: 230px;
  @media ${() => Device.tablet} {
    width: 400px;
  }
  .contentItems {
    overflow-y: ${(props) => props.scroll};
  }
`;

const ItemContainer = styled.div`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.bgtotal};
  }
`;
