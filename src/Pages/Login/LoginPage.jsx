import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, FormControl, Alert } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import CulinaryApi from "../../api";

import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [userData, setUserData] = useState({});
  const { setUserPoints } = useUserContext();
  const navigate = useNavigate();

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
    localStorage.setItem('userFavoriteRecipes', JSON.stringify(data.favoriteRecipes));
    localStorage.setItem('userRecipesProgress', JSON.stringify(data.recipesProgress));

    setUserPoints(data.points);

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
        navigate("/user")
      ) : (
        <section className={styles.root}>
          <Alert variant="danger" show={errMsg !== ""}>
            {errMsg}
          </Alert>
          <h1 className={styles.logLabel}>Вход</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginUsername">
              <Form.Label className={styles.formLabel}>Имя пользователя:</Form.Label>
              <InputGroup>
                <FormControl type="text" value={user} onChange={(e) => setUser(e.target.value)} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label className={styles.formLabel}>Пароль:</Form.Label>
              <InputGroup>
                <FormControl type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
              </InputGroup>
            </Form.Group>
            <Button
              className={`${styles.customButton} ${!isFormValid ? styles.secondary : styles.primary} w-100`}
              type="submit" 
              disabled={!isFormValid}>
              Войти
            </Button>
          </Form>
        </section>
      )}
    </Container>
  );
};
