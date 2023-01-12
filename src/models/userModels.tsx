const key = process.env.REACT_APP_API_KEY as string;

const userModels = {
  getUsers: async function getUsers() {
    const response = await fetch('http://localhost:4000/v1/user', {
      headers: {
        key: key,
      },
    });

    const user = await response.json();

    return user.data;
  },
  getSingleUser: async function getSingleUser(id: string) {
    const response = await fetch(`http://localhost:4000/v1/user/${id}`, {
      headers: {
        key: key,
      },
    });

    const user = await response.json();

    return user.data;
  },
  deleteUser: async function deleteUser(id: any) {
    fetch(`http://localhost:4000/v1/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        key: key,
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
  updateUser: async function updateUser(id: string, insertedUser: any) {
    fetch(`http://localhost:4000/v1/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        key: key,
      },
      body: JSON.stringify(insertedUser),
    })
      .then((res) => {
        console.log(res);
        res.json();
      })
      .catch((err) => {
        return err;
      });
    return 'success';
  },
};

export default userModels;
