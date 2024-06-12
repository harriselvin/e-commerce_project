// Event listener that takes you to another page
const image = document.querySelectorAll('.carousel')

image.forEach(img => {
    img.addEventListener('click', () => {
        image.innerHTML = window.location.href = './HTML/product.html'
    })
})

// Function to send HTML form data to Gmail

// function subscribe() {
//     const userName = document.querySelector('.input-name')
//     const userEmail = document.querySelector('.input-email')

//     let messageBody = 'Name: ' + userName + "<br/> Email" + userEmail;

//     Email.send({
//         Host : "smtp.elasticemail.com",
//         Username : "harriselvin6@gmail.com",
//         Password : "9979A05CEB02FE75E56619735534F4F697D3",
//         To : 'harriselvin6@gmail.com',
//         From : "harriselvin6@gmail.com",
//         Subject : "Prime Time Pieces Newsletter Subscription",
//         Body : messageBody
//     }).then(
//       message => {
//         if (userName.value !== '' && userEmail.value !== '' && message == 'OK') {
//             swal("Successful", "You clicked the button!", "success");
//         } else {
//             swal("Error", "You clicked the button!", "error");
//         }
//       }
//     );
// }
