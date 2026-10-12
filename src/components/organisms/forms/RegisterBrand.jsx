import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText, BtnSave } from "../../../index";
import { useForm } from "react-hook-form";
import { useCurrentCompany } from "../../../hooks/queries/useSession";
import { useCreateBrand, useUpdateBrand } from "../../../hooks/queries/useBrands";

export function RegisterBrand({ onClose, dataSelect, action }) {
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const { data: companyData } = useCurrentCompany();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function handleSave(data) {
    if (action === "Edit") {
      const p = {
        id: dataSelect.id,
        description: data.name,
        
      };
      await updateBrand.mutateAsync(p);
      onClose();
    } else {
      const p = {
        _description: data.name,
        _company_id: companyData?.id,
      };
      await createBrand.mutateAsync(p);
      onClose();
    }
  }
  return (
    <Container>

      <div className="sub-container">
        <div className="headers">
          <section>
            <h1>
              {action == "Edit" ? "Editar marca" : "Registrar nueva marca"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
          
        </div>
        
        <form className="form" onSubmit={handleSubmit(handleSave)}>
          <section>
            <article>
              <InputText icon={<v.iconBrand />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.description}
                  type="text"
                  placeholder=""
                  {...register("name", {
                    required: true,
                  })}
                />
                <label className="form__label">marca</label>
                {errors.name?.type === "required" && (
                  <p>Campo requerido</p>
                )}
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
