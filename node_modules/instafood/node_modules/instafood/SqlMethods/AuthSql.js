import base64 from 'react-native-base64'



export async function fetchDataWithAuth(login, token) {
  const url = 'https://ипп.орлан-прогрессив.рф/';
  
  try {
    const encodedCredentials = base64.encode(`${login}:${token}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response:', response);

    // Проверяем наличие тела ответа
    const text = await response.text();
    if (!text) {
      return { status: response.status, data: [] };
    }

    // Парсим тело ответа как JSON
    const data = JSON.parse(text);
    return { status: response.status, data: data };
  } catch (error) {
    console.error('Ошибка запроса:', error);
    throw error;
  }
}

export async function aboutAcc(login, token) {
  const url = 'https://ипп.орлан-прогрессив.рф/аккаунт/';
  
  try {
    const encodedCredentials = base64.encode(`${login}:${token}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response:', response);

    // Проверяем наличие тела ответа
    const text = await response.text();
    if (!text) {
      return { status: response.status, data: [] };
    }

    // Парсим тело ответа как JSON
    const data = JSON.parse(text);
    return { status: response.status, data: data };
  } catch (error) {
    console.error('Ошибка запроса:', error);
    throw error;
  }
}

export async function rematchTokens(login, token) {
  const url = 'https://ипп.орлан-прогрессив.рф/аккаунт/сессия/';

  try {
    const encodedCredentials = base64.encode(`${login}:${token}`);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    });

    const text = await response.text();
    if (!text) {
      return { status: response.status, data: {} };
    }

    const data = JSON.parse(text);
    return { status: response.status, data: data };
  } catch (error) {
    console.error('Ошибка запроса на обновление токена:', error);
    throw error;
  }
}


export async function loginInAccount(login, password) {
  const url = 'https://ипп.орлан-прогрессив.рф/аккаунт/сессия/';

  try {
    const encodedCredentials = base64.encode(`${login}:${password}`);
    console.log(encodedCredentials);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const text = await response.text();
    if (!text) {
      return { status: response.status, data: {} };
    }

    const data = JSON.parse(text);
    return { status: response.status, data: data };
  } catch (error) {
    console.error('Ошибка запроса на вход:', error);
    throw error;
  }
}



export async function createAccount(login, password) {
    const url = 'https://ипп.орлан-прогрессив.рф/аккаунт/';
  
    // Формируем тело запроса
    const body = `логин=${encodeURIComponent(login)}&пароль=${encodeURIComponent(password)}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body
      });
  
      if (!response.ok) {
        return { status: response.status, data: await response.text() };
      }
  
      const data = await response.text(); // Ожидаем строку с кодом подтверждения
      return { status: response.status, code: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
}

export async function confirmAccount(login, password, name, code) {
    const url = 'https://ипп.орлан-прогрессив.рф/аккаунт/';
  
    // Формируем тело запроса
    const body = `имя=${encodeURIComponent(name)}&код=${encodeURIComponent(code)}`;
  
    try {
      const encodedCredentials = base64.encode(`${login}:${password}`);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body
      });
  
      if (!response.ok) {
        return { status: response.status, data: await response.text() };
      }
  
      const data = await response.json(); // Ожидаем JSON с токенами
      return { status: response.status, tokens: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
}

export async function createSession(login, password) {
    const url = 'https://ипп.орлан-прогрессив.рф/аккаунт/сессия/';
  
    try {
      const encodedCredentials = base64.encode(`${login}:${password}`);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: ''
      });
  
      if (!response.ok) {
        return { status: response.status, data: await response.text() };
      }
  
      const data = await response.json(); // Ожидаем JSON с токенами или другой информацией
      return { status: response.status, tokens: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
}

export async function leaveAccount(login, token) {
  const url = 'https://ипп.орлан-прогрессив.рф/аккаунт/сессия/';

  try {
    const encodedCredentials = base64.encode(`${login}:${token}`);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      return { status: response.status, data: await response.text() };
    }

    const responseBody = await response.text();
    const data = responseBody ? JSON.parse(responseBody) : {};

    return { status: response.status, data: data };
  } catch (error) {
    console.error('Ошибка запроса:', error);
    throw error;
  }
}

export async function getNotifications(login, token) {
  const url = 'https://ипп.орлан-прогрессив.рф/аккаунт/уведомления/';
  
  try {
    const encodedCredentials = base64.encode(`${login}:${token}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response:', response);

    // Проверяем наличие тела ответа
    const text = await response.text();
    if (!text) {
      return { status: response.status, data: [] };
    }

    // Парсим тело ответа как JSON
    const data = JSON.parse(text);
    return { status: response.status, data: data };
  } catch (error) {
    console.error('Ошибка запроса:', error);
    throw error;
  }
}

export async function deleteNotification(login, token, id) {
  const url = `https://ипп.орлан-прогрессив.рф/аккаунт/уведомления/?уведомление=${id}`;
  
  try {
    const encodedCredentials = base64.encode(`${login}:${token}`);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response:', response);

    // Проверяем наличие тела ответа
    const text = await response.text();
    if (!text) {
      return { status: response.status, data: [] };
    }

    // Парсим тело ответа как JSON
    const data = JSON.parse(text);
    return { status: response.status, data: data };
  } catch (error) {
    console.error('Ошибка запроса:', error);
    throw error;
  }
}



