// fetch('js/productos.json')
// .then(response => response.json())
// .then(data => cargarProductos(data))
// .catch(error => console.log(error));
const productos = [
    { id: 1, title: "Producto 1", price: 0, img: "https://images.thalia.media/-/BF2000-2000/083e7d2e81b0453a87e87f51d37d8ead/harry-potter-y-la-piedra-filosofal-epub-j-k-rowling.jpeg.jpg", categoria: "Electrónica" },
    { id: 2, title: "Producto 2", price: 0, img: "https://www.getnoticedbranding.co.uk/uploads/3/6/4/1/3641668/img-logo_orig.jpg", categoria: "Moda" },
    { id: 3, title: "Producto 3", price: 0, img: "https://www.getnoticedbranding.co.uk/uploads/3/6/4/1/3641668/img-logo_orig.jpg", categoria: "Hogar" },
    { id: 4, title: "Producto 4", price: 0, img: "https://world-schools.com/es/wp-content/uploads/sites/11/2023/05/IMG-Academy-cover-WS.webp", categoria: "Electrónica" },
    { id: 5, title: "Producto 5", price: 0, img: "https://world-schools.com/es/wp-content/uploads/sites/11/2023/05/IMG-Academy-cover-WS.webp", categoria: "Moda" },
    { id: 6, title: "Producto 6", price: 0, img: "https://mywowo.net/media/images/cache/dubai_img_worlds_of_adventure_01_presentazione_jpg_1200_630_cover_85.jpg", categoria: "Hogar" },
    { id: 7, title: "Producto 7", price: 0, img: "https://www.imgcorporations.com/images/bg-img.jpg", categoria: "Electrónica" },
    { id: 8, title: "Producto 8", price: 0, img: "https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/d2/d9/1e/d2d91ece-d9a9-0453-d809-82508f4c641d/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png", categoria: "Moda" },
    { id: 9, title: "Producto 9", price: 0, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/MLS_crest_logo_RGB_gradient.svg/800px-MLS_crest_logo_RGB_gradient.svg.png", categoria: "Hogar" },
    { id: 10, title: "Producto 10", price: 0, img: "https://world-schools.com/es/wp-content/uploads/sites/11/2023/05/IMG-Academy-cover-WS.webp", categoria: "Electrónica" }
];

const shopItemlist = document.getElementById("shopItems");
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function mostrarProductos() {
    const tdsproductoslist = document.getElementById('productlist');
    if (tdsproductoslist) {
        tdsproductoslist.innerHTML = productos.map((product) => `
            <div class="product">
                <img src="${product.img}" alt="${product.title}" class="product-img">
                <div class="product-info">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">${product.price}</p>
                    <a class="btn btn-primary card-btn-shop" data-id="${product.id}">Add to cart</a>
                </div>
            </div>
        `).join("");

        const addToCartbtns = document.getElementsByClassName('card-btn-shop');
        for (let i = 0; i < addToCartbtns.length; i++) {
            const addToCartbtn = addToCartbtns[i];
            addToCartbtn.addEventListener('click', addToCart);
        }
    }
}

function addToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const product = productos.find((product) => product.id === productId);
    if (product) {
        const existingItem = cart.find((item) => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                img: product.img,
                quantity: 1
            };
            cart.push(cartItem);
        }
        console.log(`Producto "${product.title}" añadido al carrito`);
        comprasProductos(); // Actualiza solo el carrito
        saveStorage();
    }
}

function saveStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function comprasProductos() {
    if (shopItemlist) {
        shopItemlist.innerHTML = cart.map((item) => `
            <div class="shop-box">
                <img class="shop-img" src="${item.img}" alt="${item.title}">
                <div class="detail-box">
                    <div class="shop-product">${item.title}</div>
                    <div class="shop-price">${item.price}</div>
                    Cantidad
                    <input type="number" value="${item.quantity}" placeholder="1" class="cart-quantity" data-id="${item.id}">
                </div>
                <i class="fa-solid fa-trash cart-remove" data-id="${item.id}"></i>
            </div>
        `).join("");
    }
}

if (window.location.pathname.includes("compras.html")) {
    comprasProductos();
} else {
    mostrarProductos();
}
