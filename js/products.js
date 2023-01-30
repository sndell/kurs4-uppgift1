addEventListener('load', async () => {
  const products = await getProducts();
  generateCategories(products);
  generateProducts(products);
  updateCartText();
});

const generateCategories = (products) => {
  const div = document.querySelector('.product-header-order');
  const uniqueCategories = [
    ...new Map(products.map((product) => [product.category, product])).values(),
  ].map((product) => product.category);

  div.innerHTML = ``;

  const all = document.createElement('option');
  all.value = 'all';
  all.innerHTML = 'all';
  div.appendChild(all);

  uniqueCategories.forEach((category) => {
    const newCategory = document.createElement('option');
    newCategory.value = category;
    newCategory.innerHTML = category;
    div.appendChild(newCategory);
  });
};

const generateProducts = (products) => {
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  const parent = document.querySelector('.products');
  parent.innerHTML = '';
  products.forEach((product) => {
    let newProduct = document.createElement('div');
    let cartProduct;
    if (cartItems)
      cartProduct = cartItems.find((item) => item.id === product.id);

    newProduct.innerHTML = `
    <div class="product">
    <div class="product-img-container">
      <img
        src="${product.image}"y
        alt="product"
        class="product__image"
      />
    </div>
    <h4 class="product__title">${product.title}</h4>
    <p class="product__description">${product.description}</p>
    <div class="product-stars">
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star-half-stroke"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
    </div>
    <div class="product-details">
      <div class="product__price">$${product.price}</div>
      <!-- <div class="product-add">
        <button class="product__buy">Lägg i kundvagn</button>
      </div> -->
      <div class="product-add">
        <button class="product__plus" onclick="handlePlus(${product.id})">
          <i class="fa-solid fa-plus"></i>
        </button>
        <input
          type="text"
          class="product__amount"
          id="${product.id}"
          oninput="handleInput(this)"
          value=${cartProduct ? cartProduct.amount : 0}
        />
        <button class="product__minus" onclick="handleMinus(${product.id})" >
          <i class="fa-solid fa-minus"></i>
        </button>
      </div>
    </div>
  </div>`;
    parent.appendChild(newProduct);
  });

  document.querySelector(
    '#products-header__result-amount'
  ).innerHTML = `Visar ${products.length} av 20 resultat`;
};

const handlePlus = (id) => {
  const input = document.getElementById(id);
  input.value++;
  updateCart(Number(id), input.value);
  updateCartText();
};

const handleMinus = (id) => {
  const input = document.getElementById(id);
  if (!Number(input.value) <= 0) {
    input.value--;
    updateCart(Number(id), input.value);
    updateCartText();
  }
};

const handleInput = (e) => {
  if (!Number(e.value) <= 0) {
    updateCart(Number(e.id), e.value);
    updateCartText();
  } else {
    updateCart(Number(e.id), 0);
    updateCartText();
  }
};

const handleCategory = async (e) => {
  const products = await getProducts();
  console.log(e.value);

  if (e.value === 'all') generateProducts(products);
  else
    generateProducts(
      products.filter((product) => product.category === e.value)
    );
};
