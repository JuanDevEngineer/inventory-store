import styled from 'styled-components';
import { v } from '../../index';

export function BtnClose({ onClick }) {
  return <Container onClick={onClick}>{<v.iconClose />}</Container>;
}

const Container = styled.span`
  cursor: pointer;
  font-size: 25px;
  transition: all 0.2s;
  &:hover {
    color: ${() => v.colorselector};
  }
`;
