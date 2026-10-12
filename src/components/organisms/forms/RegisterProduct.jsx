import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  BtnSave,
  useCategoriesStore,
  Selector,
  useBrandsStore,
  GenericList,
  BtnFilter,
  RegisterBrand,
  RegisterCategory,
} from "../../../index";
import { useForm } from "react-hook-form";
import { useCurrentCompany } from "../../../hooks/queries/useSession";
import { Device } from "../../../styles/breakpoints";
import { useBrands } from "../../../hooks/queries/useBrands";
import { useCategories } from "../../../hooks/queries/useCategories";
import { useCreateProduct, useUpdateProduct } from "../../../hooks/queries/useProducts";
export function RegisterProduct({ onClose, dataSelect, action }) {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const { selectBrand, selectedBrand } = useBrandsStore();
  const { selectedCategory, selectCategory } = useCategoriesStore();
  const { data: companyData } = useCurrentCompany();
  const { data: brands = [] } = useBrands(companyData?.id);
  const { data: categories = [] } = useCategories(companyData?.id);
  const [stateBrand, setStateBrand] = useState(false);
  const [stateCategory, setStateCategory] = useState(false);
  const [isBrandFormOpen, setIsBrandFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [subAction, setAction] = useState("");
  function openNewBrand() {
    setIsBrandFormOpen(!isBrandFormOpen);
    setAction("New");
  }
  function openNewCategory() {
    setIsCategoryFormOpen(!isCategoryFormOpen);
    setAction("New");
  }
  const {
    register,

    formState: {
      errors
    },

    handleSubmit
  } = useForm();
  async function handleSave(data) {
    if (action === "Edit") {
      const p = {
        id: dataSelect.id,
        description: data.description,
        brand_id: selectedBrand.id,
        stock: parseFloat(data.stock),
        min_stock: parseFloat(data.min_stock),
        barcode: parseFloat(data.barcode),
        internal_code: data.internal_code,
        sale_price: parseFloat(data.sale_price),
        purchase_price: parseFloat(data.purchase_price),
        category_id: selectedCategory.id,
        company_id: companyData?.id,
      };

      await updateProduct.mutateAsync(p);

      onClose();
    } else {
      const p = {
        _description: data.description,
        _brand_id: selectedBrand.id,
        _stock: parseFloat(data.stock),
        _min_stock: parseFloat(data.min_stock),
        _barcode: parseFloat(data.barcode),
        _internal_code: data.internal_code,
        _sale_price: parseFloat(data.sale_price),
        _purchase_price: parseFloat(data.purchase_price),
        _category_id: selectedCategory.id,
        _company_id: companyData?.id,
      };

      await createProduct.mutateAsync(p);
      onClose();
    }
  }
  useEffect(() => {
    if (action === "Edit") {
      selectBrand({id:dataSelect.brand_id,description:dataSelect.brand})
      selectCategory({id:dataSelect.category_id,description:dataSelect.category})
    }
  }, [action, dataSelect.brand_id, dataSelect.brand, dataSelect.category_id, dataSelect.category, selectBrand, selectCategory]);
  // a new product starts with the first brand and category selected
  useEffect(() => {
    if (action !== "Edit" && !selectedBrand?.id && brands.length > 0) {
      selectBrand(brands[0]);
    }
  }, [action, brands, selectedBrand, selectBrand]);
  useEffect(() => {
    if (action !== "Edit" && !selectedCategory?.id && categories.length > 0) {
      selectCategory(categories[0]);
    }
  }, [action, categories, selectedCategory, selectCategory]);
  return (
    <Container>
     
      <div className="sub-container">
        <div className="headers">
          <section>
            <h1>
              {action == "Edit"
                ? "Editar producto"
                : "Registrar nuevo producto"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>
        <form className="form" onSubmit={handleSubmit(handleSave)}>
          <section className="section1">
            <article>
              <InputText icon={<v.iconName />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.description}
                  type="text"
                  placeholder=""
                  {...register("description", {
                    required: true,
                  })}
                />
                <label className="form__label">Nombre</label>

                {errors.description?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
            <ContainerSelector>
              <label>Marca: </label>
              <Selector
                state={stateBrand}
                color="#fc6027"
                text1="🍿"
                text2={selectedBrand?.description}
                onClick={() => setStateBrand(!stateBrand)}
              />
              <BtnFilter
                onClick={openNewBrand}
                bgcolor="#f6f3f3"
                textcolor="#353535"
                icon={<v.iconAdd />}
              />
              {stateBrand && (
                <GenericList
                  bottom="-260px"
                  scroll="scroll"
                  setState={() => setStateBrand(!stateBrand)}
                  data={brands}
                  onClick={selectBrand}
                />
              )}

              {subAction}
            </ContainerSelector>

            <article>
              <InputText icon={<v.iconStock />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.stock}
                  type="number"
                  placeholder=""
                  {...register("stock", {
                    required: true,
                  })}
                />
                <label className="form__label">Stock</label>

                {errors.stock?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icon={<v.iconMinStock />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.min_stock}
                  type="number"
                  placeholder=""
                  {...register("min_stock", {
                    required: true,
                  })}
                />
                <label className="form__label">Stock minimo</label>

                {errors.min_stock?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
            <ContainerSelector>
              <label>Categoria: </label>
              <Selector
                state={stateCategory}
                color="#fc6027"
                text1="🍿"
                text2={selectedCategory?.description}
                onClick={() => setStateCategory(!stateCategory)}
              />
              <BtnFilter
                onClick={openNewCategory}
                bgcolor="#f6f3f3"
                textcolor="#353535"
                icon={<v.iconAdd />}
              />
              {stateCategory && (
                <GenericList
                  bottom="50px"
                  scroll="scroll"
                  setState={() => setStateCategory(!stateCategory)}
                  data={categories}
                  onClick={selectCategory}
                />
              )}
            </ContainerSelector>
          </section>
          <section className="section2">
            <article>
              <InputText icon={<v.iconBarcode />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.barcode}
                  type="number"
                  placeholder=""
                  {...register("barcode", {
                    required: true,
                  })}
                />
                <label className="form__label">Codigo de barras</label>

                {errors.barcode?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
            <article>
              <InputText icon={<v.iconInternalCode />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.internal_code}
                  type="text"
                  placeholder=""
                  {...register("internal_code", {
                    required: true,
                  })}
                />
                <label className="form__label">Codigo interno</label>

                {errors.internal_code?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
            <article>
              <InputText icon={<v.iconSalePrice />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.sale_price}
                  type="number"
                  placeholder=""
                  {...register("sale_price", {
                    required: true,
                  })}
                />
                <label className="form__label">Precio de venta</label>

                {errors.sale_price?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
            <article>
              <InputText icon={<v.iconPurchasePrice />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.purchase_price}
                  type="number"
                  placeholder=""
                  {...register("purchase_price", {
                    required: true,
                  })}
                />
                <label className="form__label">Precio de compra</label>

                {errors.purchase_price?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
          </section>
          <div className="btnSaveContent">
            <BtnSave
              icon={<v.iconSave />}
              title="Guardar"
              bgcolor="#EF552B"
            />
          </div>
        </form>
        {isBrandFormOpen && (
          <RegisterBrand
            dataSelect={dataSelect}
            onClose={() => setIsBrandFormOpen(!isBrandFormOpen)}
            action={subAction}
          />
        )}
        {isCategoryFormOpen && (
          <RegisterCategory
            dataSelect={dataSelect}
            onClose={() => setIsCategoryFormOpen(!isCategoryFormOpen)}
            action={subAction}
          />
        )}
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
    overflow-y: auto;
    overflow-x: hidden;
    height: 90vh;

    &::-webkit-scrollbar {
      width: 6px;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #484848;
      border-radius: 10px;
    }
    width: 100%;
    max-width: 90%;
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
    .form {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      @media ${Device.tablet} {
        grid-template-columns: repeat(2, 1fr);
      }
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
      .btnSaveContent {
        display: flex;
        justify-content: end;
        grid-column: 1;
        @media ${Device.tablet} {
          grid-column: 2;
        }
      }
    }
  }
`;

const ContainerSelector = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
`;
