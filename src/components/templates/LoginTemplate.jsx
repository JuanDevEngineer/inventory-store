import styled from "styled-components";
import {
  BtnSave,
  v,
  useAuthStore,
  InputText,
  RegisterAdmin,
  LoginFooter,
} from "../../index";
import {Device} from "../../styles/breakpoints"
import stars from "../../assets/stars.svg";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import cart from "../../assets/cart.svg";
import logo from "../../assets/inventory-logo.png";
import { MdOutlineInfo } from "react-icons/md";
import ThemeContext from "../../context/ThemeContext";
export function LoginTemplate() {
  const {
    setTheme
  } = useContext(ThemeContext);
  setTheme("light")
  const { signInWithEmail } = useAuthStore();
  const [state, setState] = useState(false);
  const [, setEmail] = useState("");
  const [, setPassword] = useState("");
  const [stateLoginError, setStateLoginError] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();
  async function handleLogin(data) {
    const response = await signInWithEmail({
      email: data.email,
      password: data.password,
    });
    if (response) {
      navigate("/");
    } else {
      setStateLoginError(!stateLoginError);
    }
  }

  return (
    <Container>
      <div className="contentLogo">
        <img src={logo}></img>
        <span>StockPRO</span>
      </div>
      <div className="side-banner">
        <img src={cart}></img>
      </div>

      <div className="contentCard">
        <div className="card">
          {state && <RegisterAdmin setState={() => setState(!state)} />}

          <BrandTitle>StockPRO</BrandTitle>
          {stateLoginError && (
            <LoginErrorText>datos incorrectos</LoginErrorText>
          )}
          <span className="help">
            {" "}
            Puedes crear una cuenta nueva ó <br></br>solicitar a tu empleador
            una. <MdOutlineInfo />
          </span>
          <p className="phrase">Controla tu inventario.</p>
          <form onSubmit={handleSubmit(handleLogin)}>
            <InputText icon={<v.iconEmail />}>
              <input
                className="form__field"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="email"
                {...register("email", {
                  required: true,
                })}
              />
              <label className="form__label">email</label>
              {errors.email?.type === "required" && <p>Campo requerido</p>}
            </InputText>
            <InputText icon={<v.iconPassword />}>
              <input
                className="form__field"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="contraseña"
                {...register("password", {
                  required: true,
                })}
              />
              <label className="form__label">pass</label>
              {errors.password?.type === "required" && <p>Campo requerido</p>}
            </InputText>
            <ContainerBtn>
              <BtnSave title="Iniciar" bgcolor="#fc6b32" />
              <BtnSave
                onClick={() => setState(!state)}
                title="Crear cuenta"
                bgcolor="#ffffff"
              />
            </ContainerBtn>
          </form>
        </div>
        <LoginFooter />
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-size: cover;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #262626;
  @media ${Device.tablet} {
    grid-template-columns: 1fr 2fr;
  }
  .contentLogo {
    position: absolute;
    top: 15px;
    font-weight: 700;
    display: flex;
    left: 15px;
    align-items: center;
    color: #fff;

    img {
      width: 50px;
    }
  }
  .grid-lines {
    transition: cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
    transition: 0.6s;
  }

  .side-banner {
    background-color: #fc6b32;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
    }
  }
  .contentCard {
    grid-column: 2;
    background-color: #ffffff;
    background-image: url(${stars});
    background-size: cover;
    z-index: 100;
    position: relative;
    gap: 30px;
    display: flex;
    padding: 20px;
    box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);
    justify-content: center;
    width: auto;
    height: 100%;
    width: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .card {
      padding-top: 80px;
      width: 100%;
      @media ${Device.laptop} {
        width: 50%;
      }
    }
    .version {
      color: #727272;
      text-align: start;
    }
    .contentImg {
      width: 100%;
      display: flex;
      justify-content: center;

      img {
        width: 40%;

        animation: float 1.5s ease-in-out infinite alternate;
      }
    }
    .phrase {
      color: #fc6c32;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom:30px;
    }
    .help {
      position: absolute;
      top: 15px;
      right: 15px;
      color: #8d8d8d;
      font-size: 15px;
      font-weight: 500;
    }
    &:hover {
      .contentsvg {
        top: -100px;
        opacity: 1;
      }
      .grid-lines {
        transform: rotate(37deg) rotateX(5deg) rotateY(12deg) rotate(3deg)
          skew(2deg) skewY(1deg) scaleX(1.2) scaleY(1.2);
        color: red;
      }
    }
  }
  @keyframes float {
    0% {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, -0px);
    }
  }
`;
const BrandTitle = styled.span`
  font-size: 3rem;
  font-weight: 700;
`;
const ContainerBtn = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;
const LoginErrorText = styled.p`
  color: #fc7575;
`;
