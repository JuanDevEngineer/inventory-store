import styled from "styled-components";

export function TableAction({ onClick, icon, color, fontSize }) {
  return <Container onClick={onClick} color={color} fontSize={fontSize}>{icon}</Container>;
}
const Container = styled.span`
color:${(props)=>props.color};
font-size:${(props)=>props.fontSize};
cursor: pointer;

`;
