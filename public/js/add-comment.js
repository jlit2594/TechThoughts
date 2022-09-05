async function addComment(event) {
    event.preventDefault();

    const comment_text = document.querySelector('#comment-text').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(comment_text, post_id)

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: {'Content-Type': 'application/json'}
        })

        if (response.ok) {
            console.log(response);
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('#cmt').addEventListener('click', addComment);