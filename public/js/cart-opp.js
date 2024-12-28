function Cart(localStoragekey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStoragekey));
      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionsId: "1",
          },
          {
            productId: "19c6a64a-5463-4d45-9af8-e41140a4100c",
            quantity: 2,
            deliveryOptionsId: "2",
          },
        ];
      }
    },

    saveToStorage() {
      localStorage.setItem(localStoragekey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      let matchingItem;
      this.cartItems.forEach((CartItem) => {
        if (productId === CartItem.productId) {
          matchingItem = CartItem;
        }
      });
      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = Number(quantitySelector.value);
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          productId,
          quantity,
          deliveryOptionsId: "1",
        });
      }
      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((CartItem) => {
        if (CartItem.productId !== productId) {
          newCart.push(CartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();
    },

    calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((CartItem) => {
        cartQuantity += CartItem.quantity;
      });
      return cartQuantity;
    },

    updateCartQuantity(productId) {
      let addedMessageTimeoutId;
      document.querySelector(".js-cart-quantity").innerHTML =
        calculateCartQuantity();
      const addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );
      addedMessage.classList.add("added-to-cart-visible");
      if (addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }
      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove("added-to-cart-visible");
      }, 1500);
      addedMessageTimeoutId = timeoutId;
    },

    updateQuantity(productId, newQuantity) {
      let matchingItem = undefined;
      this.cartItems.forEach((CartItem) => {
        if (productId === CartItem.productId) {
          matchingItem = CartItem;
        }
      });
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    },
  };
  return cart;
}

const cart = Cart("cart-oop");
const BusinessCart = Cart("cart-business");

cart.loadFromStorage();
BusinessCart.loadFromStorage();

console.log(cart);
console.log(BusinessCart);
