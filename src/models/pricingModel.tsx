const pricingModel = {
  getPricing: async function getPricing() {
    const response = await fetch('http://localhost:4000/pricing');

    const user = await response.json();

    return user.data;
  },
  updatePricing: async function updatePricing(id: string, priceModel: any) {
    fetch(`http://localhost:4000/pricing/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(priceModel),
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

export default pricingModel;
