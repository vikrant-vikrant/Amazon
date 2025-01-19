import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProducts } from "./products.js";
//callbacks
// loadProducts(() => {
//   renderOrderSummary();
// });

new Promise((resolve, reject) => {
  try {
    loadProducts(() => {
      resolve();
    });
  } catch (error) {
    reject("Failed to load products.");
  }
})
  .then(() => {
    renderOrderSummary();
  })
  .catch((error) => {
    console.log(error);
  });

// initializeCart();
// async function initializeCart() {
//   try {
//     await new Promise((resolve, reject) => {
//       loadProducts(() => {
//         resolve();
//       });
//     });
//     renderOrderSummary();
//   } catch (error) {
//     alert(error);
//   }
// }
