const itemBox = document.querySelector('.item-box')

let listItems = JSON.parse(localStorage.getItem('viewedItems'))

listItems.forEach(product => {
    itemBox.innerHTML = `
        <div class="items-in-box">
            <div class="item-image">
                <img src="${product.image}" alt="">
            </div>
            <div class="item-info">
                <h5 class="product-title">${product.name}</h5>
                <h5 product-price>R ${(product.price).toFixed(2)}</h5>
                <button class="purchase" value="${product.id}">Purchase</button>
                <h4>Description</h4>
                <h6>${product.description}</h6>
            </div>
        </div>
    `
});
