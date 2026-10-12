import styled from 'styled-components';
import { DropdownItems, v } from '../../index';

export function DropdownMenuList({ data = [], top, onClick }) {
  return (
    <Container top={top}>
      {data?.map((item, index) => {
        return (
          <DropdownItems
            key={index}
            item={item}
            onClick={() => onClick(item)}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 22px;
  top: ${(props) => props.top};
  box-shadow: ${() => v.boxshadowGray};
  z-index: 1;
`;
