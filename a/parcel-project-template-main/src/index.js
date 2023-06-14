import * as basiclightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';
const instruments = [
  {
    id: 1,
    img: 'https://static.dnipro-m.ua/cache/products/4878/catalog_origin_269592.jpg',
    name: 'Шуруповетр',
    price: 1500,
    descriptions: 'first',
  },
  {
    id: 2,
    img: 'https://static.dnipro-m.ua/cache/products/5098/catalog_origin_195568.jpg',
    name: 'Перфоратор',
    price: 3948,
    descriptions: 'second',
  },
  {
    id: 3,
    img: 'https://static.dnipro-m.ua/cache/products/1248/catalog_origin_257336.jpg',
    name: 'Шліфмашина',
    price: 1299,
    descriptions: 'third',
  },
];
const KEY_FAVORIT = 'favorit';
const KEY_BASKET = 'basket';
const search = document.querySelector('.js-search');
const list = document.querySelector('.js-list');
const favoritarr = JSON.parse(localStorage.getItem(KEY_FAVORIT)) ?? [];
const basketarr = JSON.parse(localStorage.getItem(KEY_BASKET)) ?? [];

function createMarckup(arr) {
  const marckup = arr
    .map(
      ({ id, img, name }) =>
        `<li data-id="${id}" class="js-card">
      <img src="${img}" alt="${name}" width="300">
      <h2>${name}</h2>
      <p ><a href="#" class="js-info"> More information</a></p>
      <div>
        <button class="js-favorit">Add favorite</button>
      <button class="js-basket">Add to basket</button>
    </div>
    </li>`
    )
    .join('');
  list.innerHTML = marckup;
}

list.addEventListener('click', onClick);

createMarckup(instruments);

function onClick(e) {
  e.preventDefault();
  if (e.target.classList.contains('js-info')) {
    const product = findProd(e.target);
    const instance = basiclightbox.create(
      `<div>
      <img src="${product.img}" alt="${product.name}" width="300">
      <h2>${product.name}</h2>
      <h3>${product.price}грн</h3>
      <p>${product.descriptions}</p>
      <div>
      <button class="js-favorit">Add favorite</button>
      <button class="js-basket">Add to basket</button>
      </div>
      </div>`
    );
    instance.show();
  }
  if (e.target.classList.contains('js-basket')) {
    const product = findProd(e.target);
    basketarr.push(product);
    localStorage.setItem(KEY_BASKET, JSON.stringify(basketarr));
    const inStorage = basketarr.some(({ id }) => id === product.id);
    if (inStorage) return;
  }
  if (e.target.classList.contains('js-favorit')) {
    const product = findProd(e.target);
    const inStorage = favoritarr.some(({ id }) => id === product.id);
    if (inStorage) return;
    favoritarr.push(product);
    localStorage.setItem(KEY_FAVORIT, JSON.stringify(favoritarr));
  }
}

function findProd(elem) {
  const productId = Number(elem.closest('.js-card').dataset.id);
  return instruments.find(({ id }) => id === productId);
}
