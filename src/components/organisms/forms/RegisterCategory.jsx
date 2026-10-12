import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText, Spinner, BtnSave } from "../../../index";
import { useForm } from "react-hook-form";
import { CirclePicker } from "react-color";
import { useCurrentCompany } from "../../../hooks/queries/useSession";
import { useCreateCategory, useUpdateCategory } from "../../../hooks/queries/useCategories";

export function RegisterCategory({ onClose, dataSelect, action }) {
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const { data: companyData } = useCurrentCompany();
  const [currentColor, setColor] = useState("#F44336");
  const [isProcessing, setIsProcessing] = useState(false);
  function pickColor(color) {
    setColor(color.hex);
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function handleSave(data) {
    if (action === "Edit") {
      const p = {
        id: dataSelect.id,
        description: data.description,
        color: currentColor,
        company_id: companyData?.id,
      };
      setIsProcessing(true);
      await updateCategory.mutateAsync(p);
      setIsProcessing(false);
      onClose();
    } else {
      const p = {
        _description: data.description,
        _color: currentColor,
        _company_id: companyData?.id,
      };

      setIsProcessing(true);
      await createCategory.mutateAsync(p);
      setIsProcessing(false);
      onClose();
    }
  }
  useEffect(() => {
    if (action === "Edit") {
      setColor(dataSelect.color);
    }
  }, [action, dataSelect.color]);
  return (
    <Container>
      {isProcessing && <Spinner />}

      <div className="sub-container">
        <div className="headers">
          <section>
            <h1>
              {action == "Edit"
                ? "Editar categoria"
                : "Registrar nueva categoria"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>
        <form className="form" onSubmit={handleSubmit(handleSave)}>
          <section>
            <article>
              <InputText icon={<v.iconArrowRight />}>
                <input
                className="form__field"
                  defaultValue={dataSelect.description}
                  type="text"
                  placeholder="categoria"
                  {...register("description", {
                    required: true,
                  })}
                />
 <label className="form__label">categoria</label>
                {errors.description?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>

            <div className="colorContainer">
              <ContentTitle>
                {<v.iconColorPalette />}
                <span>Color</span>
              </ContentTitle>
              <div className="colorPickerContent">
                <CirclePicker onChange={pickColor} color={currentColor} />
              </div>
            </div>

            <div className="btnSaveContent">
              <BtnSave
                icon={<v.iconSave />}
                title="Guardar"
                bgcolor="#DAC1FF"
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

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
