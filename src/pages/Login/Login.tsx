import React from "react";
import { useNavigate } from "react-router";
import { login } from "../../api/Account";
import logo from "../../assets/logo/dark.svg";
import github from "../../assets/logo/github.svg";
import google from "../../assets/logo/google.svg";
import { AppURL } from "../../configs/consts";
import { useAuth } from "../../providers/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../stores/Store";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./Login.scss";
import {
  Alert,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Spinner,
} from "reactstrap";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const navigate = useNavigate();
  const authToken = useAppSelector((state) => state.user.authToken);

  const userNameRef = React.useRef<HTMLInputElement>(null);
  const passWordRef = React.useRef<HTMLInputElement>(null);
  const checkBoxRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [wrong, setWrong] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (authToken?.accessToken) {
      navigate(AppURL.DASHBOARD);
    }
  }, [auth.token, authToken?.accessToken, navigate]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const username: string = userNameRef.current?.value as string;
    const password: string = passWordRef.current?.value as string;
    dispatch(login({ username: username, password: password })).then(
      (response) => {
        if (response?.data?.success === false) {
          setWrong(true);
          setTimeout(() => {
            setLoading(false);
            setWrong(false);
          }, 1000);
          setTimeout(() => {
            setWrong(false);
          }, 2000);
        }
      }
    );
  };
  return (
    <div className="container-login">
      <div className="div-alert">
        {wrong ? (
          <Alert className="alert" color="danger">
            Email or Password wrong!!!
          </Alert>
        ) : (
          <></>
        )}
      </div>
      <div className="box-login">
        <div className="box-form">
          <div className="div-sign-with">
            <span> Sign in with</span>
          </div>
          <div className="login-gg-github">
            <div className="github-login">
              <Button className="btn-github">
                <img className="img-login" src={github} alt="aaaa" />
                Github
              </Button>
            </div>
            <div className="gg-login">
              <Button className="btn-gg">
                <img className="img-login" src={google} alt="aaaa" />
                Google
              </Button>
            </div>
          </div>
          {/*  */}
          <div className="div-sign-credentials">
            <span> Or sign in with credentials</span>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input">
              <InputGroup className="username">
                <InputGroupText className="icon">
                  <MdOutlineMailOutline />
                </InputGroupText>
                <Input
                  required
                  innerRef={userNameRef}
                  className="input-user"
                  placeholder="Email"
                  type="email"
                />
              </InputGroup>
              <InputGroup className="password">
                <InputGroupText className="icon">
                  <RiLockPasswordFill />
                </InputGroupText>
                <Input
                  required
                  innerRef={passWordRef}
                  className="input-pw"
                  placeholder="Password"
                  type="password"
                />
              </InputGroup>
              <div className="div-checkbox">
                <Input type="checkbox" className="checkbox" />
                <span>Remember me</span>
              </div>
            </div>
            <div className="div-btn-lg">
              <Button disabled={isLoading} type="submit" className="btn-login">
                Sign in
              </Button>
            </div>
          </form>
        </div>
        <div className="div-action-bottom">
          <span>Forgot password?</span>
          <span>Create new account</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
