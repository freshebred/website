const loginContainer = document.getElementById('login-container');
const checkboxContainer = document.getElementById('checkbox-container');
const loginForm = document.getElementById('login-form');
require("dotenv").config();
// Replace with your actual credentials
const validUsername = 'admin';
const validPassword = process.env.PASSWORD;

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
        loginContainer.style.display = 'none';
        checkboxContainer.style.display = 'block';

        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.checked = item.stat !== undefined && item.stat.split('/')[0] === item.stat.split('/')[1];
                    checkbox.disabled = false; // Allow changes

                    const label = document.createElement('label');
                    label.textContent = `${item.desc} ${item.stat ? `(${item.stat})` : ''}`;

                    const checkboxItem = document.createElement('div');
                    checkboxItem.classList.add('checkbox-item');
                    checkboxItem.appendChild(checkbox);
                    checkboxItem.appendChild(label);

                    checkboxContainer.appendChild(checkboxItem);

                    // Add background color based on checkbox state
                    checkbox.addEventListener('change', () => {
                        if (checkbox.checked) {
                            checkboxItem.style.backgroundColor = 'green';
                        } else {
                            checkboxItem.style.backgroundColor = 'red';
                        }

                        // Update JSON data (replace with your actual implementation)
                        // ...
                    });
                });
            });
    } else {
        alert('Invalid username or password.');
    }
});