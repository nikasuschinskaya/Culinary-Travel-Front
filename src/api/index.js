import axios from "axios";

const baseUrl = `https://localhost:7000/api`;

class CulinaryApi {
  async login(user, pwd) {
    try {
      const response = await axios.post(`${baseUrl}/user/login`, { login: user, password: pwd }, { withCredentials: true });
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      // localStorage.setItem('user', user);

      return { status: 200, message: 'success', data: response.data };
    } catch (err) {
      if (!err?.response) {
        return { status: 500, message: 'Нет ответа сервера' };
      } else if (err.response?.status === 401) {
        return { status: 401, message: 'Неверное имя пользователя или пароль' };
      } else {
        return { status: 404, message: 'Ошибка авторизации' };
      }
    }
  }

  async registration(user, pwd) {
    try {
      const response = await axios.post(
        `${baseUrl}/user/register`,
        { login: user, password: pwd, name: user },
        { withCredentials: true }
      );
      // const response = await axios.post(REGISTER_URL, { login: user, password: pwd, name: user });

      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));

      return { status: 200, message: 'success' };

    } catch (err) {
      if (!err?.response) {
        return { status: 500, message: 'Нет ответа сервера' };
      } else if (err.response?.status === 409) {
        return { status: 409, message: 'Имя пользователя принято' };
      } else {
        return { status: 404, message: 'Регистрация не удалась' };
      }

    }
  }

  async fetchCountries() {
    try {
      const { data } = await axios.get(`${baseUrl}/Country/all`);
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }
}

export default new CulinaryApi();
