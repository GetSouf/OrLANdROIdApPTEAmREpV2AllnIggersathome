
import base64 from 'react-native-base64'


export async function fetchTopApplications(сортировка, количество, смещение) {
    const url = `https://ипп.орлан-прогрессив.рф/приложения/топ/?сортировка=${сортировка}&количество=${количество}&смещение=${смещение}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json',
        },
      });

      if (!response.ok) {
        return { status: response.status, data: [] };
      }

      const data = await response.json();
      return { status: response.status, data: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
  }

  export async function fetchTopApplicationsByTextSearch(запрос,сортировка, количество, смещение) {
    const url = `http://ипп.орлан-прогрессив.рф/приложения/?запрос=${запрос}&сортировка=${сортировка}&количество=${количество}&смещение=${смещение}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json',
        },
      });

      if (!response.ok) {
        return { status: response.status, data: [] };
      }

      const data = await response.json();
      return { status: response.status, data: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
  }

  export async function fetchTopApplicationsByCategory(категория,сортировка, количество, смещение) {
    const url = `https://ипп.орлан-прогрессив.рф/приложения/категория/?категория=${категория}&сортировка=${сортировка}&количество=${количество}&смещение=${смещение}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json',
        },
      });

      if (!response.ok) {
        return { status: response.status, data: [] };
      }

      const data = await response.json();
      return { status: response.status, data: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
  }

  export async function fetchMyApplications(login, token) {
    const url = `https://ипп.орлан-прогрессив.рф/аккаунт/приложения/`;

    try {
      const encodedCredentials = base64.encode(`${login}:${token}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'Application/json',
      },
    });

      if (!response.ok) {
        return { status: response.status, data: [] };
      }


      const data = await response.json();
      console.log(response);
      return { status: response.status, data: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
  }







