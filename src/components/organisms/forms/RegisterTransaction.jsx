import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Switch } from "@mui/material";
import {
  useTransactionsStore,
  useCategoriesStore,
  useOperations,
  GenericList,
  Selector,
  InputNumber,
  InputText,
  useAccountStore,
  v,
  BtnSave,
} from "../../../index";
export function RegisterTransaction({
  setState,
  dataSelect
}) {
  const { selectedAccount } = useAccountStore();
  const { categoryData, selectedCategory, selectCategory } =
    useCategoriesStore();
  const { type } = useOperations();
  const { insertTransaction } = useTransactionsStore();

  const [status, setStatus] = useState(true);
  useState(false);
  const [stateCategories, setStateCategories] = useState(false);
  const today = new Date();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSave = async (data) => {
    let statusValue = 0;
    if (status) {
      statusValue = 1;
    }

    const p = {
      type: type,
      status: statusValue,
      date: data.date,
      description: data.description,
      account_id: selectedAccount.id,
      value: parseFloat(data.amount),
      category_id: selectedCategory.id,
    };

    try {
      await insertTransaction(p);
      setState();
    } catch (err) {
      alert(err);
    }
  };
  function handleStatusChange(e) {
    setStatus(e.target.checked);
  }

  return (
    <Container onClick={setState}>
      <div
        className="sub-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="heading">
          <div>
            <h1>Nuevo {type == "i" ? "ingreso" : "gasto"}</h1>
          </div>
          <div>
            <span onClick={setState}>{<v.iconClose />}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleSave)} className="form">
          <section>
            <div>
              <label>Monto:</label>
              <div>
                <InputNumber
                  defaultValue={dataSelect.value}
                  register={register}
                  placeholder="Ingrese monto"
                  errors={errors}
                  icon={<v.iconCalculator />}
                />
              </div>
            </div>
            <PaidContainer>
              <span>{<v.iconCheck />}</span>
              <label>Fue pagado:</label>
              <Switch
                onChange={handleStatusChange}
                checked={status}
                color="warning"
              />
            </PaidContainer>
            <DateContainer>
              <label>Fecha:</label>

              <input defaultValue={today.toJSON().slice(0,10)}
                type="date"
                {...register("date", { required: true })}
              ></input>
              {errors.date?.type === "required" && (
                <p>El campo es requerido</p>
              )}
            </DateContainer>
            <div>
              <label>Descripción:</label>
              <InputText
                defaultValue={dataSelect.description}
                register={register}
                placeholder="Ingrese una descripcion"
                errors={errors}
                style={{ textTransform: "capitalize" }}
              />
            </div>
            <CategoryContainer>
              <label>Categoria: </label>
              <Selector
                color="#e14e19"
                text1={selectedCategory?.icon}
                text2={selectedCategory?.description}
                onClick={() => setStateCategories(!stateCategories)}
              />
            </CategoryContainer>
          </section>
          {stateCategories && (
            <GenericList
              bottom="23%"
              scroll="scroll"
              setState={() => setStateCategories(!stateCategories)}
              data={categoryData}
              onClick={selectCategory}
            />
          )}

          <div className="contentBtnsave">
            <BtnSave
              title="Guardar"
              bgcolor="#DAC1FF"
              icon={<v.iconSave />}
              className="btnsave"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  color: black;

  .sub-container {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    color: ${({ theme }) => theme.text};
    label {
      font-weight: 550;
    }
    .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-items: center;
      margin-bottom: 20px;
      h1 {
        font-size: 30px;
        font-weight: 700;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .form {
      .contentBtnsave {
        padding-top: 20px;
        display: flex;
        justify-content: center;
      }
      section {
        padding-top: 20px;
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
  @keyframes scale-up-bottom {
    0% {
      transform: scale(0.5);
      transform-origin: center bottom;
    }
    100% {
      transform: scale(1);
      transform-origin: center bottom;
    }
  }
`;
const PaidContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const CategoryContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const DateContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  input {
    appearance: none;
    color: ${({ theme }) => theme.text};
    font-family: “Helvetica”, arial, sans-serif;
    font-size: 17px;
    border: none;
    background: ${({ theme }) => theme.bgtotal};
    padding: 4px;
    display: inline-block;
    visibility: visible;
    width: 140px;
    cursor: pointer;
    &:focus {
      border-radius: 10px;

      outline: 0;
      /* box-shadow: 0 0 5px 0.4rem rgba(252, 252, 252, 0.25); */
    }
  }
`;
