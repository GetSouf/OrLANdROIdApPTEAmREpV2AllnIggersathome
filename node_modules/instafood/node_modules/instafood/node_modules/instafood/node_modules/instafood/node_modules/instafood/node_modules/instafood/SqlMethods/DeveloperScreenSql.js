export async function fetchMainData(разработчик) {
    const url = `https://ипп.орлан-прогрессив.рф/разработчик/?разработчик=${разработчик}`;
  
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

  export async function fetchEmails(разработчик) {
    const url = `https://ипп.орлан-прогрессив.рф/разработчик/почты/?разработчик=${разработчик}`;
  
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

  export async function fetchSites(разработчик) {
    const url = `https://ипп.орлан-прогрессив.рф/разработчик/сайты/?разработчик=${разработчик}`;
  
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

  export async function fetchPhones(разработчик) {
    const url = `https://ипп.орлан-прогрессив.рф/разработчик/телефоны/?разработчик=${разработчик}`;
  
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

  export async function fetchApps(разработчик, сортировка, количество, смещение) {
    const url = `https://ипп.орлан-прогрессив.рф/разработчик/приложения/?разработчик=${разработчик}&сортировка=${сортировка}&количество=${количество}&смещение=${смещение}`;
  
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