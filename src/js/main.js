'use strict';
console.log('>> Ready? Yes, Ready :)');

//Arrays que se van a llenar con producto
let products = [];
let cart = [];

//Llamar al servidor para que traiga productos
const getApiData = () => {
    fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        products = data;
        renderProductsList();
    })
};

//Selectores de Div productos y Div carrito
document.querySelector(".products_list").classList.add("js-products");
const productsElement = document.querySelector('.js-products');

document.querySelector(".shopping_bag_list").classList.add("js-shopping_bag");
const shoppingBag = document.querySelector(".js-shopping_bag");

//Bucle para mostrar todos los productos
const renderProducts = product => {
    let htmlCode = '';
    htmlCode += `<div class="card">`;
    htmlCode += `<img src="${product.image}" class="card_img" alt="Producto: ${product.title}">`;
    htmlCode += `<h3 class="card__title">${product.title}</h3>`;
    htmlCode += `<p class="card__description">${product.description}</p>`;
    htmlCode += `<p class="card__price">${product.price}</p>`;
    htmlCode += `<button class="js-add-products" data-id="${product.id}">Comprar</button>`;
    htmlCode += `</div>`;
    return htmlCode;
};

//Función para pintar productos
const renderProductsList = () => {
    let productsCode = '';
    for (const product of products) {
        productsCode += renderProducts(product);
    }
    productsElement.innerHTML = productsCode;

    listenAddProductsButtons();
};
getApiData();

//Selector botón del buscador e input del buscador
const searchButton = document.querySelector(".js_button-search");
const input = document.querySelector(".js_in_search");

//Función manejadora del buscador
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

//Función manejadora del click del botón comprar
const listenAddProductsButtons = () => {
    const productsButtons = document.querySelectorAll('.js-add-products');
    for (const productsButton of productsButtons) {
        productsButton.addEventListener('click', addProduct);
    }
}

//Bucle para mostrar los productos que se han comprado
const getShoppingBagHtmlCode = item => {
    let htmlCode = '';
    htmlCode += `<div class="card_shoppingBag" data-id="${item.id}">`;
    htmlCode += `<img src="${item.image}" class="card_img_shoppingBag" alt="Producto: ${item.title}">`;
    htmlCode += `<h3 class="card__title_shoppingBag">${item.title}</h3>`;
    htmlCode += `<p class="card__description_shoppingBag">${item.description}</p>`;
    htmlCode += `<p class="card__price_shoppingBag">${item.price}</p>`;
    htmlCode += `<button class="delete_product_shoppingBag">X</button>`;
    htmlCode += `</div>`;
    return htmlCode;
}

//Detecta el producto clicado y lo pinta
const addProduct = (event) => {
    const clickedId = parseInt(event.target.dataset.id);
    const foundProduct = products.find((item) => item.id === clickedId);
    const productIndex = cart.findIndex((item) => item.id === clickedId);
    if (productIndex === -1) {
    cart.push({
        id: foundProduct.id,
        image: foundProduct.image,
        title: foundProduct.title,
        description: foundProduct.description,
        price: foundProduct.price,
    })
    } else {
    cart.splice(productIndex);
    }
    paintCartItems();
}

const paintCartItems = () => {
    shoppingBag.innerHTML = '';    
    for (const item of cart) {
        shoppingBag.innerHTML += getShoppingBagHtmlCode(item);
    }
    if (cart.length > 0) {
    shoppingBag.innerHTML += `<button class="delete_allProducts_shoppingBag">Limpiar el carrito</button>`;
    }
};

//Cambia la clase y texto del producto clicado
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

//Botón para eliminar producto desde el carrito de la compra
shoppingBag.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete_product_shoppingBag")) {
    const clickedCard = event.target.closest(".card_shoppingBag");
    const clickedId = parseInt(clickedCard.dataset.id);
    cart = cart.filter(item => item.id !== clickedId);
    paintCartItems(); 
    renderProductsList();
    } else if (event.target.classList.contains("delete_allProducts_shoppingBag")) {
    cart = [];
    paintCartItems(); 
    renderProductsList();
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