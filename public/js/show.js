// const axios = require('axios');
const likeBtn = document.querySelector('.likeBtn');
const likes = document.querySelector('.likes');
const url = document.URL;
console.log(url.splice(20));
console.log(likes.innerHTML);

const newLike = async () => {
	console.log('liked')
	// const res = await axios({
	// 	method: 'post',
	// 	url: '/posts/:id/',
	// 	data: {
	// 		increment: 1,
	// 		count: likes.innerHTML,
	// 	}
	// });
	// console.log(res);
}

likeBtn.addEventListener('click', newLike);