
        // Array to hold items added to the cart
        let cart = [];

        // Function to handle item selection
        function selectItem(itemName, price) {
            // Get the selected quantity type (single or multiple)
            const quantityType = document.querySelector('input[name="quantity"]:checked').value;

            let quantity = 1;

            if (quantityType === 'multiple') {
                // If "Multiple" is selected, enable custom quantity input
                const customQuantity = parseInt(document.getElementById('customQuantity').value);
                if (isNaN(customQuantity) || customQuantity <= 0) {
                    alert('Please enter a valid quantity greater than zero.');
                    return;
                }
                quantity = customQuantity;
            }

            // Add the item to the cart array with the specified quantity
            const itemIndex = cart.findIndex(item => item.name === itemName);
            if (itemIndex !== -1) {
                // If the item is already in the cart, update its quantity and total price
                cart[itemIndex].quantity += quantity;
                cart[itemIndex].totalPrice += price * quantity;
            } else {
                // Otherwise, add a new item entry to the cart
                cart.push({ name: itemName, price: price, quantity: quantity, totalPrice: price * quantity });
            }

            // Update the cart display
            updateCartDisplay();
        }

        // Function to update the cart display
        function updateCartDisplay() {
            // Get the cart items element
            const cartItems = document.getElementById('cartItems');
            cartItems.innerHTML = '';

            // Calculate total price
            let totalPrice = 0;

            // Display each item in the cart
            cart.forEach((item, index) => {
                totalPrice += item.totalPrice;

                // Create a div for the item
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');

                // Add the item name, quantity, and total price
                cartItemDiv.innerHTML = `
                    <span>${item.name} x${item.quantity}</span>
                    <span>$${item.totalPrice.toFixed(2)}</span>
                `;

                // Add a remove button
                const removeButton = document.createElement('button');
                removeButton.innerText = 'Remove';
                removeButton.onclick = () => removeItemFromCart(index);
                cartItemDiv.appendChild(removeButton);

                // Add the div to the cart items element
                cartItems.appendChild(cartItemDiv);
            });

            // Update the total price
            document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
        }

        // Function to remove an item from the cart
        function removeItemFromCart(index) {
            // Remove the item at the specified index
            cart.splice(index, 1);

            // Update the cart display
            updateCartDisplay();
        }

        // Function to handle checkout and calculate change
        function checkout() {
            // Calculate the total price of the cart
            const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);
            
            // Prompt the user to enter the amount paid
            const amountPaid = parseFloat(prompt(`Total price is $${totalPrice}. Please enter the amount paid:`));
            
            // Validate the amount paid
            if (isNaN(amountPaid) || amountPaid < totalPrice) {
                alert('Invalid amount entered. Please try again.');
                return;
            }
            
            // Calculate the change
            const change = (amountPaid - totalPrice).toFixed(2);
            
            // Gather list of items purchased
            let itemsPurchased = '';
            cart.forEach((item) => {
                itemsPurchased += `${item.name.padEnd(20)} x${String(item.quantity).padEnd(3)} $${item.totalPrice.toFixed(2).padStart(6)}\n`;
            });
            
            // Format the receipt with the company name, sections, and alignment
            const receipt = `
Holy Trinity Thrifts
---------------------------
Receipt
---------------------------
Items Purchased:
${itemsPurchased}
---------------------------
Total Price: $${totalPrice}
Amount Paid:  $${amountPaid}
Change:       $${change}
---------------------------
Thank you for shopping with us!
    `;

            // Display the receipt in the receipt section
            document.getElementById('receipt').innerText = receipt;
            
            // Clear the cart
            cart = [];
            
            // Update the cart display
            updateCartDisplay();
        }

        // Function to print the receipt
        function printReceipt() {
            window.print();
        }

        // Add event listener to quantity radio buttons
        const quantityRadios = document.querySelectorAll('input[name="quantity"]');
        quantityRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                // Enable or disable custom quantity input based on selection
                document.getElementById('customQuantity').disabled = (this.value === 'single');
            });
        });
    