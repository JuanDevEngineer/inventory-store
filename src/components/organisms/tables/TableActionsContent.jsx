import styled from "styled-components";
import { TableAction } from "../../../index";
import { v } from "../../../styles/variables";
export function TableActionsContent({onEdit, onDelete}) {
  return (
    <Container>
      <TableAction onClick = {onEdit} fontSize="18px" color="#7d7d7d" icon={<v.iconEditTable/>} />
      <TableAction onClick={onDelete} fontSize="20px" color="#f76e8e" icon={<v.iconDeleteTable/>} />
    </Container>
  );
}
const Container = styled.div`
 display: flex;
  flex-wrap: wrap;
  justify-content:center;
  gap:10px;
  @media (max-width: 48em) {
    justify-content:end;
  }
`;
