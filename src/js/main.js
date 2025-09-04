'use strict';
console.log('>> Ready? Yes, Ready :)');

let products = [];
let cart = [];

const getApiData = () => {
    fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        products = data;
        renderProductsList();
    })
};

document.querySelector(".products").classList.add("js-products");
const productsElement = document.querySelector('.js-products');

document.querySelector(".shopping_bag").classList.add("js-shopping_bag");
const shoppingBag = document.querySelector("js-shopping_bag");


const renderProducts = product => {
    let htmlCode = '';
    htmlCode += `<article class="card">`;
    htmlCode += `<img src="${product.image}" class="card_img" alt="Producto: ${product.title}">`;
    htmlCode += `<h3 class="card__title">${product.title}</h3>`;
    htmlCode += `<p class="card__description">${product.description}</p>`;
    htmlCode += `<p class="card__price">${product.price}</p>`;
    htmlCode += `<button class="js-add-products" data-id="${product.id}">Comprar</button>`;
    htmlCode += `</article>`;
    return htmlCode;
};

const renderProductsList = () => {
    let productsCode = '';
    for (const product of products) {
        productsCode += renderProducts(product);
    }
    productsElement.innerHTML = productsCode;

    listenAddProductsButtons();
};
getApiData();

const searchButton = document.querySelector(".js_button-search");
const input = document.querySelector(".js_in_search");

const handleClickSearchButton = (event) => {
  event.preventDefault();
  const inputValue = input.value.toLowerCase();
  const searchResults = products.filter (p => 
    p.title.toLowerCase().includes(inputValue) ||
    p.description.toLowerCase().includes(inputValue)
  );
  productsElement.innerHTML = "";
  for (const p of searchResults) {
    productsElement.innerHTML += renderProducts(p);
  }
};
searchButton.addEventListener("click", handleClickSearchButton);

const listenAddProductsButtons = () => {
    const productsButtons = document.querySelectorAll('.js-add-products');
    for (const productsButton of productsButtons) {
        productsButton.addEventListener('click', addProduct);
    }
}

const getShoppingBagHtmlCode = item => {
    let htmlCode = '';
    htmlCode += `<article class="card">`;
    htmlCode += `<img src="${product.image}" class="card_img" alt="Producto: ${product.title}">`;
    htmlCode += `<h3 class="card__title">${product.title}</h3>`;
    htmlCode += `<p class="card__description">${product.description}</p>`;
    htmlCode += `<p class="card__price">${product.price}</p>`;
    htmlCode += `<button class="js-add-products" data-id="${product.id}">Comprar</button>`;
    htmlCode += `</article>`;
    return htmlCode;
}

const addProduct = (event) => {
    console.log("han clicado en un producto", event.target.dataset.id);
    const clickedId = event.target.dataset.id;
    const foundProduct = products.find((item) => item.id === clickedId);
    console.log(foundProduct);
    cart.push({
        img: foundProduct.image,
        title: foundProduct.title,
        description: foundProduct.description,
        price: foundProduct.price,
    })
    paintCartItems();
}

const paintCartItems = () => {
    cartElements.innerHTML = '';
    for (const item of cart) {
        cartElement.innerHTML += getCartItemHtmlCode(item);
    }
    cartElement.innerHTML += getCartTotalHtmlCode();
}

productsElement.addEventListener("click", (event) => {
    if (event.target.classList.contains ("js-add-products")) {

        event.target.classList.toggle("_delete");
        
        if (event.target.classList.contains("_delete")) {
            event.target.textContent = "Eliminar"
        } else {
            event.target.textContent = "Comprar";
    }
  }
});


//    "id": 1,
//    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//    "price": 109.95,
//    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//    "category": "men's clothing",
//    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
//    "rating": {
//    "rate": 3.9,
//    "count": 120