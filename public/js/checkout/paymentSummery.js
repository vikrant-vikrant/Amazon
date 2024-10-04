import {cart} from '/js/cart.js';
import {getProduct } from "/js/products.js";
import {getDeliveryOption } from '/js/deliveryOptions.js';
//use formatCurrency in orderSummary bcz its also there we dont need to import it again here
import {formatCurrency} from '/js/money.js'

export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    productPriceCents += product.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.priceCents * cartItem.quantity;
  });
  const shippingPrice = formatCurrency(shippingPriceCents);
  const totalPayment = formatCurrency(productPriceCents + shippingPriceCents);
  return {productPriceCents,shippingPrice,totalPayment};
}