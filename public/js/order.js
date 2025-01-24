export const order = JSON.parse(localStorage.getItem("orders")) || [];
export function addOrder(order) {
  // order.unshift(order);
  saveToStroage();
}

function saveToStroage() {
  localStorage.setItem("orders", JSON.stringify(order));
}