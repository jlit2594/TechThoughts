async function login(event) {
    event.preventDefault();

    const username = document.querySelector('#old-username').value.trim();
    const password = document.querySelector('#old-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/dashboard/')
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('#loginbtn').addEventListener('click', login);