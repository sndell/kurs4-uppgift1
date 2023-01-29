let products;

addEventListener('load', async () => {
  const local = JSON.parse(localStorage.getItem('products'));
  if (local) {
    generateProducts(local);
    return;
  }

  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  localStorage.setItem('products', JSON.stringify(data));
  generateProducts(data);
});

generateProducts = (products) => {
  const parent = document.querySelector('.products');
  parent.innerHTML = '';
  products.forEach((product) => {
    let newProduct = document.createElement('div');
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
        <button class="product__plus">
          <i class="fa-solid fa-plus"></i>
        </button>
        <input
          type="text"
          class="product__amount"
          oninput="handleInput(this.value)"
        />
        <button class="product__minus">
          <i class="fa-solid fa-minus"></i>
        </button>
      </div>
    </div>
  </div>`;
    console.log(newProduct);
    parent.appendChild(newProduct);
  });
};

const handleInput = (e) => {
  console.log(e);
};
