function submitForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (!name || !phone || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Send data to the server
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, password }),
    })
    .then(response => {
        if (response.ok) {
            alert('Registration successful!');
        } else {
            alert('Registration failed. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
}
