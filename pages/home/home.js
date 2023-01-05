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
  products.forEach((product) => {
    // console.log(product);
  });
};
