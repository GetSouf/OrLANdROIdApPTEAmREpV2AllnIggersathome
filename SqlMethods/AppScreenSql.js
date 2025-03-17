import base64 from 'react-native-base64'


export async function fetchApplication(название_пакета) {
    const url = `https://ипп.орлан-прогрессив.рф/приложение/?пакет=${название_пакета}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json',
          'User-Agent':'OrlanDroid/1.0.0'
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


  export async function fetchReveals(пакет, количество, смещение) {
    const url = `https://ипп.орлан-прогрессив.рф/приложение/отзывы/?пакет=${пакет}&количество=${количество}&смещение=${смещение}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent':'OrlanDroid/0.0.1',
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

  export async function fetchRevealWithoutMe(пакет, login, token, количество, смещение) {
    const url = `https://ипп.орлан-прогрессив.рф/приложение/отзывы/?пакет=${пакет}&количество=${количество}&смещение=${смещение}`;
    console.log("параметры",пакет, login, token, количество, смещение)

    const encodedCredentials = base64.encode(`${login}:${token}`);
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'User-Agent':'OrlanDroid/1.0.0',
          'Content-Type': 'Application/json',
          
        },
      });
  
      console.log("насрал вот этим", response)
      
      let responseBody;
      try {
        // Попытка получить JSON из ответа
        responseBody = await response.json();
      } catch (jsonError) {
        // Если не удалось, получаем текстовый ответ
        responseBody = await response.text();
      }

      if (!response.ok) {
        console.log("Ошибка с телом ответа", responseBody);
        return { status: response.status, data: responseBody };
      }

      return { status: response.status, data: responseBody };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
  }


  export async function fetchMyReveal(пакет, login, token) {
    const url = `https://ипп.орлан-прогрессив.рф/приложение/отзывы/мой/?пакет=${пакет}`;

    const encodedCredentials = base64.encode(`${login}:${token}`);
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'Application/json',
          'User-Agent':'OrlanDroid/1.0.0'
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

 


  export async function publishRevealWithText(packageName, login, token, rating, text) {
    const url = `https://ипп.орлан-прогрессив.рф/приложение/отзывы/мой/?пакет=${encodeURIComponent(packageName)}`;
  
    // Формируем тело запроса
    const body = `рейтинг=${encodeURIComponent(rating)}&текст=${encodeURIComponent(text)}`;
  
    try {
      const encodedCredentials = base64.encode(`${login}:${token}`);
  
      const response = await fetch(url, {
        method: 'POST',
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



  export async function publishRevealWithoutText(packageName, login, token, rating) {
    const url = `https://ипп.орлан-прогрессив.рф/приложение/отзывы/мой/?пакет=${encodeURIComponent(packageName)}`;
  
    // Формируем тело запроса
    const body = `рейтинг=${encodeURIComponent(rating)}`;
  
    try {
      const encodedCredentials = base64.encode(`${login}:${token}`);
  
      const response = await fetch(url, {
        method: 'POST',
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


  export async function rateReveal(номер, login, token, rate) {
    const url = `https://ипп.орлан-прогрессив.рф/приложение/отзывы/?отзыв=${encodeURIComponent(номер)}`;
  
    // Формируем тело запроса
    const body = `оценка=${encodeURIComponent(rate)}`;
  
    try {
      const encodedCredentials = base64.encode(`${login}:${token}`);
  
      const response = await fetch(url, {
        method: 'POST',
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

  export async function changeRateReveal(номер, login, token, rate) {
    const url = `https://ипп.орлан-прогрессив.рф/приложение/отзывы/?отзыв=${encodeURIComponent(номер)}`;
  
    // Формируем тело запроса
    const body = `оценка=${encodeURIComponent(rate)}`;
  
    try {
      const encodedCredentials = base64.encode(`${login}:${token}`);
  
      const response = await fetch(url, {
        method: 'PUT',
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
  
      console.log(response);
      // Проверяем, что ответ не пустой, иначе возвращаем пустой объект
      const responseBody = await response.text();
      const data = responseBody ? JSON.parse(responseBody) : {};
  
      return { status: response.status, data: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
  }

  export async function deleteRate(номер, login, token) {
    const url = `https://ипп.орлан-прогрессив.рф/приложение/отзывы/?отзыв=${номер}`;

    const encodedCredentials = base64.encode(`${login}:${token}`);
  
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'User-Agent':'OrlanDroid/1.0.0'
        },
      });
  
      if (!response.ok) {
        return { status: response.status, data: [] };
      }
  
      console.log(response);
      // Проверяем, что ответ не пустой, иначе возвращаем пустой объект
      const responseBody = await response.text();
      const data = responseBody ? JSON.parse(responseBody) : {};
      return { status: response.status, data: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
  }


  
  export async function deleteReveal(packet, login, token) {
    const url = `https://ипп.орлан-прогрессив.рф/приложение/отзывы/мой/?пакет=${packet}`;

    const encodedCredentials = base64.encode(`${login}:${token}`);
  
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'User-Agent':'OrlanDroid/1.0.0'
        },
      });
  
      if (!response.ok) {
        return { status: response.status, data: [] };
      }
  
      console.log(response);
      // Проверяем, что ответ не пустой, иначе возвращаем пустой объект
      const responseBody = await response.text();
      const data = responseBody ? JSON.parse(responseBody) : {};
      return { status: response.status, data: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
  }


  export async function changeMyRateWithText(login, token, rating,text,packageName) {
    const url = `https://ипп.орлан-прогрессив.рф/приложение/отзывы/мой/?пакет=${packageName}`;
  
    // Формируем тело запроса
    const body = `рейтинг=${encodeURIComponent(rating)}&текст=${encodeURIComponent(text)}`;
  
    try {
      const encodedCredentials = base64.encode(`${login}:${token}`);
  
      const response = await fetch(url, {
        method: 'PUT',
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
  
      console.log(response);
      // Проверяем, что ответ не пустой, иначе возвращаем пустой объект
      const responseBody = await response.text();
      const data = responseBody ? JSON.parse(responseBody) : {};
  
      return { status: response.status, data: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
  }

  export async function changeMyRateWithoutText(login, token, rating,packageName) {
    const url = `https://ипп.орлан-прогрессив.рф/приложение/отзывы/мой/?пакет=${packageName}`;
  
    // Формируем тело запроса
    const body = `рейтинг=${encodeURIComponent(rating)}`;
  
    try {
      const encodedCredentials = base64.encode(`${login}:${token}`);
  
      const response = await fetch(url, {
        method: 'PUT',
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
  
      console.log(response);
      // Проверяем, что ответ не пустой, иначе возвращаем пустой объект
      const responseBody = await response.text();
      const data = responseBody ? JSON.parse(responseBody) : {};
  
      return { status: response.status, data: data };
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw error;
    }
  }



