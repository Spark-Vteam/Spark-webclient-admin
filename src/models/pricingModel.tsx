const pricingModel = {
  getPricing: async function getPricing() {
    const response = await fetch('http://localhost:4000/v1/pricing', {
      headers: {
        'key': '18c364b7-641e-440e-849a-20a3c67036a1'
      }
    });

    const user = await response.json();

    return user.data;
  },
  updatePricing: async function updatePricing(id: string, priceModel: any) {
    const update = {
      description: priceModel.description,
      discountEndCharging: parseInt(priceModel.discountEndCharging),
      discountEndParkingZone: parseInt(priceModel.discountEndParkingZone),
      discountStartFree: parseInt(priceModel.discountStartFree),
      minute: parseInt(priceModel.minute),
      parking: parseInt(priceModel.parking),
      start: parseInt(priceModel.start),
      type: priceModel.type,
    };
    fetch(`http://localhost:4000/v1/pricing/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'key': '18c364b7-641e-440e-849a-20a3c67036a1'
      },
      body: JSON.stringify(update),
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
