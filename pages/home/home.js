let products;

addEventListener('load', async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  products = data;
});
