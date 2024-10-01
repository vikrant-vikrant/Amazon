import {cart} from '/js/cart.js';
import {getProduct } from "/js/products.js";
import {getDeliveryOption } from '/js/deliveryOptions.js';

export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    // unable to calculate shipping cost 
    // const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    // shippingPriceCents += deliveryOption.priceCents;
  });
    console.log(productPriceCents);
    // console.log(shippingPriceCents);

}