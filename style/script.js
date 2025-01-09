// Toggle Navbar
let menuIcon = document.querySelector('#menu_icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-x');
    navbar.classList.toggle('active');
};

// Active Color Link Navbar
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
        }
    });

    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Hide Navbar Links on Scroll
    menuIcon.classList.remove('fa-x');
    navbar.classList.remove('active');
};











document.addEventListener("DOMContentLoaded", () => {
    const rightSection = document.getElementById("right_section");
    const cartCount = document.getElementById("cart_count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    let cartProducts = [];
    let cartItems = 0;

    // Function to display the right section with specific content
    function showRightSection(content) {
        rightSection.innerHTML = content;
        rightSection.classList.add("show");
    }

    // Add to Cart functionality
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productName = button.parentElement.querySelector(".name").textContent;
            const productPrice = parseFloat(button.parentElement.querySelector(".price").textContent.replace('৳', ''));
            const productImage = button.parentElement.querySelector("img").src;

            // Check if product already exists in the cart
            const existingProduct = cartProducts.find(product => product.name === productName);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cartProducts.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1,
                });
            }

            cartItems++;
            cartCount.textContent = cartItems;
            updateCartContent();
            alert(`${productName} has been added to the cart!`);
        });
    });

    // Function to update the cart content dynamically
    function updateCartContent() {
        const cartList = cartProducts
            .map((product, index) => `
                <li>
                    <img src="${product.image}" alt="${product.name}" class="cart-product-image">
                    <div class="cart-product-details">
                        <p class="cart-product-name">${product.name}</p>
                        <p class="cart-product-price">৳${product.price.toFixed(2)}</p>
                        <div class="cart-product-actions">
                            <button class="decrease-qty" onclick="decreaseQuantity(${index})">-</button>
                            <span class="cart-product-quantity">${product.quantity}</span>
                            <button class="increase-qty" onclick="increaseQuantity(${index})">+</button>
                            <button class="remove-item" onclick="removeItem(${index})">Remove</button>
                        </div>
                    </div>
                </li>
            `).join("");

        const cartContainer = document.getElementById("cart_items_list");

        // Calculate the total price
        const totalPrice = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);

        // Cart content with total price included
        const cartContent = `
            <ul id="cart_items_list">
                ${cartList || "<p>Your cart is empty!</p>"}
            </ul>
            ${cartProducts.length ? `
                <p><strong>Total Price: ৳${totalPrice}</strong></p>
                <button id="checkout_button" onclick="checkout()">Checkout</button>` : ""}
        `;

        if (cartContainer) {
            cartContainer.innerHTML = cartContent;
        } else {
            showRightSection(cartContent);
        }
    }

    window.increaseQuantity = function(index) {
        cartProducts[index].quantity++;
        cartItems++;
        cartCount.textContent = cartItems;
        updateCartContent();
    };

    window.decreaseQuantity = function(index) {
        if (cartProducts[index].quantity > 1) {
            cartProducts[index].quantity--;
            cartItems--;
            cartCount.textContent = cartItems;
        } else {
            removeItem(index);
        }
        updateCartContent();
    };

    window.removeItem = function(index) {
        cartItems -= cartProducts[index].quantity;
        cartProducts.splice(index, 1);
        cartCount.textContent = cartItems;
        updateCartContent();
    };

    window.checkout = function() {
        alert("Proceeding to checkout...");
    };

    // Show Cart Content
    document.getElementById("cart_icon").addEventListener("click", (e) => {
    e.preventDefault();
    const cartContent = `
        <h3>Cart</h3>
        <ul id="cart_items_list">
            ${
                cartProducts.length
                    ? cartProducts
                          .map(
                              (product, index) => `
                    <li>
                        <img src="${product.image}" alt="${product.name}" class="cart-product-image">
                        <div class="cart-product-details">
                            <p class="cart-product-name">${product.name}</p>
                            <p class="cart-product-price">৳${product.price.toFixed(2)}</p>
                            <div class="cart-product-actions">
                                <button onclick="decreaseQuantity(${index})">-</button>
                                <span>${product.quantity}</span>
                                <button onclick="increaseQuantity(${index})">+</button>
                                <button onclick="removeItem(${index})">Remove</button>
                            </div>
                        </div>
                    </li>
                `
                          )
                          .join("")
                    : `<p class="empty">Your cart is empty!</p>`
            }
        </ul>
        ${
            cartProducts.length
                ? `
                <p class="total_price"><strong>Total Price: ৳ <span class="price_total">${cartProducts
                    .reduce(
                        (total, product) =>
                            total + product.price * product.quantity,
                        0
                    )
                    .toFixed(2)}</span></strong></p>
                <button id="checkout_button" onclick="checkout()">Checkout</button>`
                : ""
        }
    `;
    showRightSection(cartContent);
});

    // Show Search Input
    document.getElementById("search_icon").addEventListener("click", (e) => {
        e.preventDefault();
        showRightSection(`
            <h3>Search</h3>
            <input type="text" placeholder="Search for products..." id="search_input">
        `);
    });

    // Show Wishlist Content
    document.getElementById("wishlist_icon").addEventListener("click", (e) => {
        e.preventDefault();
        showRightSection(`
            <h3>Wishlist</h3>
            <p class="empty">Your favorite products will appear here.</p>
        `);
    });

    // Show Logout Confirmation
    document.getElementById("logout_icon").addEventListener("click", (e) => {
        e.preventDefault();
        showRightSection(`
            <h3>Logout</h3>
            <p class="empty">Are you sure you want to log out?</p>
            <button class="btnn" onclick="alert('Logged out!')">Logout</button>
        `);
    });

    // Close Right Section if clicked outside
    document.addEventListener("click", (event) => {
        if (!rightSection.contains(event.target) && !event.target.closest("#icons")) {
            rightSection.classList.remove("show");
        }
    });
});





































// ScrollReveal Animations
const sr = ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
    reset: false
});

sr.reveal('.home_content, .heading', { origin: 'top' });
sr.reveal('.home_img, .services_content, .portfolio_box, .contact form', { origin: 'bottom' });
sr.reveal('.home_content h1, .about_img', { origin: 'left' });
sr.reveal('.home_content p, .about_content', { origin: 'right' });



   document.addEventListener("DOMContentLoaded", () => {
            const slide1 = document.querySelector(".slide_1");
            const slide2Image = document.querySelector(".slide_2 img");

            setTimeout(() => {
                slide1.classList.add("animate__animated", "animate__fadeInLeft");
                slide1.style.opacity = 1;

                slide2Image.style.animation = "rotateIn 1.5s ease forwards";
            }, 100);
        });












document.addEventListener("DOMContentLoaded", () => {
    const menBoxes = document.querySelectorAll(".men_box, .children_box, .women_box"); // Fixed the query selector

    // Add fade-in effect on page load for each product box
    menBoxes.forEach((box, index) => {
        // Add a delay to make the effect staggered for each box
        setTimeout(() => {
            box.classList.add("fade-in");
        }, 300 * index); // Delay staggered for each box
    });

    // Add hover animation for scale effect on hover
    menBoxes.forEach(box => {
        box.addEventListener("mouseenter", () => {
            box.style.transform = "scale(1.1)";
            box.style.transition = "transform 0.3s ease";
        });

        box.addEventListener("mouseleave", () => {
            box.style.transform = "scale(1)";
            box.style.transition = "transform 0.3s ease";
        });
    });
});

























 // Disable context menu and shortcuts js

    document.addEventListener('contextmenu', (event) => event.preventDefault());
    document.addEventListener('selectstart', (event) => event.preventDefault());
    document.addEventListener('dragstart', (event) => event.preventDefault());
    document.addEventListener('keydown', (event) => {
      if (
        (event.ctrlKey && ['u', 's', 'c'].includes(event.key.toLowerCase())) ||
        (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'i')
      ) {
        event.preventDefault();
      }
    });






    // button tag er kaj link add
    

    document.getElementById("shop_now_btn").addEventListener("click", () => {
                    const mensSection = document.getElementById("mens");
                    mensSection.scrollIntoView({ behavior: "smooth" });
                });

document.addEventListener("DOMContentLoaded", () => {
    const applyOfferButtons = document.querySelectorAll(".apply-offer-btn");

    applyOfferButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const mensSection = document.getElementById("mens");
            mensSection.scrollIntoView({ behavior: "smooth" });
        });
    });
});
