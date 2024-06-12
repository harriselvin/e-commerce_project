const itemBox = document.querySelector('.item-box')

let listItems = JSON.parse(localStorage.getItem('viewedItems'))

let purchasedItems = []

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
    let [item] = listItems.filter(object => object.id === +id)
    purchasedItems.push(item)
    swal("Item added to cart!", "You clicked the button!", "success");
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems))
}

JSON.parse(localStorage.getItem('purchasedItems'))