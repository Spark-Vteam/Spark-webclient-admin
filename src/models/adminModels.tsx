const key = process.env.REACT_APP_API_KEY as string;

const adminModels = {
  login: async function login(username: string, password: string) {
    const adminInfo = {
      emailAdress: username,
      password: password,
    };
    try {
      const response = await fetch('http://localhost:4000/v1/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          key: key,
        },
        body: JSON.stringify(adminInfo),
      });
      const result = await response.json();

      localStorage.setItem('token', result.data.token);
      return result;
    } catch (error: any) {
      alert(error.message);
    }
  },
};

export default adminModels;
