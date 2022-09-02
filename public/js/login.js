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
            loggedIn: true;
        } else {
            alert(response.statusText)
        }
    }
};

async function signUp(event) {
    event.preventDefault();

    const email = document.querySelector('#new-email').value.trim();
    const username = document.querySelector('#new-username').value.trim();
    const password = document.querySelector('#new-password').value.trim();

    if (email && username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                email,
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            console.log('Success');
            loggedIn: true;
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('#loginbtn').addEventListener('click', login);
document.querySelector('#signbtn').addEventListener('click', signUp);