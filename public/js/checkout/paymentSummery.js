// import { cart } from '../cart';
import {cart} from '/js/cart.js';
import {getProduct } from "/js/products.js";


export function renderPaymentSummary(){
  let productPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cart.quantity;

    console.log(product.priceCents);
    // cart product quantity is not working properly 
    // console.log(cart.length);
    // console.log(cart[0].quantity);
    for(let i = 0;i<=cart.length-1;i++){
      console.log(cart[i].quantity)
    }
  });
}