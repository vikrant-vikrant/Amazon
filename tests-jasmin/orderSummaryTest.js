import {renderOrderSummary} from '/checkout/orderSummary.js';

describe('test suite: renderOrdersummary',()=>{
  it('displays the cart',()=>{
    document.querySelector('.js-test-container').innerHTML = '<div class="js-order-summary"></div>';

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
        quantity:1,
        deliveryOptionId:'1',
      }]);
    });
    renderOrderSummary();

  })
})