async function addComment(event) {
    event.preventDefault();

    const commentText = document.querySelector('#comment-text').value.trim();

    if (commentText) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ commentText }),
            headers: {'Content-Type': 'application/json'}
        })

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('#cmt').addEventListener('click', addComment);