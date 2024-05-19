import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, InputGroup, FormControl, Alert } from "react-bootstrap";

import { useUserContext } from "../../context/UserContext";
import CulinaryApi from "../../api";

import styles from "./login.module.css";

export const LoginPage = () => {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { setIsAuth, user, setUser } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !pwd) {
      setErrMsg("Поля не могут быть пустыми");
      return;
    }
    const { status, message, data } = await CulinaryApi.login(name, pwd);

    if (status !== 200) {
      setErrMsg(message);
      return;
    }

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));

    setPwd("");
  };

  const validateForm = () => {
    setIsFormValid(name.trim() !== "" && pwd.trim() !== "");
  };

  const handleSignin = () => {
    setIsAuth(true);
  };

  useEffect(() => {
    validateForm();
  }, [name, pwd]);

  return (
    <Container className="d-flex align-items-center justify-content-center">
      {user ? (
        <Alert variant="success" className={styles.successAlert}>
          <img src="/images/success.png" alt="Успешно!" width="50" height="50" />
          <Alert.Heading>Успешный вход!</Alert.Heading>
          <p>Ваше имя пользователя: {user.name}</p>
          <p>Ваши баллы: {user.points}</p>
          <p>Теперь вы можете получить доступ к своему аккаунту.</p>
          <Link to="/">
            <Button variant="primary" onClick={handleSignin}>
              {" "}
              Далее{" "}
            </Button>
          </Link>
        </Alert>
      ) : (
        <section className={styles.root}>
          <Alert variant="danger" show={errMsg !== ""}>
            {errMsg}
          </Alert>
          <h1 className={styles.title}>Вход</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginUsername">
              <Form.Label>Имя пользователя:</Form.Label>
              <InputGroup>
                <FormControl type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Пароль:</Form.Label>
              <InputGroup>
                <FormControl type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
              </InputGroup>
            </Form.Group>
            <Button
              variant={!isFormValid ? "secondary" : "primary"}
              type="submit"
              className="w-100"
              disabled={!isFormValid}
            >
              Войти
            </Button>
          </Form>
        </section>
      )}
    </Container>
  );
};
