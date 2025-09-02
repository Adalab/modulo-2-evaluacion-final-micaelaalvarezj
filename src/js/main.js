'use strict';
console.log('>> Ready? Yes, Ready :)');

let products = [];

const getApiData = () => {
    fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        products = data;
        renderProductsList();
    })
};

const productsElement = document.querySelector('.js-products');

const renderProducts = product => {
    let htmlCode = '';
    htmlCode += `<article class="card">`;
    htmlCode += `<img src="${product.image}" class="card_img" alt="Producto: ${product.title}">`;
    htmlCode += `<h3 class="card__title">${product.title}</h3>`;
    htmlCode += `<p class="card__description">${product.description}</h3>`;
    htmlCode += `<p class="card__price">${product.price}</h3>`;
    htmlCode += `<button class="card__button">Comprar</button>`;
    htmlCode += `</article>`;
    return htmlCode;
};

const renderProductsList = () => {
    let productsCode = '';
    for (const product of products) {
        productsCode += renderProducts(product);
    }
    productsElement.innerHTML = productsCode;
};
getApiData();

const searchButton = document.querySelector(".js_button-search");
const input = document.querySelector(".js_in_search");

const handleClickSearchButton = (event) => {
  event.preventDefault();
  const inputValue = input.value.toLowerCase();
  console.log("Haz buscado:", inputValue);
}
searchButton.addEventListener("click", handleClickSearchButton);

//    "id": 1,
//    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//    "price": 109.95,
//    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//    "category": "men's clothing",
//    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
//    "rating": {
//    "rate": 3.9,
//    "count": 120