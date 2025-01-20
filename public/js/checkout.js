import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProductsFetch } from "./products.js";
async function initializeCart() {
  try {
    await new Promise((resolve, reject) => {
      loadProductsFetch();
      resolve();
    });
    renderOrderSummary();
  } catch (error) {
    alert(error);
  }
}
initializeCart();