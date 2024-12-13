const products = [
    { id: 1, name: "Смартфон", category: "electronics", price: 20000 },
    { id: 2, name: "Ноутбук", category: "electronics", price: 50000 },
    { id: 3, name: "Футболка", category: "clothing", price: 1000 },
    { id: 4, name: "Кофеварка", category: "home", price: 3000 },
    { id: 5, name: "Шорты", category: "clothing", price: 1200 },
    { id: 6, name: "Телевизор", category: "electronics", price: 40000 },
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
let cart = [];

// Генерация товаров
function renderProducts(filter = "all") {
    productList.innerHTML = "";
    const filteredProducts = products.filter(product => filter === "all" || product.category === filter);
    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.price} ₽</p>
            <button onclick="addToCart(${product.id})">Добавить в корзину</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Добавление в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    renderCart();
}

// Отображение корзины
function renderCart() {
    cartItems.innerHTML = "";
    const grouped = cart.reduce((acc, item) => {
        acc[item.id] = acc[item.id] || { ...item, count: 0 };
        acc[item.id].count++;
        return acc;
    }, {});
    let total = 0;
    for (let id in grouped) {
        const item = grouped[id];
        total += item.price * item.count;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
            ${item.name} x ${item.count} = ${item.price * item.count} ₽
        `;
        cartItems.appendChild(cartItem);
    }
    cartTotal.textContent = total;
}

// Обработка фильтра
document.getElementById("category").addEventListener("change", function () {
    renderProducts(this.value);
});

// Инициализация
renderProducts();
