import ProductManager from "../managers/ProductManager.js";

const socketClient = io();

const manager = new ProductManager();

let newProd = document.getElementById("newProd");
newProd.addEventListener("onClick", listOfProducts());

const showList = (data) => {
  let productsList = document.getElementById("productsList");
  data.foreach((product) => {
    const card = ` <div class="card">
        <h2>${product.title}</h2>
        <img src=${product.thumbnail} class="card-img-top" alt="${product.title}">
        <div>
        <p>${product.description}</p>
        <p>${product.stock}</p>
        <p>${product.category}</p>
        <p>Precio: $ ${product.price}</p>
        </div>
      </div>`;
    productsList.innerHTML = card;
  });
};
const listOfProducts = () => {
  let productsList = manager.getProducts();
  socketClient.emit("productsList", { productsList });
};
socketClient.on("productsList", (productsList) => {
  showList(productsList);
});

const firstData = manager.getProducts();
showList(firstData);
