const rentsByUserModels = {
  getRents: async function getRents() {
    // Hard coded 1 to see mockup data
    const response = await fetch('http://localhost:4000/v1/rent');

    const user = await response.json();

    return user.data;
  },
};

export default rentsByUserModels;
