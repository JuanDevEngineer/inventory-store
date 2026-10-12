import styled from 'styled-components';
import { v } from '../../../styles/variables';
import { useOperations } from '../../../index';

export const Pagination = ({ table }) => {
  const { categoryBg, categoryColor } = useOperations();

  return (
    <Container $categoryBg={categoryBg} $categoryColor={categoryColor}>
      <button
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span>{<v.iconAll />}</span>
      </button>
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        <span className="iconLeft">{<v.iconArrowRight />}</span>
      </button>
      <span>{table.getState().pagination.pageIndex + 1}</span>
      <p> de {table.getPageCount()} </p>
      <button
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        <span>{<v.iconArrowRight />}</span>
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  button {
    background-color: ${(props) => props.$categoryColor};
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    transition: 0.3s;

    &:hover {
      box-shadow: 0px 10px 15px -3px ${(props) => props.$categoryColor};
    }
    .iconLeft {
      transform: rotate(-180deg);
    }
    span {
      color: #fff;
      display: flex;
      svg {
        font-size: 15px;
        font-weight: 800;
      }
    }
  }

  button[disabled] {
    background-color: #646464;
    cursor: no-drop;
    box-shadow: none;
  }
`;
