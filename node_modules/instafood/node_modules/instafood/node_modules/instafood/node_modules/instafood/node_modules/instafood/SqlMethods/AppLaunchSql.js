import base64 from 'react-native-base64';



export async function launchApp(packageName, login, token) {
    const url = `https://ипп.орлан-прогрессив.рф/сессия/`;
  
    // Формируем тело запроса
    const body = `пакет=${encodeURIComponent(packageName)}`;
  
    try {
      const encodedCredentials = base64.encode(`${login}:${token}`);
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body
      });
  
      if (!response.ok) {
        return { status: response.status, data: await response.text() };
      }
  
      // Проверяем, что ответ не пустой, иначе возвращаем пустой объект
      const responseBody = await response.text();
      const data = responseBody ? JSON.parse(responseBody) : {};


  
      return { status: response.status, data: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
  }

  export async function deleteSession(login, token) {
    const url = 'https://ипп.орлан-прогрессив.рф/сессия/';
  
    try {
      const encodedCredentials = base64.encode(`${login}:${token}`);
  
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'Application/x-www-form-urlencoded'
        },
        body: `пакет=${encodeURIComponent(login)}`
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
  