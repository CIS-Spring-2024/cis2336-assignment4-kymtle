function addToOrder(button) {
    var menuContent = button.parentNode;
    var itemName = menuContent.getElementsByTagName('h5')[0].textContent;
    var itemPrice = parseFloat(menuContent.getElementsByTagName('span')[0].innerText.replace('$', ''));
    var quantity = menuContent.getElementsByClassName('quantitySelect')[0].value;

    // Check if quantity is within a valid range (e.g., between 1 and 10)
    if (quantity >= 1 && quantity <= 10) {
        // Calculate subtotal
        var subtotal = itemPrice * quantity;

        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ itemName, itemPrice, quantity });
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(quantity + " x " + itemName + " added to order!");

        // Update the order display when an item is added to the cart
        displayOrder();

        fetch('http://localhost:8080/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subtotal })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    } else {
        // Quantity is not within the valid range
        alert("Please select a quantity between 1 and 10.");
    }
}
