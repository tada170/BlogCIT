async function fetchPosts() {
    try {
        const response = await fetch('/api/posts');
        const posts = await response.json();
        const postsDiv = document.getElementById('posts');
        postsDiv.innerHTML = '';

        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
            `;
            postsDiv.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Chyba při načítání příspěvků:', error);
    }
}

fetchPosts();
