document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
});

function updateDeliveryOption(productId,deliveryOptionsId){
  let matchingItem;
  cart.forEach((CartItem)=>{
    if(productId === CartItem.productId){
      matchingItem = CartItem;}
  });
  matchingItem.deliveryOptionsId = deliveryOptionsId;
  saveToStorage();
}

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const { productId, deliveryOptionsId} = element.dataset;
    if(!deliveryOptionsId){
      console.error('deliveryOptionId is undefined');
      return;
    }
  updateDeliveryOption(productId,deliveryOptionsId);
  console.log(productId)
  console.log(deliveryOptionsId)
  const deliveryDateElement = document.querySelector(`.js-cart-item-container-${productId} .delivery-date`);
  const newDeliveryDate = getNewDeliveryDate(deliveryOptionsId);
  deliveryDateElement.innerHTML = `Delivery date: ${newDeliveryDate}`;
  })
})


function getNewDeliveryDate(deliveryOptionsId) {
const deliveryOption = getDeliveryOption(deliveryOptionsId);
const deliveryDays = deliveryOption.deliveryDays;
const newDeliveryDate = dayjs().add(deliveryDays, 'days').format('dddd, D MMMM');
return newDeliveryDate;
}