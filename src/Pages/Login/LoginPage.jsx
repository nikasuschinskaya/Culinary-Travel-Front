import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, FormControl, Alert } from "react-bootstrap";

import CulinaryApi from "../../api";

import styles from "./login.module.css";

export const LoginPage = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !pwd) {
      setErrMsg("Поля не могут быть пустыми");
      return;
    }
    const { status, message } = await CulinaryApi.login(user, pwd);

    if (status !== 200) {
      setErrMsg(message);
      return;
    }

    setPwd("");
    setSuccess(true);
  };

  const validateForm = () => {
    setIsFormValid(user.trim() !== "" && pwd.trim() !== "");
  };

  useEffect(() => {
    validateForm();
  }, [user, pwd]);

  return (
    <Container className="d-flex align-items-center justify-content-center">
      {success ? (
        <Alert variant="success" className={styles.successAlert}>
          <img
            src="/images/success.png"
            alt="Успешно!"
            width="50"
            height="50"
          />
          <Alert.Heading>Успешный вход!</Alert.Heading>
          <p>Ваше имя пользователя: {user}</p>
          <p>Теперь вы можете получить доступ к своему аккаунту.</p>
          <Button variant="primary" href="/home">
            Далее
          </Button>
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
                <FormControl type="text" value={user} onChange={(e) => setUser(e.target.value)} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Пароль:</Form.Label>
              <InputGroup>
                <FormControl type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={!isFormValid}>
              Войти
            </Button>
          </Form>
        </section>
      )}
    </Container>
  );
};
