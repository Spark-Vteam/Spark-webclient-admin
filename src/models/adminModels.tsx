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
          'key': '18c364b7-641e-440e-849a-20a3c67036a1'
        },
        body: JSON.stringify(adminInfo),
      });
      const result = await response.json();

      console.log(result);

      localStorage.setItem('token', result.data.token);
      //   window.location.href = '/protected';
      return result;
    } catch (error: any) {
      alert(error.message);
    }
  },
};

export default adminModels;
