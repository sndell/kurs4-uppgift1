let products;

addEventListener('load', async () => {
  products = await getProducts();
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart) updateCartText(cart.length);
});

const updateCart = (id, amount) => {
  let newItems;
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  if (cartItems && cartItems.length > 0) {
    const current = cartItems.find((item) => item.id === id);
    if (current) {
      current.amount = amount;
      newItems = cartItems;
    } else {
      const newItem = products.find((item) => item.id === id);
      newItem.amount = amount;
      newItems = [...cartItems, newItem];
    }
  } else {
    const newItem = products.find((item) => item.id === id);
    newItem.amount = amount;
    newItems = [newItem];
  }
  console.log(amount);
  if (!amount > 0) removeFromCart(id);
  else localStorage.setItem('cart', JSON.stringify(newItems));
};

const removeFromCart = (id) => {
  let newItems;
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  if (cartItems) newItems = cartItems.filter((item) => item.id !== id);
  else newItems = [];
  localStorage.setItem('cart', JSON.stringify(newItems));
};

const clearCart = () => {
  localStorage.setItem('cart', JSON.stringify([]));
};

const updateCartText = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  let amount = 0;
  if (cart) cart.forEach((item) => (amount += Number(item.amount)));
  const amountSpan = document.querySelector('.header-cart__amount');
  if (amount <= 0) amountSpan.classList.add('hidden');
  else {
    amountSpan.classList.remove('hidden');
    amountSpan.innerHTML = amount;
  }
};
