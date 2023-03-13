import { FormLogin } from "../../components/FormLogin";
import Header from "../../components/Header";
import logoSchool from "../../assets/header-logo.svg";
import logoDesktop from "../../assets/logoDesktop.svg";
import {
  DivForm,
  DivSignUpLink,
  FigureImgLogo,
  MainContainer,
  SignUpLink,
} from "./style";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useContext } from "react";
import { UserContext } from "../../Providers/UserContext";

const Login = () => {
  const { loading } = useContext(UserContext);

  return (
    <MainContainer>
      {loading ? <Loader /> : null}
      <FigureImgLogo>
        <img src={logoDesktop} alt="logo-school" />
      </FigureImgLogo>
      <DivForm>
        <FormLogin />
        <p>Não tem uma conta?</p>
        <DivSignUpLink>
          <SignUpLink to="/register" className="signUpLink">
            Cadastre-se
          </SignUpLink>
        </DivSignUpLink>
      </DivForm>
    </MainContainer>
  );
};
export default Login;
