const userModels = {
  getUsers: async function getUsers() {
    const response = await fetch('http://localhost:4000/user');

    const user = await response.json();

    return user[0];
  },
};

export default userModels;
