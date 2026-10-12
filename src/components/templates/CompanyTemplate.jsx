import styled from "styled-components";
import { Header, Title, CompanyBanner } from "../../index";
import { useState } from "react";
export function CompanyTemplate() {
  const [state, setState] = useState(false);
  useState(false);
  useState("");
  useState([]);
  return (
    <Container>

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <FilterContent>
          <Title>
            Tu empresa
          </Title>

        </FilterContent>
      </section>
      <section className="area2">

      </section>
      <section className="main">

      <CompanyBanner/>

      </section>

    </Container>
  );
}
const Container = styled.div`
position:relative;
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "area1" 0px
    "area2" 60px
    "main" auto;

  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;

  }
  .area1 {
    margin-top:15px;
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