function shop() {
    window.location.href = "shop.html"
}

function home() {
    window.location.href = "index.html"
}


let cart = [];

function selectItem(itemName, price) {
    const quantityType = document.querySelector('input[name="quantity"]:checked').value;

    let quantity = 1;

    if (quantityType === 'multiple') {
        const customQuantity = parseInt(document.getElementById('customQuantity').value);
        if (isNaN(customQuantity) || customQuantity <= 0) {
            alert('Please enter a valid quantity greater than zero.');
            return;
        }
        quantity = customQuantity;
    }

    const itemIndex = cart.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += quantity;
        cart[itemIndex].totalPrice += price * quantity;
    } else {
        cart.push({ name: itemName, price: price, quantity: quantity, totalPrice: price * quantity });
    }

    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.totalPrice;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>₱${item.totalPrice.toFixed(2)}</span>
        `;

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => removeItemFromCart(index);
        cartItemDiv.appendChild(removeButton);

        cartItems.appendChild(cartItemDiv);
    });

    document.getElementById('totalPrice').innerText = `₱${totalPrice.toFixed(2)}`;
}

function removeItemFromCart(index) {
    cart.splice(index, 1);

    updateCartDisplay();
}

function checkout() {
    const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);
    
    const amountPaid = parseFloat(prompt(`Total price is ₱${totalPrice}. Please enter the amount paid:`));
    
    if (isNaN(amountPaid) || amountPaid < totalPrice) {
        alert('Invalid amount entered. Please try again.');
        return;
    }
    
    const change = (amountPaid - totalPrice).toFixed(2);
    
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

    document.getElementById('receipt').innerText = receipt;
    
    cart = [];
    
    updateCartDisplay();
}

function printReceipt() {
    window.print();
}

const quantityRadios = document.querySelectorAll('input[name="quantity"]');
quantityRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        // Enable or disable custom quantity input based on selection
        document.getElementById('customQuantity').disabled = (this.value === 'single');
    });
});
