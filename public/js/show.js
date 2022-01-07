const likeBtn = document.querySelector('.likeBtn');
const likeDis = document.querySelector('.likes');
const id = document.URL.slice(28);
let liked = true

likeBtn.addEventListener('click', async () => {
	if (liked) {
		likeBtn.innerHTML = 'Liked';
		likeDis.innerHTML = parseInt(likeDis.innerHTML) + 1;
	} else {
		likeBtn.innerHTML = 'Like';
		likeDis.innerHTML = parseInt(likeDis.innerHTML) - 1;
	}
	await axios.post(`/posts/${id}`, { liked });
	liked = liked ? false : true;
});