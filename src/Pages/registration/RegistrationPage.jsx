import { useState, useEffect } from "react";
import { Button, Container, Form, InputGroup, FormControl, Alert } from "react-bootstrap";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { USER_REGEX, PWD_REGEX } from "../../utils/validation";
import CulinaryApi from "../../api";

import styles from "./registration.module.css";

export const RegistrationPage = () => {
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const userValid = USER_REGEX.test(user);
    setValidName(userValid);
  }, [user]);

  useEffect(() => {
    const pwdValid = PWD_REGEX.test(pwd);
    setValidPwd(pwdValid);
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validName || !validPwd || !validMatch) {
      setErrMsg("Неверный ввод");
      return;
    }

    const { status, message } = await CulinaryApi.registration(user, pwd);

    if (status !== 200) {
      setErrMsg(message);
      return;
    }

    setSuccess(true);
    setUser("");
    setPwd("");
    setMatchPwd("");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      {success ? (
        <Alert variant="success" className={styles.successAlert}>
          <img src="/images/success.png" alt="Успешно!" width="50" height="50" />
          <Alert.Heading>Вы успешно зарегистрированы!</Alert.Heading>
          <p>Для входа в приложение нажмите на кнопку {"Вход"}</p>
        </Alert>
      ) : (
        <section className={styles.root}>
          <Alert variant="danger" show={errMsg !== ""}>
            {errMsg}
          </Alert>
          <h1>Регистрация</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Имя пользователя:</Form.Label>
              <InputGroup>
                <FormControl
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  isInvalid={userFocus && user && !validName}
                />
                <Button variant="outline-secondary" disabled={!validName}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? styles.valid : styles.hide}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !user ? styles.hide : styles.invalid}
                  />
                </Button>
              </InputGroup>
              <Form.Text className="text-muted">
                {userFocus && user && !validName && (
                  <span>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    От 4 до 24 символов. Должно начинаться с буквы. Допускаются буквы, цифры,
                    подчеркивания, дефисы.
                  </span>
                )}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Пароль:</Form.Label>
              <InputGroup>
                <FormControl
                  type="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  isInvalid={pwdFocus && !validPwd}
                />
                <Button variant="outline-secondary" disabled={!validPwd}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? styles.valid : styles.hide}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !pwd ? styles.hide : styles.invalid}
                  />
                </Button>
              </InputGroup>
              <Form.Text className="text-muted">
                {pwdFocus && !validPwd && (
                  <span>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    От 8 до 24 символов. Должно содержать прописные и строчные буквы, цифры и
                    специальные символы. Разрешенные специальные символы:
                    <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                  </span>
                )}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirm_pwd">
              <Form.Label>Подтвердите пароль:</Form.Label>
              <InputGroup>
                <FormControl
                  type="password"
                  value={matchPwd}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  isInvalid={matchFocus && !validMatch}
                />
                <Button variant="outline-secondary" disabled={!validMatch}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPwd ? styles.valid : styles.hide}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validMatch || !matchPwd ? styles.hide : styles.invalid}
                  />
                </Button>
              </InputGroup>
              <Form.Text className="text-muted">
                {matchFocus && !validMatch && (
                  <span>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Должно соответствовать первому полю ввода пароля.
                  </span>
                )}
              </Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={!validName || !validPwd || !validMatch}
            >
              Зарегистрироваться
            </Button>
          </Form>
        </section>
      )}
    </Container>
  );
};
