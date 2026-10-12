import styled from 'styled-components';
import { Icon, ColorContent } from '../../index';

export function DropdownItems({ item, onClick }) {
  return (
    <Container onClick={onClick}>
      <Icon>{item.icon}</Icon>
      <ColorContent $width="12px" $height="12px" $color={item.color} />
      <span>{item.text}</span>
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
  padding: 8px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.bg4};
  }
  svg {
    font-size: 28px;
    display: block;
  }
`;
