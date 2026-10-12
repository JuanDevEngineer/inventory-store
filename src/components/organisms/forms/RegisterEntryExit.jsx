import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  BtnSave,
  SearchBar,
  useProductsStore,
  GenericList,
} from "../../../index";
import { useForm } from "react-hook-form";
import { useCurrentCompany, useCurrentUser } from "../../../hooks/queries/useSession";
import { useProducts } from "../../../hooks/queries/useProducts";
import { useCreateKardexMovement } from "../../../hooks/queries/useKardex";

export function RegisterEntryExit({ onClose, dataSelect, action, type }) {
  const [stateProductList, setStateProductList] = useState(false);
  const { search, selectedProduct, selectProduct, setSearch } = useProductsStore();
  const createMovement = useCreateKardexMovement();
  const { data: currentUser } = useCurrentUser();
  const { data: companyData } = useCurrentCompany();
  const { data: products = [] } = useProducts(companyData?.id, search);
  // every movement starts with no product selected
  useEffect(() => {
    selectProduct([]);
  }, [selectProduct]);
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();
  async function handleSave(data) {
    // kardex movements are only created, never edited
    if (action !== "Edit") {
      const p = {
        date: new Date(),
        type: type,
        user_id: currentUser?.id,
        product_id: selectedProduct.id,
        quantity:parseFloat( data.quantity),
        detail: data.detail,
        company_id:companyData?.id
      };
      await createMovement.mutateAsync(p);
      onClose();
    }
  }

  return (
    <Container>
      <div className="sub-container">
        <div className="headers">
          <section>
            <h1>{action == "Edit" ? "Editar marca" : "Registrar "+ type}</h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>
        <div className="searchContent">
          <div onClick={() => setStateProductList(!stateProductList)}>
            <SearchBar setSearch={setSearch} />
          </div>

          {stateProductList && (
            <GenericList
              bottom="-250px"
              scroll="scroll"
              setState={() => setStateProductList(!stateProductList)}
              data={products}
              onClick={selectProduct}
            />
          )}
        </div>

        <ProductCard>
          <span style={{ color: "#1fee61", fontWeight: "bold" }}>
            {selectedProduct.description}
          </span>
          <span style={{ color: "#f6faf7" }}>
            stock actual: {selectedProduct.stock}
          </span>
        </ProductCard>

        <form className="form" onSubmit={handleSubmit(handleSave)}>
          <section>
            <article>
              <InputText icon={<v.iconBrand />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.description}
                  type="text"
                  placeholder=""
                  {...register("quantity", {
                    required: true,
                  })}
                />
                <label className="form__label">Cantidad</label>
                {errors.quantity?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icon={<v.iconBrand />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.description}
                  type="text"
                  placeholder=""
                  {...register("detail", {
                    required: true,
                  })}
                />
                <label className="form__label">Motivo</label>
                {errors.detail?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <div className="btnSaveContent">
              <BtnSave
                icon={<v.iconSave />}
                title="Guardar"
                bgcolor="#ef552b"
              />
            </div>
          </section>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-container {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .searchContent {
      position: relative;
    }
    .form {
      section {
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
`;

const ProductCard = styled.section`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px dashed #54f04f;
  background-color: rgba(84, 240, 79, 0.1);
  padding: 10px;
`;
