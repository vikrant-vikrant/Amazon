import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProducts } from "./products.js";
// new Promise((resolve, reject) => {
//   try {
//     loadProducts(() => {
//       resolve();
//     });
//   } catch (error) {
//     reject("Failed to load products.");
//   }
// })
//   .then(() => {
//     renderOrderSummary();
//   })
//   .catch((error) => {
//     console.log(error);
//   });

  async function initializeCart() {
      try {
    await new Promise((resolve, reject) => {
      loadProducts(() => {
        resolve();
      });
    });
    renderOrderSummary();
  } catch (error) {
    alert(error);
  }
}
initializeCart();