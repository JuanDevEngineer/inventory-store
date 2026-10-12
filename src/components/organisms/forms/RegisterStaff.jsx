import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  BtnSave,
  Selector,
  GenericList,
  ModulesList,
  UserTypeData,
  DocumentTypeData,
} from "../../../index";
import { useForm } from "react-hook-form";
import { useCurrentCompany, usePermissions } from "../../../hooks/queries/useSession";
import { useCreateStaff, useUpdateStaff } from "../../../hooks/queries/useStaff";
import { Device } from "../../../styles/breakpoints";

export function RegisterStaff({
  onClose,
  dataSelect,
  action
}) {
  const createStaff = useCreateStaff();
  const updateStaff = useUpdateStaff();
  const { data: companyData } = useCurrentCompany();
  const [stateBrand, setStateBrand] = useState(false);
  const [stateCategory, setStateCategory] = useState(false);
  const [subAction] = useState("");
  const [checkboxes, setCheckboxes] = useState([]);
  const [userType, setUserType] = useState({
    icon: "",
    description: "empleado",
  });
  const [documentType, setDocumentType] = useState({ icon: "", description: "dni" });
  // permissions of the user being edited (none for a new user)
  const { data: userPermissions, isLoading } = usePermissions(
    action === "Edit" ? dataSelect.id : null,
  );

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
        name: data.name,
        document_number: data.document_number,
        phone: data.phone,
        address: data.address,
        status: "activo",
        user_type: userType.description,
        document_type: documentType.description,

      };
      await updateStaff.mutateAsync({ user: p, permissionChecks: checkboxes });

      onClose();
    } else {
      const p = {
        name: data.name,
        email: data.email,
        document_number: data.document_number,
        phone: data.phone,
        address: data.address,
        status: "activo",
        user_type: userType.description,
        document_type: documentType.description,
        company_id: companyData?.id,
      };
      const authParams = {
        email: data.email,
        password: data.password,
      };
      await createStaff.mutateAsync({ authParams, user: p, permissionChecks: checkboxes });

      onClose();
    }
  }
  useEffect(() => {
    if (action === "Edit") {
      setDocumentType({icon: "", description: dataSelect.document_type})
      setUserType({
        icon: "",
        description: dataSelect.user_type,
      })
    }
  }, [action, dataSelect.document_type, dataSelect.user_type]);
  if (isLoading) {
    return <span>cargando...</span>;
  }
  return (
    <Container>
      <div className="sub-container">
        <div className="headers">
          <section>
            <h1>
              {action == "Edit" ? "Editar personal" : "Registrar personal"}
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

                  disabled={action === "Edit" ? true : false}
                  className={action==="Editar"?"form__field disabled":"form__field"}
                  defaultValue={dataSelect.email}
                  type="text"
                  placeholder=""
                  {...register("email", {
                    required: action==="Edit"?false:true,
                  })}
                />
                <label className="form__label">Correo</label>

                {errors.email?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            {action != "Edit" ? (
              <article>
                <InputText icon={<v.iconPassword />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.password}
                    type="text"
                    placeholder=""
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <label className="form__label">pass</label>

                  {errors.password?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
            ) : null}

            <article>
              <InputText icon={<v.iconName />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.name}
                  type="text"
                  placeholder=""
                  {...register("name", {
                    required: true,
                  })}
                />
                <label className="form__label">Nombres</label>

                {errors.name?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <ContainerSelector>
              <label>Tipo doc: </label>
              <Selector
                state={stateBrand}
                color="#fc6027"
                text1="🎴"
                text2={documentType.description}
                onClick={() => setStateBrand(!stateBrand)}
              />

              {stateBrand && (
                <GenericList
                  bottom="-260px"
                  scroll="scroll"
                  setState={() => setStateBrand(!stateBrand)}
                  data={DocumentTypeData}
                  onClick={(p) => setDocumentType(p)}
                />
              )}

              {subAction}
            </ContainerSelector>

            <article>
              <InputText icon={<v.iconStock />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.document_number}
                  type="number"
                  placeholder=""
                  {...register("document_number", {
                    required: true,
                  })}
                />
                <label className="form__label">Nro. doc</label>

                {errors.document_number?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icon={<v.iconMinStock />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.phone}
                  type="text"
                  placeholder=""
                  {...register("phone", {
                    required: true,
                  })}
                />
                <label className="form__label">Telefono</label>

                {errors.phone?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icon={<v.iconBarcode />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.address}
                  type="text"
                  placeholder=""
                  {...register("address", {
                    required: true,
                  })}
                />
                <label className="form__label">Direccion</label>

                {errors.address?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
          </section>
          <section className="section2">
            <ContainerSelector>
              <label>Tipo: </label>
              <Selector
                state={stateCategory}
                color="#fc6027"
                text1="👷‍♂️"
                text2={userType.description}
                onClick={() => setStateCategory(!stateCategory)}
              />

              {stateCategory && (
                <GenericList
                  bottom="-150px"
                  scroll="scroll"
                  setState={() => setStateCategory(!stateCategory)}
                  data={UserTypeData}
                  onClick={(p) => setUserType(p)}
                />
              )}
            </ContainerSelector>
            PERMISOS:🔑
            <ModulesList
              action={action}
              setCheckboxes={setCheckboxes}
              checkboxes={checkboxes}
              userPermissions={userPermissions}
            />

          </section>
          <div className="btnSaveContent">
            <BtnSave
              icon={<v.iconSave />}
              title="Guardar"
              bgcolor="#EF552B"
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
