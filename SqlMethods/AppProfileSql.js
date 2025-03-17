import base64 from 'react-native-base64';

export async function editProfileName(login, token, name) {
    const url = `https://ипп.орлан-прогрессив.рф/аккаунт/изменение`;
  
    // Формируем тело запроса
    const body = `имя=${encodeURIComponent(name)}`;
  
    try {
      const encodedCredentials = base64.encode(`${login}:${token}`);
  
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'Application/x-www-form-urlencoded',
          'User-Agent':'OrlanDroid/1.0.0'
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