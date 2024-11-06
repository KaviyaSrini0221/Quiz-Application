document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('form');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form submission
        let isValid = true;

        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value.trim();
        const email = document.getElementById('email').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Check if all fields are filled
        if (!name || !age || !email || !username || !password || !confirmPassword) {
            alert("Please fill out all fields.");
            isValid = false;
        }

        // Validate name to only contain alphabets
        if (!/^[A-Za-z\s]+$/.test(name)) {
            alert("Name can contain only alphabets and spaces.");
            isValid = false;
        }

        // Validate age as a positive number
        const ageNumber = parseInt(age, 10);
        if (isNaN(ageNumber) || ageNumber <= 0) {
            alert("Please enter a valid age.");
            isValid = false;
        }

        // Validate email format
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            alert("Invalid email address.");
            isValid = false;
        }

        // Validate username as alphanumeric
        if (!/^[A-Za-z0-9]+$/.test(username)) {
            alert("Username can contain only alphanumeric characters.");
            isValid = false;
        }

        // Validate password with specified characters and length
        if (!/^[A-Za-z0-9\-_\$@]{6,15}$/.test(password)) {
            alert("Password must contain 6-15 characters and may include alphabets, numbers, and special characters (-, _, $, @).");
            isValid = false;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            isValid = false;
        }

        // Redirect if valid
        if (isValid) {
            // Here, log data or perform actions before redirecting
            console.log('User Data:', { name, age: ageNumber, email, username, password });
            window.location.href = 'SignIn.html';  // Redirect to SignIn page
        }

        return isValid;
    });
});
