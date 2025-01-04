import { cart } from "/js/cart-class.js";
import { getProduct } from "/js/products.js";
import { getDeliveryOption } from "/js/deliveryOptions.js";
import { formatCurrency } from "/js/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    productPriceCents += product.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.priceCents * cartItem.quantity;
  });
  const shippingPrice = formatCurrency(shippingPriceCents);
  const totalPayment = formatCurrency(productPriceCents + shippingPriceCents);
  return { productPriceCents, shippingPrice, totalPayment };
}
