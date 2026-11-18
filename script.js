const WHATSAPP_NUMBER = "923368180411"; //

const products = [
    {
        name: "Berry Bliss",
        category: "Women",
        price: 1800,
        image: "images/berry-bliss.png",
        inspired: "Inspired by Burberry Her"
    },
    {
        name: "Fresh Bloom",
        category: "Women",
        price: 1800,
        image: "images/fresh-bloom.png",
        inspired: "Inspired by Tommy Girl"
    },
    {
        name: "Velvet Charm",
        category: "Unisex",
        price: 1800,
        image: "images/velvet-charm.png",
        inspired: "Inspired by V.B.C."
    },
    {
        name: "Classic Muse",
        category: "Women",
        price: 1800,
        image: "images/classic-muse.png",
        inspired: "Inspired by Chanel No.5"
    },
    {
        name: "Celestial Imperium",
        category: "Unisex",
        price: 1800,
        image: "images/celestial-imperium.png",
        inspired: "Inspired by luxury fragrances"
    },
    {
        name: "Velvet Breeze",
        category: "Unisex",
        price: 1800,
        image: "images/velvet-breeze.png",
        inspired: "Inspired by luxury fragrances"
    },
    {
        name: "Golden Rush",
        category: "Men",
        price: 1800,
        image: "images/golden-rush.png",
        inspired: "Inspired by Azzaro Wanted"
    },
    {
        name: "Golden Attar",
        category: "Unisex",
        price: 1800,
        image: "images/golden-attar.png",
        inspired: "Inspired by Janan Gold"
    },
    {
        name: "Pink Rush",
        category: "Women",
        price: 1800,
        image: "images/pink-rush.png",
        inspired: "Inspired by Bombshell"
    },
    {
        name: "Morning Veil",
        category: "Women",
        price: 1800,
        image: "images/morning-veil.png",
        inspired: "Inspired by Al Saba"
    },
    {
        name: "Eros Flame",
        category: "Men",
        price: 1800,
        image: "images/eros-flame.png",
        inspired: "Inspired by Versace Eros"
    },
    {
        name: "Aqua Minimal",
        category: "Men",
        price: 1800,
        image: "images/aqua-minimal.png",
        inspired: "Inspired by Issey Miyake"
    },
    {
        name: "Crimson Desire",
        category: "Men",
        price: 1800,
        image: "images/crimson-desire.png",
        inspired: "Inspired by Dunhill Desire"
    },
    {
        name: "Savage Noir",
        category: "Men",
        price: 1800,
        image: "images/savage-noir.png",
        inspired: "Inspired by Sauvage"
    },
    {
        name: "Executive Code",
        category: "Men",
        price: 1800,
        image: "images/executive-code.png",
        inspired: "Inspired by Office for Men"
    }
];

let cart = [];

function displayProducts(category = "All") {
    const container = document.getElementById("products");
    if (!container) return;

    const filtered = category === "All"
        ? products
        : products.filter(p => p.category === category);

    container.innerHTML = filtered.map(product => {
        const index = products.indexOf(product);
        return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='images/elixire-logo.png'">
                    <div class="overlay">
                        <button class="add-button" onclick="addToCart(${index})">ADD TO BAG</button>
                    </div>
                </div>
                <h3>${product.name}</h3>
                <p class="category">${product.category}</p>
                <p class="inspired">${product.inspired}</p>
                <p class="price">Rs. ${product.price.toLocaleString("en-PK")}</p>
            </div>
        `;
    }).join("");
}

function filterProducts(category, button) {
    document.querySelectorAll(".filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    displayProducts(category);
}

function addToCart(index) {
    const product = products[index];
    const existing = cart.find(item => item.name === product.name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.getElementById("cart-count").textContent = count;
    document.getElementById("cart-total").textContent = "Rs. " + total.toLocaleString("en-PK");

    const container = document.getElementById("cart-items");

    if (cart.length === 0) {
        container.innerHTML = `<p style="color:#888; padding:30px 0; text-align:center;">Your shopping bag is empty.</p>`;
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <p>Rs. ${item.price.toLocaleString("en-PK")}</p>
                <p>Qty: ${item.quantity}</p>
            </div>
            <div class="controls">
                <button onclick="changeQuantity(${index}, -1)">−</button>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        </div>
    `).join("");
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById("cart-overlay").classList.toggle("show");
}

function closeCart(event) {
    if (event.target.id === "cart-overlay") {
        toggleCart();
    }
}

function toggleMobileMenu() {
    document.querySelector(".nav-links").classList.toggle("show");
}

function contactWhatsApp() {
    const message = "Hello Elixiré! I would like to know more about your perfumes.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your shopping bag is empty!");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let message = "Hello Elixiré! I would like to place an order:\n\n";

    cart.forEach(item => {
        message += `• ${item.name} × ${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString("en-PK")}\n`;
    });

    message += `\nTotal: Rs. ${total.toLocaleString("en-PK")}`;
    message += "\n\nPlease confirm my order. Thank you!";

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
}

// Initialize
displayProducts();
if (document.getElementById("cart-count") && document.getElementById("cart-total")) {
    updateCart();
}