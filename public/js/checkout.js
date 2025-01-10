import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProducts } from "./products.js";
loadProducts(() => {
  renderOrderSummary();
});
