let cart = {
  items: {},
  total: 0
};

function addToCart(productName, productPrice) {
  if (!cart.items[productName]) {
    cart.items[productName] = { quantity: 0, price: productPrice };
  }
  cart.items[productName].quantity++;
  cart.total += productPrice;
  updateCartUI();
}

function removeOne(productName) {
  if (cart.items[productName]) {
    cart.total -= cart.items[productName].price;
    cart.items[productName].quantity--;

    if (cart.items[productName].quantity <= 0) {
      delete cart.items[productName];
    }

    updateCartUI();
  }
}

function removeAll(productName) {
  if (cart.items[productName]) {
    cart.total -= cart.items[productName].price * cart.items[productName].quantity;
    delete cart.items[productName];
    updateCartUI();
  }
}

function updateCartUI() {
  const cartElement = document.querySelector(".floating-cart");
  let itemCount = 0;
  let html = '<span class="cart-icon">🛒</span>';

  for (const [name, data] of Object.entries(cart.items)) {
    itemCount += data.quantity;
    html += `<div style="font-size: 0.9rem;">
      ${name}: ${data.quantity} × $${data.price.toFixed(2)}
      <button onclick="removeOne('${name}')" style="margin-left:4px;">➖</button>
      <button onclick="removeAll('${name}')" style="margin-left:2px;">❌</button>
    </div>`;
  }

  html += `<div style="margin-top: 5px;"><strong>Total: $${cart.total.toFixed(2)}</strong></div>`;

  if (itemCount > 0) {
    html += `<button onclick="preparePurchase()" style="margin-top: 0.5rem; padding: 0.4rem 0.6rem; background-color: #4CAF50; color: white; border: none; border-radius: 6px; cursor: pointer;">Preparar compra</button>`;
  }

  cartElement.innerHTML = html;
}

function preparePurchase() {
  if (Object.keys(cart.items).length === 0) {
    alert('⚠️ Tu carrito está vacío. Agrega al menos un producto antes de continuar.');
    return;
  }

  localStorage.setItem("cartData", JSON.stringify(cart));
  window.location.href = "checkout.html";
}


