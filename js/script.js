// Evento para cargar todos los elementos de shopItems
// fetch('js/productos.json')
// .then(response => response.json())
// .then(data => mostrarProductos(data))
// .catch(error => console.log(error));
const productos = [
    { id: 1, title: "Producto 1", price: 1, img: "https://images.thalia.media/-/BF2000-2000/083e7d2e81b0453a87e87f51d37d8ead/harry-potter-y-la-piedra-filosofal-epub-j-k-rowling.jpeg.jpg", categoria: "Electrónica" },
    { id: 2, title: "Producto 2", price: 2, img: "https://www.getnoticedbranding.co.uk/uploads/3/6/4/1/3641668/img-logo_orig.jpg", categoria: "Moda" },
    { id: 3, title: "Producto 3", price: 3, img: "https://www.getnoticedbranding.co.uk/uploads/3/6/4/1/3641668/img-logo_orig.jpg", categoria: "Hogar" },
    { id: 4, title: "Producto 4", price: 44, img: "https://th.bing.com/th/id/R.c6aaef46bcac9425fcdd7263ddc8cdf0?rik=oM61CMSC9oH2qA&pid=ImgRaw&r=0", categoria: "Electrónica" },
    { id: 5, title: "Producto 5", price: 45, img: "https://world-schools.com/es/wp-content/uploads/sites/11/2023/05/IMG-Academy-cover-WS.webp", categoria: "Moda" },
    { id: 6, title: "Producto 6", price: 5, img: "https://mywowo.net/media/images/cache/dubai_img_worlds_of_adventure_01_presentazione_jpg_1200_630_cover_85.jpg", categoria: "Hogar" },
    { id: 7, title: "Producto 7", price: 6, img: "https://www.imgcorporations.com/images/bg-img.jpg", categoria: "Electrónica" },
    { id: 8, title: "Producto 8", price: 7, img: "https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/d2/d9/1e/d2d91ece-d9a9-0453-d809-82508f4c641d/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png", categoria: "Moda" },
    { id: 9, title: "Producto 9", price: 8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/MLS_crest_logo_RGB_gradient.svg/800px-MLS_crest_logo_RGB_gradient.svg.png", categoria: "Hogar" },
    { id: 10, title: "Producto 10", price: 76, img: "https://world-schools.com/es/wp-content/uploads/sites/11/2023/05/IMG-Academy-cover-WS.webp", categoria: "Electrónica" }
];
// Evento para hacer que todos los elementos al localstroge
const shopItemlist = document.getElementById("shopItems");
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// Evento para cargar todos los elementos en mi main
function mostrarProductos() {
    const tdsproductoslist = document.getElementById('productlist');
    if (tdsproductoslist) {
        tdsproductoslist.innerHTML = productos.map((product) => `
            <div class="product">
                <img src="${product.img}" alt="${product.title}" class="product-img">
                <div class="product-info">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">$${product.price}</p>
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

        event.target.textContent = 'Añadido'; // Muestra el texto al presionar
        console.log(`Producto "${product.title}" añadido al carrito`);
        comprasProductos(); // Actualiza solo el carrito
        saveStorage();
        calcularTotal();
    }
}
function removcart(event) {
    const productId = parseInt(event.target.dataset.id);
    cart = cart.filter((item) => item.id !== productId);
    comprasProductos();
    mostrarProductos();
    saveStorage();
    calcularTotal();
    
    
}
function saveStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function comprasProductos() {
    if (shopItemlist) {
        shopItemlist.innerHTML = '';
        shopItemlist.innerHTML = cart.map((item) => `
            <div class="shop-box">
                <img class="shop-img" src="${item.img}" alt="${item.title}">
                <div class="detail-box">
                    <div class="shop-product">${item.title}</div>
                    <div class="shop-price">$${item.price}</div>
                    Cantidad 
                    <input type="number" value="${item.quantity}" placeholder="1" class="cart-quantity" data-id="${item.id}">
                </div>
                <i class="fa-solid fa-trash cart-remove" data-id="${item.id}"></i>
            </div>
        `).join("");
    }
    // Evento para vaciar uno de los elementos
    const removebtns = document.getElementsByClassName('cart-remove');
    for (let i = 0; i < removebtns.length; i++) {
        const removebtn = removebtns[i];
        removebtn.addEventListener('click',removcart);
    }

}
// Calculate subtotal, ITBMS, and total
function calcularTotal() {
    const subtotal = document.querySelector('#Subtotal');
    const subtotalValue = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    subtotal.textContent = `$${subtotalValue}`;
  
    const itbms = document.querySelector('#ITBMS');
    const itbmsValue = subtotalValue * 0.07; // 7% ITBMS
    itbms.textContent = `$${itbmsValue}`;
  
    const total = document.querySelector('#Total');
    const totalValue = subtotalValue + itbmsValue;
    total.textContent = `$${totalValue}`;
}
calcularTotal();
if (window.location.pathname.includes("compras.html")) {
    comprasProductos();
} else {
    mostrarProductos();
}
