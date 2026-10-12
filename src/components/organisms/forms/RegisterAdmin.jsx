import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText, BtnSave } from "../../../index";
import { useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useRegisterAdmin } from "../../../hooks/queries/useStaff";
export function RegisterAdmin({
  setState
}) {
  const registerAdmin = useRegisterAdmin();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function handleSave(data) {
    const user = await registerAdmin.mutateAsync({
      email: data.email,
      password: data.password,
      user_type: "superadmin",
    });
    if (user) {
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo crear la cuenta. Verifica el correo y que la contraseña tenga al menos 6 caracteres.",
      });
    }
  }
  return (
    <Container>
      <ContentClose >
        <span onClick={setState}>x</span>
      </ContentClose>
      <section className="subcontainer">

      <div className="headers">
        <section>
          <h1>Registrar usuario</h1>
        </section>

      </div>

      <form className="form" onSubmit={handleSubmit(handleSave)}>
        <section>
          <article>
            <InputText icon={<MdAlternateEmail />}>
              <input  className="form__field"
                style={{ textTransform: "lowercase" }}
                type="text"
                placeholder="correo"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                })}
              />
               <label className="form__label">email</label>
              {errors.email?.type === "pattern" && (
                <p>El formato del email es incorrecto</p>
              )}
              {errors.email?.type === "required" && <p>Campo requerido</p>}
            </InputText>
          </article>
          <article>
            <InputText icon={<RiLockPasswordLine />}>
              <input  className="form__field"
                type="text"
                placeholder="pass"
                {...register("password", {
                  required: true,
                })}
              />
 <label className="form__label">pass</label>
              {errors.password?.type === "required" && <p>Campo requerido</p>}
            </InputText>
          </article>
          <div className="btnSaveContent">
            <BtnSave
              icon={<v.iconSave />}
              title="Guardar"
              bgcolor="#ff7556"  
            />
          </div>
        </section>
      </form>
      </section>
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 20px;
  background: #fff;
  box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
  padding: 13px 36px 20px 36px;
  z-index: 100;
  display:flex;

  align-items:center;
.subcontainer{
  width: 100%;
}

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
`;

const ContentClose =styled.div`
  position:absolute;
  top:0;
  right:0;
  font-size:33px;
  margin:30px;
  cursor: pointer;

`

