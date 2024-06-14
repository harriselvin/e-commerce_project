const product = document.querySelector('.product-box')

let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems'))

// localStorage.setItem('items', JSON.stringify(items))

let adminItems = JSON.parse(localStorage.getItem('adminItems'))

console.log(adminItems);

let viewedItems = []

// Render items to the page
function renderItems(filteredItems) {
    adminItems.innerHTML = ''
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

try {
    if (product.innerHTML === '')
    throw error
} catch (error) {
    product.innerHTML = "Store is currently out of stock. Please visit again."
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

renderItems(adminItems)

const sortItems = document.querySelectorAll('.sort-btn')
const sortUp = document.querySelectorAll('.sortAZ')
const sortDown = document.querySelectorAll('.sortZA')

// Sort items by name
function sort() {
    adminItems.sort((a, b) => {
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
    adminItems.sort((a, b) => {
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
    adminItems.sort((a, b) => {
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
    let [item] = adminItems.filter(object => object.id === +id)
    if (item) {
        viewedItems.push(item)
        localStorage.setItem('viewedItems', JSON.stringify(viewedItems))
    }

    attachViewMore()
}

const searchBtn = document.querySelector('.search-btn')
const searchInput = document.querySelector('.search-input')
const searchInputTwo = document.querySelector('.search1-input')
const categoryFilter = document.querySelectorAll('.category-btn')

// Filter items by search input
function filterItems() {
    let searchItem = searchInput.value.trim().toUpperCase()
    let filteredItems = adminItems.filter(item => {
        return Object.values(item).some(value => typeof value === 'string' && value.toUpperCase().includes(searchItem))
        })

    product.innerHTML = '';

    filteredItems.map(item => {
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

function filterItemsTwo() {
    let searchItem = searchInputTwo.value.trim().toUpperCase()
    let filteredItems = adminItems.filter(item => {
        return Object.values(item).some(value => typeof value === 'string' && value.toUpperCase().includes(searchItem))
        })

    product.innerHTML = '';

    filteredItems.map(item => {
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

function catchSearchError() {
    try {
        filterItems()
        filterItemsTwo()
        sort()
        sortAZ()
        sortZA()
        if (product.innerHTML === '')
        throw error
    } catch (error) {
        product.innerHTML = "Item not found"
    }
}

// Filter items by category
function filterByCategory(category) {
    let filteredItems = adminItems.filter(item => item.category.toUpperCase() === category.toUpperCase());
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

searchBtn.addEventListener('click', catchSearchError)
searchInputTwo.addEventListener('input', filterItemsTwo)
searchInput.addEventListener('input', filterItems)