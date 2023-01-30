const getProducts = async () => {
  const local = JSON.parse(localStorage.getItem('products'));
  if (local) {
    return local;
  }

  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  localStorage.setItem('products', JSON.stringify(data));
  return data;
};
