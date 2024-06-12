const product = document.querySelector('.product-box')

function Product(id, name, image, category, description, quantity, price) {
    this.id = id
    this.name = name
    this.image = image
    this.category = category
    this.description = description
    this.quantity = quantity
    this.price = price.toLocaleString('en-US')
}

let item1 = new Product(1, 'Rolex Pearlmaster', '/Images/rolex_watch_1.jpg', 'luxury', 'The Pearlmaster is a sub-collection within the Datejust family dedicated to jewelry watches, only available in precious metals with the addition of diamonds or other gemstones and fitted with the dedicated "Pearlmaster" bracelet', 1, 845755.39)
let item2 = new Product(2, 'Pocket Master', '/Images/pocket_watch_1.png', 'pocket', 'PQ8203 Matt Black Pocket Watch.', 1, 249)
let item3 = new Product(3, 'Black Crystal Bezel Watch', '/Images/fashion_watch_1.jpg', 'fashion', 'Watches make versatile fashion accessories that can elevate your everyday stack.', 1, 480)
let item4 = new Product(4, 'Apple Watch SE Starlight', '/Images/smart_watch_1.webp', 'smart', 'There’s so much that your Apple Watch can do and there is always something new to learn.', 1, 6599)
let item5 = new Product(5, 'Garmin MARQ Adventurer', '/Images/sport_watch_2.jpg', 'sport', 'You explore uncharted territories. Push boundaries and break limits. You demand the finest. You want a modern tool watch that reflects your passion for adventure.', 1, 54999)
let item6 = new Product(6, 'Garmin Fenix 7X Power Sapphire', '/Images/sport_watch_1.jpg', 'sport', 'GPS smartwatch built for your active lifestyle. Tune in to your body, and tone up with a smartwatch that can track it all and help you reach your health and fitness goals.', 1, 28499)

let items = [item1, item2, item3, item4, item5, item6]

let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems'))

console.log(purchasedItems);

localStorage.setItem('items', JSON.stringify(items))

let viewedItems = []

// Render items to the page
function renderItems(filteredItems) {
    items.innerHTML = ''
    filteredItems.forEach(function(item) {
    
        product.innerHTML += `
            <div class="items">
                <div class="item">
                    <img class="product-img" src="${item.image}" alt="Product Info">
                    <h5 class="product-title">${item.name}</h5>
                    <h5 product-price>R ${item.price}</h5>
                    <button class="view-more" value="${item.id}">View More</button>
                </div>
            </div>
        `
    })

    attachViewMore()
}

// Attached event to view more buttons
function attachViewMore() {
    const viewMoreBtn = document.querySelectorAll('.view-more')

    viewMoreBtn.forEach(btn => {
        btn.addEventListener('click', (event) => {
            viewItem(event.target.value)
            window.location.href = '/HTML/item.html'
        })
    })
}

renderItems(items)

const sortItems = document.querySelectorAll('.sort-btn')
const sortUp = document.querySelectorAll('.sortAZ')
const sortDown = document.querySelectorAll('.sortZA')

// Sort items by name
function sort() {
    items.sort((a, b) => {
        let nameA = a.name.toUpperCase()
        let nameB = b.name.toUpperCase()

        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }

        return 0
    })

    // Trigger the input event after setting  the value
    searchInput.dispatchEvent(new Event('input'))

    attachViewMore()
}

// A-Z sorting 
function sortAZ() {
    items.sort((a, b) => {
        let nameA = a.name.toUpperCase()
        let nameB = b.name.toUpperCase()

        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }

        return 0
    })

    // Trigger the input event after setting  the value
    searchInput.dispatchEvent(new Event('input'))

    attachViewMore()
}

// Z-A sorting
function sortZA() {
    items.sort((a, b) => {
        let nameA = a.name.toUpperCase()
        let nameB = b.name.toUpperCase()

        if (nameA > nameB) {
            return -1
        }
        if (nameA < nameB) {
            return 1
        }

        return 0
    })

    // Trigger the input event after setting  the value
    searchInput.dispatchEvent(new Event('input'))

    attachViewMore()
}

// View item and store in local storage
function viewItem(id) {
    let [item] = items.filter(object => object.id === +id)
    if (item) {
        viewedItems.push(item)
        localStorage.setItem('viewedItems', JSON.stringify(viewedItems))
    }

    attachViewMore()
}

const searchBtn = document.querySelector('.search-btn')
const searchInput = document.querySelector('.search-input')
const categoryFilter = document.querySelectorAll('.category-btn')

// Filter items by search input
function filterItems() {
    let searchItem = searchInput.value.trim().toUpperCase()
    let filteredItems = items.filter(item => {
        return Object.values(item).some(value => typeof value === 'string' && value.toUpperCase().includes(searchItem))
        })

    product.innerHTML = '';

    filteredItems.map(item => {
        product.innerHTML += `
            <div class="items">
            <div class="item">
                <img class="product-img" src="${item.image}" alt="Product Info">
                <h5 class="product-title">${item.name}</h5>
                <h5 product-price>R ${(item.price)}</h5>
                <button class="view-more" value="${item.id}">View More</button>
            </div>
        </div>
        `
    })

    attachViewMore()
}

// Filter items by category
function filterByCategory(category) {
    let filteredItems = items.filter(item => item.category.toUpperCase() === category.toUpperCase());
    renderItems(filteredItems);

    attachViewMore()
}

// Attached event listeners to category buttons
categoryFilter.forEach(item => {
    item.addEventListener('click', () => {
        searchInput.value = item.innerHTML

        // Trigger the input event after setting  the value
        searchInput.dispatchEvent(new Event('input'))
    })
})

// Attach event listener to all sort buttons
sortUp.forEach(btn => {
    btn.addEventListener('click', sortAZ)
})

sortDown.forEach(btn => {
    btn.addEventListener('click', sortZA)
})

searchBtn.addEventListener('click', filterItems)
searchInput.addEventListener('input', filterItems)