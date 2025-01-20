import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProductsFetch } from "./products.js";
initializeCheckout();
async function initializeCheckout() {
  try {
    await loadProductsFetch();
    renderOrderSummary();
  } catch (error) {
    alert(error);
  }
}