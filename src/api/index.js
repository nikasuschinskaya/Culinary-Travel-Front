import axios from "axios";

const baseUrl = `https://localhost:7000/api`;

class CulinaryApi {
  async login(user, pwd) {
    try {
      const response = await axios.post(`${baseUrl}/user/login`, { login: user, password: pwd }, { withCredentials: true });
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));

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
      return data;
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  async fetchCountryByCode(countryCode) {
    try {
      const { data } = await axios.get(`${baseUrl}/Country/${countryCode}`);
      return data;
    } catch (error) {
      console.error("Error fetching country by code:", error);
      throw error;
    }
  }

  async buyCountry(shortName, userId) {
    try {
      console.log(userId);
      const response = await axios.post(
        `${baseUrl}/user/buy-country/${shortName}?userId=${userId}`, 
        null, 
        { withCredentials: true });

      console.log(response?.data);
      console.log(JSON.stringify(response));
      return { status: 200, message: 'success' };
    } catch (error) {
      console.error("Ошибка при покупке страны:", error);
      return { status: 500, message: 'Ошибка при покупке страны' };
    }
  }

  async fetchRecipe(orderalNumber, country, userId) {
    try {
      const response = await axios.get(
        `${baseUrl}/${country}/${orderalNumber}/${userId}`, 
        { withCredentials: true });
      console.log(response.data);
      return { status: 200, message: 'success', data: response.data };
    } catch (error) {
      console.error("Ошибка при получении рецепта:", error);
      return { status: 500, message: 'Ошибка при получении рецепта' };
    }
  }

  async fetchRecipeTest(orderalNumber, country, userId) {
    try {
      const response = await axios.get(
        `${baseUrl}/${country}/${orderalNumber}/test/${userId}`, 
        { withCredentials: true });
      console.log(response.data);
      return { status: 200, message: 'success', data: response.data };
    } catch (error) {
      console.error("Ошибка при получении теста рецепта:", error);
      return { status: 500, message: 'Ошибка при получении теста рецепта' };
    }
  }
  
  async fetchRecipeStep(recipeOrderalNumber, recipeStepOrderalNumber, country, userId) {
    try {
      const response = await axios.get(
        `${baseUrl}/${country}/${recipeOrderalNumber}/${recipeStepOrderalNumber}/${userId}`,
        { withCredentials: true });
      console.log(response.data);
      return { status: 200, message: 'success', data: response.data };
    } catch (error) {
      console.error("Ошибка при получении шага рецепта:", error);
      return { status: 500, message: 'Ошибка при получении шага рецепта' };
    }
  }
  
  async completeRecipe(recipeOrderalNumber, country, userId) {
    try {
      const response = await axios.put(
        `${baseUrl}/${country}/${recipeOrderalNumber}/complete?userId=${userId}`,
         null, 
         { withCredentials: true });
      console.log(response.data);
      return { status: 204, message: 'success' };
    } catch (error) {
      console.error("Ошибка при завершении рецепта:", error);
      return { status: 500, message: 'Ошибка при завершении рецепта' };
    }
  }  

  async changeToNextProgress(country, userId, recipeId) {
    try {
      const response = await axios.put(
        `${baseUrl}/${country}/change-progress?userId=${userId}&recipeId=${recipeId}`,
        null,
        { withCredentials: true }
      );
      console.log(response.data);
      return { status: 204, message: 'success' };
    } catch (error) {
      console.error("Ошибка при изменении прогресса рецепта:", error);
      return { status: 500, message: 'Ошибка при изменении прогресса рецепта' };
    }
  }

  async addRecipeToFavorite(orderalNumber, country, userId) {
    try {
      const response = await axios.post(
        `${baseUrl}/${country}/${orderalNumber}/like?userId=${userId}`,
        null,
        { withCredentials: true }
      );
      console.log(response.data);
      return { status: 204, message: 'success' };
    } catch (error) {
      console.error("Ошибка при добавлении рецепта в избранное:", error);
      return { status: 500, message: 'Ошибка при добавлении рецепта в избранное' };
    }
  }

}

export default new CulinaryApi();