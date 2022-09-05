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
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('#signbtn').addEventListener('click', signUp);