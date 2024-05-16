import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, FormControl, Alert } from "react-bootstrap";

import CulinaryApi from "../../api";

import styles from "./login.module.css";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [userData, setUserData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !pwd) {
      setErrMsg("Поля не могут быть пустыми");
      return;
    }
    const { status, message, data } = await CulinaryApi.login(user, pwd);

    if (status !== 200) {
      setErrMsg(message);
      return;
    }


    setUserData(data);
    localStorage.setItem('userId', data.id);
    localStorage.setItem('userPoints', data.points);
    localStorage.setItem('userName', data.name);
    localStorage.setItem('userOpenedCountries', JSON.stringify(data.openedCountries));

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
          <p>Ваше имя пользователя: {userData.name}</p>
          <p>Ваши баллы: {userData.points}</p>
          <p>Теперь вы можете получить доступ к своему аккаунту.</p>
          <Link to="/user">
            <Button variant="primary"> Далее </Button>
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
                <FormControl type="text" value={user} onChange={(e) => setUser(e.target.value)} />
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
              disabled={!isFormValid}>
              Войти
            </Button>
          </Form>
        </section>
      )}
    </Container>
  );
};
