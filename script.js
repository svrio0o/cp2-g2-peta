// navigate to shop page
function shop() {
    window.location.href = "shop.html";
}

// navigate to home page
function home() {
    window.location.href = "index.html";
}

// store cart items
let cart = [];

// select item and add to the cart
function selectItem(itemName, price) {
    // get selected quantity type (single or multiple)
    const quantityType = document.querySelector('input[name="quantity"]:checked').value;
    
    let quantity = 1; // default quantity is 1
    
    // if the user selects "multiple", get custom quantity input
    if (quantityType === 'multiple') {
        const customQuantity = parseInt(document.getElementById('customQuantity').value);
        
        // validate custom quantity input
        if (isNaN(customQuantity) || customQuantity <= 0) {
            alert('Please enter a valid quantity greater than zero.');
            return;
        }
        quantity = customQuantity;
    }

    // checks if the item already exists in the cart
    const itemIndex = cart.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        // if the item exists, add its quantity and total price
        cart[itemIndex].quantity += quantity;
        cart[itemIndex].totalPrice += price * quantity;
    } else {
        // if the item doesn't exist, add it to the cart
        cart.push({ name: itemName, price: price, quantity: quantity, totalPrice: price * quantity });
    }

    // updates the cart display after adding an item
    updateCartDisplay();
}

// update the cart display in the UI
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; // clears the existing cart display

    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.totalPrice;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>₱${item.totalPrice.toFixed(2)}</span>
        `;

        // creates a "remove" button for each item
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => removeItemFromCart(index);
        cartItemDiv.appendChild(removeButton);

        // append the cart item to the cart display
        cartItems.appendChild(cartItemDiv);
    });

    // updates the total price display
    document.getElementById('totalPrice').innerText = `₱${totalPrice.toFixed(2)}`;
}

// remove an item from the cart
function removeItemFromCart(index) {
    cart.splice(index, 1); // removes item from specific index
    updateCartDisplay(); // updates the cart display after removal
}
function checkout() {
    // calculates the total price of items in the cart
    const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);
    
    // prompt user to enter the amount paid
    const amountPaid = parseFloat(prompt(`Total price is ₱${totalPrice}. Please enter the amount paid:`));
    
    // validates the input
    if (isNaN(amountPaid) || amountPaid < totalPrice) {
        alert('Invalid amount entered. Please try again.');
        return;
    }
    
    // calculates change
    const change = (amountPaid - totalPrice).toFixed(2);
    
    // generate receipt details
    let itemsPurchased = '';
    cart.forEach((item) => {
        itemsPurchased += `${item.name.padEnd(20)} x${String(item.quantity).padEnd(3)} ₱${item.totalPrice.toFixed(2).padStart(6)}\n`;
    });
    
    const receipt = `
Platito's Dishes & Sweets
---------------------------
Receipt
---------------------------
Items Purchased:
${itemsPurchased}
---------------------------
Total Price: ₱${totalPrice}
Amount Paid:  ₱${amountPaid}
Change:       ₱${change}
---------------------------
Thank you for shopping with us!
`;

    // displays the receipt in the UI
    document.getElementById('receipt').innerText = receipt;
    
    // clears the cart after checkout
    cart = [];
    
    // updates the cart display
    updateCartDisplay();
}

// print the receipt
function printReceipt() {
    window.print(); // Trigger print dialog
}

// enable or disable custom quantity input
const quantityRadios = document.querySelectorAll('input[name="quantity"]');
quantityRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        // enable or disable the custom quantity input based on selection
        document.getElementById('customQuantity').disabled = (this.value === 'single');
    });
});
