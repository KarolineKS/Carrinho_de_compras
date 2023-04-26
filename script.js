const olCartItems = document.querySelector('.cart__items');
const buttonEmptyCard = document.querySelector('.empty-cart');
const sectionCart = document.querySelector('section.cart');
let storage = [];
let prices = [];

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const appendProduto = async (product) => {
  const resultadoFetch = await fetchProducts(product);
  const produtos = resultadoFetch.results;
  const sectionItens = document.querySelector('.items');
  return produtos.forEach((produto) => {
    const itemElement = { sku: produto.id, name: produto.title, image: produto.thumbnail };
    sectionItens.appendChild(createProductItemElement(itemElement));
  });
};

const chamaPrice = async (itemID) => {
  const resultadoFetch = await fetchItem(itemID);
  return resultadoFetch.price;
};

const alteraValorPrice = () => {
  const price = document.querySelector('.total-price');
  let priceTotal = 0;
  if (prices.length !== 0) {
    priceTotal = prices.reduce((acc, number) => acc + number);
  }
  price.innerText = `${priceTotal}`;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = async (event) => {
  const itemCard = event.target;
  itemCard.remove();
  const idItemCard = itemCard.innerText.substr(5, 13);
  storage = storage.filter((item) => item !== idItemCard);
  saveCartItems(JSON.stringify(storage));
  const price = await chamaPrice(idItemCard);
  prices = prices.filter((preco) => preco !== price);
  await alteraValorPrice();
};

const createCartItemElement = ({ sku, name, salePrice, image }) => {
  const li = document.createElement('li');
  const div = document.createElement('div');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  div.className = 'image__cart__item';
  div.appendChild(createProductImageElement(image));
  li.appendChild(div);
  return li;
};

const appendCartItem = async (itemID) => {
  const retorno = await fetchItem(itemID);
  const { id: sku, title: name, price: salePrice, thumbnail: image } = retorno;
  const objeto = { sku, name, salePrice, image };
  olCartItems.appendChild(createCartItemElement(objeto));
  prices.push(Number(retorno.price));
  await alteraValorPrice();
};

const addEventListenerButton = () => {
  const button = document.querySelectorAll('.item__add');
  button.forEach((botao) => {
    botao.addEventListener('click', (event) => {
      const item = event.target.parentNode;
      const sku = getSkuFromProductItem(item);
      storage.push(sku);
      saveCartItems(JSON.stringify(storage));
      appendCartItem(sku);
    });
  });
};

buttonEmptyCard.addEventListener('click', () => {
  const itens = document.querySelectorAll('.cart__item');
  itens.forEach((item) => item.remove());
  localStorage.clear();
  storage = [];
  prices = [];
  alteraValorPrice();
});

const carregaLocalStorage = () => {
  if (localStorage.length > 0) {
    const local = JSON.parse(localStorage.getItem('cartItems'));
    local.forEach((item) => appendCartItem(item));
  }
};

const criaElementPrice = () => {
  const h1 = document.createElement('h1');
  const span = document.createElement('span');
  span.className = 'total-price';
  h1.className = 'h1-price';
  h1.innerText = 'Preço Total: R$ ';
  span.innerText = '0';

  h1.appendChild(span);
  sectionCart.appendChild(h1);
};

window.onload = async () => {
  await appendProduto('computador');
  await addEventListenerButton();
  await carregaLocalStorage();
  await criaElementPrice();
};