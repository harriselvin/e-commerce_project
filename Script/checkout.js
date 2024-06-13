const tbody = document.querySelector('tbody')
const amount = document.querySelector('.amount')
const price = document.querySelector('.price')
const removeAllBtn = document.querySelector('.cart-delete')

// Retrieve purchased items from local storage, ensure it's an array
let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || []

// Function to render cart items
function renderCartItem() {
    tbody.innerHTML = ''
    if (Array.isArray(purchasedItems)) {
        purchasedItems.forEach(product => {
            tbody.innerHTML += `
                <tr class="tbody-row">
                    <td class="table-item tbody-img"><img src="${product.image}" alt=""></td>
                    <td class="table-item tbody-name name">${product.name}</td>
                    <td class="table-item tbody-cat">${product.category}</td>
                    <td class="table-item tbody-quantity"><span class="decrement" data-id=${product.id}>-</span> ${product.quantity} <span class="increment" data-id=${product.id}>+</span></td>
                    <td class="table-item">${product.price}</td>
                    <td class="table-item remove-item remove-item" data-id=${product.id}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg></td>
                </tr>
            `
        });
    } if (tbody.innerHTML == '') {
        tbody.innerHTML = `
        <tr>
            <td colspan="6" style="text-align: center">No Items have been added<td/>
        </tr>
        `
    }

    // Attach event listeners for increment and decrement buttons
    incrementDecrementListeners()
    quantityCalc()
    totalPriceCalc()
}

// Function to calculate total price
function totalPriceCalc() {
    let total = 0
    purchasedItems.forEach(item => {
        total += item.quantity * parseFloat(item.price)
        price.textContent = total
    })
}

// Function to calculate the total number of items in cart
function quantityCalc() {
    let quanAmount = 0
    purchasedItems.forEach(item => {
        quanAmount = item.quantity + quanAmount
    })
    amount.textContent = quanAmount
}

// Function increments the quantity of an item
function incrementItem(id) {
    let item = purchasedItems.find(product => product.id === +id)
    if (item) {
        item.quantity += 1
        localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems))
        renderCartItem()
    }
}

// Function to decrement the quantity of an item
function decrementItem(id) {
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

// Function to remove all items from cart
function removeAllItems() {
    purchasedItems = []
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems))
    renderCartItem()
    amount.innerText
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

removeAllBtn.addEventListener('click', removeAllItems)