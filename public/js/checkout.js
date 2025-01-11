import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProducts } from "./products.js";
//callbacks
// loadProducts(() => {
//   renderOrderSummary();
// });

//promise
// new Promise((resolve, reject) => {
//   loadProducts(() => {
//     resolve();
//   });
// }).then(() => {
//   renderOrderSummary();
// }).catch((error) => {
//   alert(error);
// });  

Promise.all([
  new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });
}),
new Promise((resolve) => {
  renderOrderSummary();
})
]).then((values) => {
  console.log(values);
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
