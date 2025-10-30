import InputField from "../../components/common/InputField/InputField";
import RegButton from "../../components/common/RegButton/RegButton";
import { useState } from "react";
import styles from "./AuthPage.module.css";
import logo from "../../logo.svg";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regFirstName, setRegFirstName] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const changeAuthEmail = (event) => {
    setAuthEmail(event.target.value);
  };

  const changeAuthPassword = (event) => {
    setAuthPassword(event.target.value);
  };

  const changeRegEmail = (event) => {
    setRegEmail(event.target.value);
  };

  const changeRegLastName = (event) => {
    setRegLastName(event.target.value);
  };

  const changeRegFirstName = (event) => {
    setRegFirstName(event.target.value);
  };

  const changeRegPassword = (event) => {
    setRegPassword(event.target.value);
  };

  const CreateAccount = async () => {
    const { authService } = await import('../../services/api/AuthService');
    try {
        const newUser = await authService.Registration({
            email: regEmail,
            password: regPassword,
            firstname: regFirstName,
            lastname: regLastName
        });
        console.log("user created!");
    }
    catch(error) {
        console.log(error);
    }
  };

  return (
    <div className={styles.page}>
      <div>
        <div className={styles.msglogoandname}>
          <img src={logo} alt="" className={styles.messenglogo}></img>
          <span>Raven</span>
        </div>
        <span className={styles.heading}>Платформа Безопаного Общения</span>
      </div>
      <div
        className={`${styles.authWindow} ${
          isLogin ? styles["auth-login"] : styles["auth-register"]
        }`}
      >
        <div className={styles.authorreg}>
          <span
            className={isLogin ? styles.active : ""}
            onClick={() => setIsLogin(true)}
          >
            Авторизация
          </span>
          <span
            className={!isLogin ? styles.active : ""}
            onClick={() => setIsLogin(false)}
          >
            Регистрация
          </span>
        </div>
        {isLogin ? (
          <>
            <InputField
              key="login-email"
              header="Эл. Почта"
              placeholder="Введите эл.почту..."
              type="text"
              onChange={changeAuthEmail}
            ></InputField>
            <InputField
              key="login-password"
              header="Пароль"
              placeholder="Введите свой пароль..."
              type="text"
              onChange={changeAuthPassword}
            ></InputField>
            <div className="authorregbutton">
              <RegButton color="blue" size="medium">
                Войти
              </RegButton>
            </div>
          </>
        ) : (
          <>
            <InputField
              key="register-email"
              header="Эл. Почта"
              placeholder="Введите эл.почту..."
              type="text"
              onChange={changeRegEmail}
            ></InputField>
            <InputField
              key="register-name"
              header="Имя пользователя"
              placeholder="Введите ваше имя..."
              type="text"
              onChange={changeRegFirstName}
            ></InputField>
            <InputField
              key="register-lastname"
              header="Фамилия пользователя"
              placeholder="Введите вашу фамилию..."
              type="text"
              onChange={changeRegLastName}
            ></InputField>
            <InputField
              key="register-password"
              header="Пароль"
              placeholder="Введите свой пароль..."
              type="text"
              onChange={changeRegPassword}
            ></InputField>
            <div className="authorregbutton">
              <RegButton color="blue" size="medium" onClick={CreateAccount}>
                Зарегистрироваться
              </RegButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
