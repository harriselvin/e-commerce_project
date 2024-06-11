const image = document.querySelectorAll('.carousel')

image.forEach(img => {
    img.addEventListener('click', () => {
        image.innerHTML = window.location.href = './HTML/product.html'
    })
})
