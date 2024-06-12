const itemBox = document.querySelector('.item-box')

// Retrieve existing cart items from localStorage
let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || []

let listItems = JSON.parse(localStorage.getItem('viewedItems')) || []

listItems.forEach(product => {
    itemBox.innerHTML += `
        <div class="items-in-box">
            <div class="item-image">
                <img src="${product.image}" alt="">
            </div>
            <div class="item-info">
                <h5 class="product-title">${product.name}</h5>
                <h5 product-price>R ${product.price}</h5>
                <button class="purchase" value="${product.id}">Purchase</button>
                <h4>Description</h4>
                <h6>${product.description}</h6>
            </div>
        </div>
    `
});

const purchase = document.querySelectorAll('.purchase')

// Attached event to purchase buttons
purchase.forEach(btn => {
    btn.addEventListener('click', (event) => {
        addToCart(event.target.value);
    })
})

// Purchase item and store in local storage
function addToCart(id) {
    let [item] = listItems.filter(object => object.id === id)

    // Check if the item is already in the cart
    let existingItemIndex = purchasedItems.findIndex(existingItem => existingItem.id === item.id)

    if (existingItemIndex !== -1) {
        // If the item already exists, increase its quantity
        purchasedItems[existingItemIndex].quantity += 1
    } else {
        // If the item does not exist, and it to the array
        item.quantity = 1
        purchasedItems.push(item)
    }

    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems))
    swal("Item added to cart!", "You clicked the button!", "success");
}