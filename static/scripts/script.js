// ===================================
// SFZ CONTACT FORM
// ===================================

const button = document.getElementById("send");

if (button) {
    button.addEventListener("click", () => {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !phone || !subject || !message) {
            alert("Please fill in all the details.");
            return;
        }

        const text = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone Number: ${phone}\n` +
            `Subject: ${subject}\n` +
            `Message: ${message}`
        );

        window.open(
            `https://wa.me/917997937272?text=${text}`,
            "_blank"
        );

        button.textContent = "Sent";
        button.style.backgroundColor = "gray";
        button.disabled = true;

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("subject").selectedIndex = 0;
        document.getElementById("message").value = "";
    });
}


// ===================================
// SFZ WISHLIST STORAGE
// ===================================

const wishlistKey = "sfzWishlist";

function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem(wishlistKey)) || [];
    } catch (error) {
        console.error("Unable to read wishlist:", error);
        return [];
    }
}

function saveWishlist(wishlist) {
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
}


// ===================================
// UPDATE WISHLIST BUTTONS
// ===================================

function updateWishlistButtons() {
    const wishlist = getWishlist();

    document.querySelectorAll(".wishlist-btn").forEach((button) => {

        const exists = wishlist.some(
            (item) => String(item.id) === String(button.dataset.id)
        );

        button.textContent = exists ? "♥ Added" : "♡ Wishlist";

        button.classList.toggle("added", exists);
    });
}


// ===================================
// ADD OR REMOVE PRODUCTS
// ===================================

document.querySelectorAll(".wishlist-btn").forEach((button) => {

    button.addEventListener("click", () => {

        const wishlist = getWishlist();
        const productId = button.dataset.id;

        const exists = wishlist.some(
            (item) => String(item.id) === String(productId)
        );

        if (exists) {

            const updatedWishlist = wishlist.filter(
                (item) => String(item.id) !== String(productId)
            );

            saveWishlist(updatedWishlist);

        } else {

            wishlist.push({
                id: productId,
                name: button.dataset.name,
                price: button.dataset.price,
                image: button.dataset.image
            });

            saveWishlist(wishlist);
        }

        updateWishlistButtons();
    });

});

updateWishlistButtons();


// ===================================
// DISPLAY WISHLIST PAGE
// ===================================

const wishlistContainer = document.getElementById("wishlist-products");
const emptyMessage = document.getElementById("empty-wishlist");

if (wishlistContainer && emptyMessage) {

    function displayWishlist() {

        const wishlist = getWishlist();

        wishlistContainer.innerHTML = "";

        emptyMessage.style.display =
            wishlist.length === 0 ? "block" : "none";

        wishlist.forEach((product) => {

            const card = document.createElement("div");
            card.className = "product-card";

            const image = document.createElement("img");

            // Supports image paths such as:
            // images/formal1.jpeg
            // images/shirts/formal1.jpeg
            const imagePath = product.image.startsWith("static/")
                ? product.image.substring("static/".length)
                : product.image;

            image.src = `/static/${imagePath}`;
            image.alt = product.name;

            const info = document.createElement("div");
            info.className = "product-info";

            const name = document.createElement("h3");
            name.textContent = product.name;

            const price = document.createElement("p");
            price.textContent = `₹${product.price}`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "♥ Remove from Wishlist";

            removeButton.addEventListener("click", () => {

                const updatedWishlist = getWishlist().filter(
                    (item) => String(item.id) !== String(product.id)
                );

                saveWishlist(updatedWishlist);

                displayWishlist();

                updateWishlistButtons();
            });

            info.append(name, price, removeButton);
            card.append(image, info);

            wishlistContainer.appendChild(card);
        });
    }

    displayWishlist();
}