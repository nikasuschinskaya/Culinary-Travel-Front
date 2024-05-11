import React, { useState } from 'react';
import { Button, Container, Form, InputGroup, FormControl, Alert } from 'react-bootstrap'; 
import axios from '../../api/axios';
import './Login.css';

const LOGIN_URL = '/api/user/login'; 

const Login = () => {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !pwd) {
            setErrMsg("Поля не могут быть пустыми");
            return;
        }

        try {
            const response = await axios.post(LOGIN_URL, { login: user, password: pwd }, { withCredentials: true });
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response));
            localStorage.setItem('user', user);
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Нет ответа сервера');
            } else if (err.response?.status === 401) {
                setErrMsg('Неверное имя пользователя или пароль');
            } else {
                setErrMsg('Ошибка авторизации');
            }
        }
    };

    const validateForm = () => {
        setIsFormValid(user.trim() !== '' && pwd.trim() !== '');
    };

    React.useEffect(() => {
        validateForm();
    }, [user, pwd]);

    return (
        <Container style={{ width: '500px' }}>
            {success ? (
                <Alert variant="success" className='successAlert'>
                    <img 
                        src='https://lh3.googleusercontent.com/pw/AP1GczO4G2zAFRWAP4UL-aeXynmR89BSsZQgYNGbSIbfBkji6Ys4GGvUJfAzfq7jOSiaO4-GaEK3bghxRxjozf0nTiwYzH8pNC6yFpyRK0ioik6H6PQ6nGFBnBl2JGCvw71xjh8YT5RzYG5lHYFlwpjGbycn=w800-h800-s-no-gm?authuser=0' 
                        alt="Успешно!" 
                        width='50'
                        height='50'
                    />
                    <Alert.Heading>Успешный вход!</Alert.Heading>
                    <p>Ваше имя пользователя: {user}</p>
                    <p>Теперь вы можете получить доступ к своему аккаунту.</p>
                    <Button variant="primary" href='/home'>Далее</Button>
                </Alert>
            ) : (
                <section>
                    <Alert variant="danger" show={errMsg !== ''}>
                        {errMsg}
                    </Alert>
                    <h1>Вход</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="loginUsername">
                            <Form.Label>Имя пользователя:</Form.Label>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginPassword">
                            <Form.Label>Пароль:</Form.Label>
                            <InputGroup>
                                <FormControl
                                    type="password"
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                />
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

export default Login;
