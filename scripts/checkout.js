import { cart, removeFromCart,updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = '';

cart.forEach( (cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product) => {
        if( productId === product.id)
        matchingProduct = product;
    });


    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input">
                    <span class="save-quantity-link link-primary js-save-quantity" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">

                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                        $9.99 - Shipping
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `; 
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


// Delete
document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();

        updateItemCart();  
    });
});

function updateItemCart() {
    document.querySelector('.js-item-quantity').innerHTML = `${cart.length} items`
}

updateItemCart();

//Update

document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        
        container.classList.add('is-editing-quantity');
    })
});

// Save
document.querySelectorAll('.js-save-quantity').forEach((saveButton) => {
    saveButton.addEventListener('click', () => {
        const productId = saveButton.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        const newQuantity = Number(document.querySelector('.quantity-input').value);

        // console.log(quantity);
        if (newQuantity < 0 || newQuantity >= 1000) {
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }

        updateQuantity(productId, newQuantity);

        container.classList.remove('is-editing-quantity');
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML =  newQuantity;

    }); 
});

document.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
        // Check if the Enter key is pressed (key code 13)
        if (event.key=== 'Enter') {
            // Find the associated "Save" button
            const productId = input.dataset.productId;
            const saveButton = document.querySelector(`.js-save-quantity`);

            // Trigger a click event on the "Save" button
            if (saveButton) {
                saveButton.click();
            }
        }
    });
});