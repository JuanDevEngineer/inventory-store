import styled from "styled-components";
import {
  Header,
  BtnFilter,
  v,
  Title,
  LottieAnimation,
  SearchBar,
  RegisterStaff,
  StaffTable,
} from "../../index";
import { useState } from "react";
import emptyAnimation from "../../assets/empty.json";
import { useStaffStore } from "../../store/StaffStore";
export function StaffTemplate({data}) {
  const {setSearch} = useStaffStore();
  const [state, setState] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [action, setAction] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  function openNewRecord() {
    setIsFormOpen(!isFormOpen);
    setAction("New");
    setDataSelect([]);
  }
  return (
    <Container>
      {isFormOpen && (
        <RegisterStaff setDataSelect={setDataSelect}
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
            Personal
          </Title>
          <BtnFilter
            onClick={openNewRecord}
            bgcolor="#f6f3f3"
            textcolor="#353535"
            icon={<v.iconAdd />}
          />
        </FilterContent>
      </section>
      <section className="area2">
        <SearchBar setSearch={setSearch}/>
      </section>
      <section className="main">
      {data.length == 0 && (
          <LottieAnimation
            height="300"
            width="300"
            animation={emptyAnimation}
          />
        )}

        <StaffTable
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
