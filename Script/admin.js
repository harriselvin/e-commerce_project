document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('tbody');
  const productName = document.querySelector('.name');
  const productCategory = document.querySelector('.category');
  const productQuantity = document.querySelector('.quantity');
  const productPrice = document.querySelector('.price');
  const productUpload = document.querySelector('.upload');
  const productDescription = document.querySelector('.description');
  const addItems = document.querySelector('.add-item');
  const updateItems = document.querySelector('.update-item');
  const search = document.querySelector('.search')
  let productImageSrc = "";

  // Constructor for Product
  function Product(id, name, image, category, description, quantity, price) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.category = category;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
  }

  let items = []

  // let minus = JSON.parse(localStorage.getItem('purchasedItems'))

  // console.log(minus);

  // File upload handling
  function fileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        productImageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  productUpload.addEventListener('change', fileUpload);

  // Initial product list
  let adminItems = items || [
    new Product(1, 'Sample Product', 'image/path.jpg', 'Category 1', 'Description', 10, 100)
  ];

  // console.log(adminItems);

  // Load items from local storage if available
  function loadItemsFromLocalStorage() {
    const storedItems = localStorage.getItem('adminItems');
    if (storedItems) {
      adminItems = JSON.parse(storedItems);
    }
    removeItem()
  }

  // Save to localStorage
  function saveItems() {
    localStorage.setItem('adminItems', JSON.stringify(adminItems));
  }

  function filterItems() {
    let searchItem = search.value.trim().toUpperCase()
    let filteredItems = adminItems.filter(item => {
        return Object.values(item).some(value => typeof value === 'string' && value.toUpperCase().includes(searchItem))
        })

    main.innerHTML = '';

    filteredItems.forEach(item => {
        main.innerHTML += `
            <tr class="admin-row">
          <td><img src="${item.image}" alt="${item.name}"></td>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${item.description}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
          <td>
            <button class="btn btn-danger remove-item" data-id="${item.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
              </svg>
            </button>
          </td>
        </tr>
        `

        saveItems()
    })
  }

  // Function to add item
  function addItem() {
    let id = adminItems.length + 1;
    let newItem = new Product(id, productName.value, productImageSrc, productCategory.value, productDescription.value, productQuantity.value, productPrice.value);
    adminItems.push(newItem);
    renderItems(adminItems);
    saveItems();

    // console.log(newItem);
    
  }

  function clearInput() {
    productName.value = ''
    productCategory.value = ''
    productDescription.value = ''
    productQuantity.value = ''
    productPrice.value = ''
    productUpload.value = ''
  }

  function submitItem() {
    addItem()
    clearInput()
  }

  // Function to edit item
  // function editItem(id) {
  //   let item = adminItems.find(item => item.id === id);
  //   if (item) {
  //     productName.value = item.name;
  //     productCategory.value = item.category;
  //     productQuantity.value = item.quantity;
  //     productPrice.value = item.price;
  //     productImageSrc = item.image;
  //     document.querySelector('.edit-id').value = id;
  //     document.querySelector('.add-item').style.display = 'none';
  //     document.querySelector('.update-item').style.display = 'inline-block';
  //   }
  // }

  // Update item in list
  // function updateItem() {
  //   let id = parseInt(document.querySelector('.edit-id').value);
  //   let item = adminItems.find(item => item.id === id);

  //   if (item) {
  //     item.name = productName.value;
  //     item.category = productCategory.value;
  //     item.quantity = productQuantity.value;
  //     item.description = productDescription.value;
  //     item.price = productPrice.value;
  //     item.image = productImageSrc;
  //     renderItems(items);
  //     saveItems();
  //     document.querySelector('.add-item').style.display = 'inline-block';
  //     document.querySelector('.update-item').style.display = 'none';

  //     saveItems()
  //   }
  // }

  // Function to remove item
  function removeItem(id) {
    items = adminItems.filter(item => item.id !== id);
    renderItems(items);
    saveItems();

    console.log(items);
  }

  // Render items to the page
  function renderItems(filteredItems) {
    main.innerHTML = '';
    filteredItems.forEach(item => {
      main.innerHTML += `
        <tr class="admin-row">
          <td><img src="${item.image}" alt="${item.name}"></td>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${item.description}</td>
          <td class="quantitySub">${item.quantity}</td>
          <td>${item.price}</td>
          <td>
            <button class="btn btn-danger remove-item" data-id="${item.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                      </svg></button>
          </td>
        </tr>
      `;
      saveItems()
    });

    // <button class="btn btn-primary edit-item" data-id="${item.id}">Edit</button>

    // Attach event listeners to edit buttons
    document.querySelectorAll('.edit-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        let id = parseInt(e.target.getAttribute('data-id'));
        editItem(id);
      });
    });

    // Attach event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        let id = parseInt(e.target.getAttribute('data-id'));
        removeItem(id);
      });
    });
  }

  function removeItem(id) {
    adminItems = adminItems.filter(product => product.id !== +id)
    localStorage.setItem('adminItems', JSON.stringify(adminItems))
  }

  // const quantity = document.querySelector('.quantitySub')

  // function decreaseQuan() {
  //   let quanAmount = 0
  //   adminItems.forEach(item => {
  //     quanAmount = item.quantity += productQuantity.value
  //       })
  //   productQuantity.value = quanAmount

  //   console.log(quanAmount);
  // }

  // decreaseQuan()

  // Initial render
  loadItemsFromLocalStorage()
  renderItems(adminItems);

  // Event listeners
  search.addEventListener('input', filterItems)
  addItems.addEventListener('click', submitItem);
  // updateItems.addEventListener('click', updateItem);
})