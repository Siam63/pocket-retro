// ============================================
// Pocket Retro
// Product catalogue + storefront functionality
// ============================================


// ============================================
// PRODUCT DATA
// ============================================

const products = [
    {
        id: "r36s-purple",
        name: "R36S Transparent Purple",
        category: "Console",
        price: 50,
        storage: "64GB",
        color: "Purple",
        image: "images/r36s-transparent-purple.png",
        badge: "In Stock",
        description: "R36S retro gaming handheld in purple."
    },

    {
        id: "r36s-green",
        name: "R36S Transparent Green",
        category: "Console",
        price: 50,
        storage: "64GB",
        color: "Green",
        image: "images/r36s-transparent-green.png",
        badge: "In Stock",
        description: "R36S retro gaming handheld in green."
    },

    {
        id: "r36s-blue",
        name: "R36S Transparent Blue",
        category: "Console",
        price: 50,
        storage: "64GB",
        color: "Blue",
        image: "images/r36s-transparent-blue.png",
        badge: "In Stock",
        description: "R36S retro gaming handheld in blue."
    },

    {
        id: "r36s-transparent-red",
        name: "R36S Transparent Red",
        category: "Console",
        price: 55,
        storage: "64GB",
        color: "Transparent Red",
        image: "images/r36s-transparent-red.png",
        badge: "In Stock",
        description: "R36S retro gaming handheld in transparent red."
    },

    {
        id: "r36s-black",
        name: "R36S Transparent Black",
        category: "Console",
        price: 60,
        storage: "64GB",
        color: "Black",
        image: "images/r36s-transparent-black.png",
        badge: "In Stock",
        description: "R36S retro gaming handheld in black."
    },

    {
        id: "case-bundle",
        name: "Protective Case Bundle",
        category: "Accessory",
        price: 15,
        color: "Black",
        image: "images/r36s-case-bundle.png",
        badge: "In Stock",
        description: "Protective carrying case with 2 screen protectors."
    }
];


// ============================================
// DOM ELEMENTS
// ============================================

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll("[data-filter]");


// ============================================
// CURRENCY FORMATTER
// ============================================

const currencyFormatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
});


// ============================================
// FORMAT PRICE
// ============================================

function formatPrice(price) {
    return currencyFormatter.format(price);
}


// ============================================
// CREATE PRODUCT CARD
// ============================================

function createProductCard(product) {
    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
        <div class="product-image-container">

            ${
                product.badge
                    ? `<span class="product-badge">${product.badge}</span>`
                    : ""
            }

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
                loading="lazy"
            >

        </div>

        <div class="product-content">

            <p class="product-category">
                ${product.category}
            </p>

            <h3 class="product-name">
                ${product.name}
            </h3>

            <p class="product-description">
                ${product.description}
            </p>

            <div class="product-meta">

                ${
                    product.storage
                        ? `<span>${product.storage}</span>`
                        : ""
                }

                ${
                    product.color
                        ? `<span>${product.color}</span>`
                        : ""
                }

            </div>

            <div class="product-footer">

                <span class="product-price">
                    ${formatPrice(product.price)}
                </span>

                <a
                    href="buy.html?product=${encodeURIComponent(product.id)}"
                    class="pill buy-now-btn"
                >
                    Buy Now
                </a>

            </div>

        </div>
    `;

    return card;
}


// ============================================
// RENDER PRODUCTS
// ============================================

function renderProducts(productList) {
    if (!productGrid) {
        return;
    }

    productGrid.innerHTML = "";

    if (productList.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found.</h3>
                <p>Try changing your search or filter.</p>
            </div>
        `;

        return;
    }

    productList.forEach((product) => {
        const productCard = createProductCard(product);

        productGrid.appendChild(productCard);
    });

    attachProductButtonListeners();
}


// ============================================
// PRODUCT FILTERING
// ============================================

let activeFilter = "All";

function filterProducts() {
    const searchTerm = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const filteredProducts = products.filter((product) => {
        const matchesFilter =
            activeFilter === "All" ||
            product.category === activeFilter;

        const searchableText = `
            ${product.name}
            ${product.category}
            ${product.color || ""}
            ${product.storage || ""}
            ${product.description || ""}
        `.toLowerCase();

        const matchesSearch =
            searchableText.includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    renderProducts(filteredProducts);
}


// ============================================
// FILTER BUTTONS
// ============================================

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;

        filterButtons.forEach((filterButton) => {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        filterProducts();
    });
});


// ============================================
// SEARCH
// ============================================

if (searchInput) {
    searchInput.addEventListener("input", () => {
        filterProducts();
    });
}


// ============================================
// MESSAGE TO BUY
// ============================================

function createPurchaseMessage(product) {
    return `Hi! I'm interested in the ${product.name} for ${formatPrice(
        product.price
    )}. Is it still available?`;
}


// ============================================
// OPEN PURCHASE MODAL
// ============================================

function openPurchaseModal(product) {
    const message = createPurchaseMessage(product);

    const existingModal =
        document.querySelector(".purchase-modal");

    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement("div");

    modal.className = "purchase-modal";

    modal.innerHTML = `
        <div class="modal-backdrop"></div>

        <div class="modal-card">

            <button
                class="modal-close"
                aria-label="Close"
            >
                ×
            </button>

            <p class="modal-eyebrow">
                READY TO ORDER?
            </p>

            <h2>
                ${product.name}
            </h2>

            <p class="modal-price">
                ${formatPrice(product.price)}
            </p>

            <p class="modal-description">
                Copy the message below and send it to us
                through Marketplace or Instagram.
            </p>

            <div class="message-box">
                ${message}
            </div>

            <button class="copy-message-button">
                Copy message
            </button>

            ${
                product.category === "Console"
                    ? `
                        <p class="bundle-note">
                            Add a protective carrying case +
                            2 screen protectors for only $10
                            with your console.
                        </p>
                    `
                    : ""
            }

        </div>
    `;

    document.body.appendChild(modal);

    document.body.style.overflow = "hidden";

    const closeButton =
        modal.querySelector(".modal-close");

    const backdrop =
        modal.querySelector(".modal-backdrop");

    const copyButton =
        modal.querySelector(".copy-message-button");

    closeButton.addEventListener("click", () => {
        closePurchaseModal(modal);
    });

    backdrop.addEventListener("click", () => {
        closePurchaseModal(modal);
    });

    copyButton.addEventListener("click", async () => {
        await copyMessage(message, copyButton);
    });
}


// ============================================
// CLOSE PURCHASE MODAL
// ============================================

function closePurchaseModal(modal) {
    modal.remove();

    document.body.style.overflow = "";
}


// ============================================
// COPY MESSAGE
// ============================================

async function copyMessage(message, button) {
    try {
        await navigator.clipboard.writeText(message);

        button.textContent = "Copied!";

        setTimeout(() => {
            button.textContent = "Copy message";
        }, 1800);
    } catch (error) {
        console.error(
            "Unable to copy message:",
            error
        );

        button.textContent = "Copy failed";

        setTimeout(() => {
            button.textContent = "Copy message";
        }, 1800);
    }
}


// ============================================
// PRODUCT BUTTON LISTENERS
// ============================================

function attachProductButtonListeners() {
    const productButtons =
        document.querySelectorAll(
            "[data-product-id]"
        );

    productButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productId =
                button.dataset.productId;

            const product =
                products.find(
                    (item) =>
                        item.id === productId
                );

            if (!product) {
                return;
            }

            openPurchaseModal(product);
        });
    });
}


// ============================================
// SMOOTH SCROLL
// ============================================

const anchorLinks =
    document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId =
            link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


// ============================================
// ESCAPE KEY CLOSES MODAL
// ============================================

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    const modal =
        document.querySelector(".purchase-modal");

    if (modal) {
        closePurchaseModal(modal);
    }
});


// ============================================
// INITIALIZE STORE
// ============================================

function initializeStore() {
    renderProducts(products);
}


// Run once the page has loaded.

document.addEventListener(
    "DOMContentLoaded",
    initializeStore
);