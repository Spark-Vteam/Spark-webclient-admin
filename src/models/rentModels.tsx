const key = process.env.REACT_APP_API_KEY as string;

const rentsByUserModels = {
  getRents: async function getRents() {
    const response = await fetch('http://localhost:4000/v1/rent', {
      headers: {
        key: key,
      },
    });

    const user = await response.json();

    return user.data;
  },
};

export default rentsByUserModels;
