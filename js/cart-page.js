addEventListener('load', () => {
  generateProducts();
  updateCartText();
  generateTotal();
});

const generateProducts = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart) {
    const div = document.querySelector('.products');
    div.innerHTML = '';
    cart.forEach((product) => {
      const newProduct = document.createElement('div');
      newProduct.innerHTML = `
    <div class="product">
      <img
        src=${product.image}
        alt="img"
        class="product-image"
      />
      <div class="product-container">
        <div class="product-title">${product.title}</div>
        <div class="product-price">$${product.price}</div>
      </div>
      <div class="product-add">
        <button class="product__plus" onclick="handlePlus(${product.id})">
          <i class="fa-solid fa-plus"></i>
        </button>
        <input
          type="text"
          class="product__amount"
          id="${product.id}"
          oninput="handleInput(this)"
          value="${product.amount}"
          ?
          cartProduct.amount
          :
          0}
        />
        <button class="product__minus" onclick="handleMinus(${product.id})">
        <i class="fa-solid fa-minus"></i>
        </button>
      </div>
      <div>$${product.amount * product.price}</div>
    </div>
    `;

      div.appendChild(newProduct);
    });
  }
};

const handleClear = () => {
  clearCart();
  updateCartText();
  generateProducts();
  generateTotal();
};

const handlePlus = (id) => {
  const input = document.getElementById(id);
  input.value++;
  updateCart(Number(id), input.value);
  updateCartText();
  generateProducts();
  generateTotal();
};

const handleMinus = (id) => {
  const input = document.getElementById(id);
  console.log(Number(input.value));
  if (Number(input.value) > 1) {
    input.value--;
    updateCart(Number(id), input.value);
  } else updateCart(Number(id), 0);
  updateCartText();
  generateProducts();
  generateTotal();
};

const handleInput = (e) => {
  if (!Number(e.value) <= 0) updateCart(Number(e.id), e.value);
  else updateCart(Number(e.id), 0);
  updateCartText();
  generateProducts();
  generateTotal();
};

const generateTotal = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart) {
    const totalDiv = document.querySelector('.main-header__total');
    console.log(totalDiv);
    let total = 0;
    cart.forEach((item) => (total += Number(item.price) * Number(item.amount)));
    totalDiv.innerHTML = `Total: $${total}`;
  }
};
