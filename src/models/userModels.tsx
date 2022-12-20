const userModels = {
  getUsers: async function getUsers() {
    const response = await fetch('http://localhost:4000/user');

    const user = await response.json();

    return user.data;
  },
  getSingleUser: async function getSingleUser(id: string) {
    const response = await fetch(`http://localhost:4000/user/${id}`);

    const user = await response.json();

    return user.data;
  },
  deleteUser: async function deleteUser(id: any) {
    fetch(`http://localhost:4000/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();
      })
      .catch((err) => {
        return err;
      });
    return 'success';
  },
};

export default userModels;
