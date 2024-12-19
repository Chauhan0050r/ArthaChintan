// Replace this URL with your Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbwPawpFZ9H7LhQAh7MkbwmXFAz1vJO2DtrM30D9s0JMutkSE19ADrE1hQH0wR9YiKDU/exec";

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Capture form data
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const product = document.getElementById('product').value;
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !phone || !email || !product) {
        alert('Please fill out all required fields.');
        return;
    }

    // Construct data for POST request
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("product", product);
    formData.append("message", message);

    // Send data to Google Apps Script
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(() => {
            alert('Thank you for contacting us! Your details have been submitted.');
            document.getElementById('contact-form').reset();
        })
        .catch((error) => {
            alert('There was an error submitting the form. Please try again.');
            console.error("Error: ", error);
        });
});
