const pricingModel = {
  getPricing: async function getPricing() {
    const response = await fetch('http://localhost:4000/pricing');

    const user = await response.json();

    return user.data;
  },
};

export default pricingModel;
