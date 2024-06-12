const tbody = document.querySelector('tbody')
const amount = document.querySelector('.amount')
const price = document.querySelector('.price')
const removeAllBtn = document.querySelector('.cart-delete')

// Retrieve purchased items from local storage, ensure it's an array
let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || []
if (!Array.isArray(purchasedItems)) {
    purchasedItems = []
}

// Function to render cart items
function renderCartItem() {
    tbody.innerHTML = ''
    if (Array.isArray(purchasedItems) && purchasedItems.length > 0) {
        purchasedItems.forEach(product => {
            tbody.innerHTML += `
                <tr class="tbody-row">
                    <td class="table-item tbody-img"><img src="${product.image}" alt=""></td>
                    <td class="table-item tbody-name name">${product.name}</td>
                    <td class="table-item tbody-cat">${product.category}</td>
                    <td class="table-item tbody-quantity"><span class="decrement">-</span> ${product.quantity} <span class="increment">+</span></td>
                    <td class="table-item remove-item remove">${product.price}</td>
                    <td class="table-item remove-item remove-item">Remove</td>
                </tr>
            `
        });
    } else {
         tbody.innerHTML = '<tr><td colspan="6">Cart is empty</td></tr>'
    }

    // Attach event listeners for increment and decrement buttons
    incrementDecrementListeners()
    totalPriceCalc()
    calculateTotalQuantity()
}

// Function to calculate total price
function totalPriceCalc() {
    let total = 0
    if (Array.isArray(purchasedItems)) {
        purchasedItems.forEach(item => {
            total += item.quantity * parseFloat(item.price.replace(/,/g, ''))
            amount.textContent = total.toLocaleString('en-US')
        })
    }
    amount.textContent = ''
}

// Function to calculate the total quantity of items
function calculateTotalQuantity() {
    let amount = 0
    if (Array.isArray(purchasedItems)) {
        purchasedItems.forEach(item => {
            amount += item.quantity
        })
    }
    amount.textContent = amount
}

// Function to remove all items from cart
function removeAllItems() {
    purchasedItems = []
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems))
    renderCartItem()
}

// Function increments the quantity of an item
function incrementItem() {
    let item = purchasedItems.find(product => product.id === +id)
    if (item) {
        item.quantity += 1
        localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems))
        renderCartItem()
    }
}

// Function to decrement the quantity of an item
function decrementItem() {
    let item = purchasedItems.find(product => product.id === +id)
    if (item && item.quantity > 1) {
        item.quantity -= 1
        localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems))
        renderCartItem()
    }
}

// Function to remove a specific item from cart
function removeItem(id) {
    purchasedItems = purchasedItems.filter(product => product.id !== +id)
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems))
    renderCartItem()
}

// Attach event listeners for increment and decrement buttons 
function incrementDecrementListeners() {
    const incrementBtns = document.querySelectorAll('.increment')
    const decrementBtns = document.querySelectorAll('.decrement')
    const removeBtns = document.querySelectorAll('.remove-item')

    incrementBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            incrementItem(event.target.dataset.id)
        })
    })

    decrementBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            decrementItem(event.target.dataset.id)
        })
    })

    removeBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            removeItem(event.target.dataset.id)
        })
    })
}

// Initial render of cart items
renderCartItem()

// Attach event listener to remove all items button
removeAllBtn.addEventListener('click', removeAllItems)