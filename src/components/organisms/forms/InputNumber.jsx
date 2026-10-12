import styled from "styled-components";

export function InputNumber({
  style,
  onChange,
  defaultValue,
  placeholder,
  register,
  errors,icon
}) {
  return (
    <Container>
     
        <IconTextContainer>
           <span>{icon}</span>
        <input
          step="0.01"
          style={style}
          onChange={onChange}
          type="number"
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...register("amount", { required: true, Number: true })}
        ></input>
        </IconTextContainer>

      {errors.value?.type === "required" && (
      
          <p>Campo requerido</p>
     
      )}
      {errors.value?.type === "Number" && (
       
          <p>Ingrese un número valido</p>
        
      )}
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  display:flex;
  align-items:start;
  flex-direction:column;
  justify-content:start;
  input {
    background: ${({ theme }) => theme.bgtotal};
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: solid 1px grey;
    color: ${({ theme }) => theme.text};
    outline: none;
    &:focus {
      border-bottom: none;
    }
    &::placeholder {
      color: #c8c8c8;
    }
  }
  p {
    color: #ff6d00;
    font-size: 12px;
  }
`;
const IconTextContainer=styled.div`
  display:flex;
  align-items:center;
  gap:10px;
  text-align:center;
`