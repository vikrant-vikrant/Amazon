import {cart} from '/js/cart.js';
import {getProduct } from "/js/products.js";
import {getDeliveryOption } from '/js/deliveryOptions.js';

export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
    console.log(productPriceCents);
    // shippingPriceCents giving us Nan or 0 may be the deliveryoptions are not able to reach to them
    console.log(shippingPriceCents);
}