import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, FormControl, Alert } from "react-bootstrap";

import CulinaryApi from "../../api";

import "./login.css";

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
    <Container style={{ width: "500px" }}>
      {success ? (
        <Alert variant="success" className="successAlert">
          <img
            src="https://lh3.googleusercontent.com/pw/AP1GczO4G2zAFRWAP4UL-aeXynmR89BSsZQgYNGbSIbfBkji6Ys4GGvUJfAzfq7jOSiaO4-GaEK3bghxRxjozf0nTiwYzH8pNC6yFpyRK0ioik6H6PQ6nGFBnBl2JGCvw71xjh8YT5RzYG5lHYFlwpjGbycn=w800-h800-s-no-gm?authuser=0"
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
        <section>
          <Alert variant="danger" show={errMsg !== ""}>
            {errMsg}
          </Alert>
          <h1>Вход</h1>
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
            <Button variant="primary" type="submit" disabled={!isFormValid}>
              Войти
            </Button>
          </Form>
        </section>
      )}
    </Container>
  );
};
