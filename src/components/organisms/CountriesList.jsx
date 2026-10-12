import styled from "styled-components";
import { ListSearchInput, ConvertToCapitalize, Device, BtnClose } from "../../index";
import iso from "iso-country-currency";
import { useState } from "react";
export function CountriesList({ setSelect, setState }) {
  const isoCodes = iso.getAllISOCodes();
  const [results, setResults] = useState([]);
  function handleSelect(p) {
    setSelect(p);
    setState();
  }
  function handleSearch(e) {
    let filtered = isoCodes.filter((item) => {
      return item.countryName == ConvertToCapitalize(e.target.value);
    });
    setResults(filtered);
  }
  return (
    <Container>
      <section className="title">
        <span>Busca tu país</span>
      
        <BtnClose onClick={setState} />
      </section>
      <ListSearchInput onChange={handleSearch} placeholder="buscar..." />
      {results.length > 0 &&
        results.map((item, index) => {
          return (
            <ItemContainer key={index} onClick={() => handleSelect(item)}>
              <span>{item.countryName}</span>
              <span>{item.symbol}</span>
            </ItemContainer>
          );
        })}
    </Container>
  );
}
const Container = styled.div`
  margin-top: 15px;
  position: absolute;
  top: 88%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  border-radius: 10px;
 
  padding: 10px;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  z-index: 3;
  @media ${() => Device.tablet} {
    width: 400px;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.body};
  }
`;
const ItemContainer = styled.section`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({theme})=>theme.bgtotal};
  }
`;
