import { useState } from 'react';
import styled from 'styled-components';
import {
  Header,
  useOperations,
  BtnFilter,
  v,
  CategoriesTable,
  RegisterCategory,
  LottieAnimation,
  Title,
} from '../../index';
import emptyGreenAnimation from '../../assets/empty-green.json';
import emptyRedAnimation from '../../assets/empty-red.json';

export function CategoriesTemplate({ data }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [action, setAction] = useState('');
  const [dataSelect, setDataSelect] = useState([]);
  const [state, setState] = useState(false);
  const [, setStateType] = useState(false);
  const {
    categoryColor,
    categoryBg,
    type
  } = useOperations();

  function closeDropdowns() {
    setStateType(false);
    setState(false);
  }

  function openUser() {
    setState(!state);
    setStateType(false);
  }

  function openNewRecord() {
    setIsFormOpen(!isFormOpen);
    setAction('New');
    setDataSelect([]);
  }

  return (
    <Container onClick={closeDropdowns}>
      {isFormOpen && (
        <RegisterCategory
          dataSelect={dataSelect}
          onClose={() => setIsFormOpen(!isFormOpen)}
          action={action}
        />
      )}

      <header className="header">
        <Header stateConfig={{ state: state, setState: openUser }} />
      </header>

      <section className="type">
        <Title>Categoria de productos</Title>
      </section>
      <section className="area2">
        <FilterContent>
          <BtnFilter
            onClick={openNewRecord}
            bgcolor={categoryBg}
            textcolor={categoryColor}
            icon={<v.iconAdd />}
          />
        </FilterContent>
      </section>
      <section className="main">
        {data.length == 0 && (
          <LottieAnimation
            height="300"
            width="300"
            animation={type == 'i' ? emptyGreenAnimation : emptyRedAnimation}
          />
        )}

        <CategoriesTable
          data={data}
          setIsFormOpen={setIsFormOpen}
          setDataSelect={setDataSelect}
          setAction={setAction}
        />
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;

  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    'header' 100px
    'type' 100px
    'area2' 50px
    'main' auto;

  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }
  .type {
    grid-area: type;
    /* background-color: rgba(229, 67, 26, 0.14); */
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    /* background-color: rgba(77, 237, 106, 0.14); */
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
    /* background-color: rgba(179, 46, 241, 0.14); */
  }
`;
const FilterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
