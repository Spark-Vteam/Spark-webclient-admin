const stopBike = {
  stopSpecificBike: async function stopSpecificBike(id: string) {
    fetch(`http://localhost:8000/stop/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
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

export default stopBike;
