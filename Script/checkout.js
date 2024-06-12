const tbody = document.querySelector('tbody')
const amount = document.querySelector('.amount')

let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems'))

purchasedItems.forEach(product => {
    tbody.innerHTML += `
        <tr class="tbody-row">
            <td class="table-item tbody-img"><img src="${product.image}" alt=""></td>
            <td class="table-item tbody-name name">${product.name}</td>
            <td class="table-item tbody-cat">${product.category}</td>
            <td class="table-item tbody-quantity">${product.quantity}</td>
            <td class="table-item remove-item remove">Remove</td>
        </tr>
    `

    if (tbody == '') {
        tbody.innerText = 'Cart is empty'
    }
});

const price = document.querySelector('.price')