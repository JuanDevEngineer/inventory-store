import styled from "styled-components";
import {
  Header,
  v,
  Title,
  SearchBar,
  BtnSave,
  Tabs,
  RegisterEntryExit,
  useKardexStore,
} from "../../index";
import { useState } from "react";
export function KardexTemplate() {
  const {setSearch} = useKardexStore();
  const [state, setState] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [action] = useState("");
  const [dataSelect] = useState([]);
  const [type, setType] = useState("");
  function newEntry() {
    setIsFormOpen(true);
    setType("entrada");

  }
  function newExit() {
    setIsFormOpen(true);
    setType("salida");

  }
  return (
    <Container>
      {isFormOpen && (
        <RegisterEntryExit type={type}
          dataSelect={dataSelect}
          onClose={() => setIsFormOpen(!isFormOpen)}
          action={action}
        />
      )}
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <FilterContent>
          <Title>
            Kardex
          </Title>
          <BtnSave title="Entrada" bgcolor="#52de65"
            icon={<v.iconArrowRight/>} onClick={newEntry}/>

           <BtnSave title="Salida" bgcolor="#fb6661"
             onClick={newExit} 
            />
        </FilterContent>
      </section>
      <section className="area2">
        <SearchBar setSearch={setSearch}/>
      </section>

      <section className="main">
         <Tabs/>

      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 60px

    "main" auto;

  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    /* background-color: rgba(229, 67, 26, 0.14); */
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    /* background-color: rgba(77, 237, 106, 0.14); */
    display: flex;
    align-items: center;
    justify-content:end;

  }

  .main {
    margin-top:20px;
    grid-area: main;
    /* background-color: rgba(179, 46, 241, 0.14); */
  }
`;
const FilterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:end;
  width:100%;
  gap:15px;
`;
