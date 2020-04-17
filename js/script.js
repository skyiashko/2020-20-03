const booksList = document.getElementById('books-list');
let books = [];
const bookInfo = document.getElementById('book-info');

const request = fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter').then(response => response.json());

request.then(response => {
	// console.log(response.items);
	books = response.items;
	setList(books);
});

function setList (books) {
	booksList.innerHTML = '';
	bookInfo.innerHTML = '';
	
	books.forEach((item) => {
		const listItem = document.createElement('a');
		listItem.setAttribute('href', '');
		listItem.classList.add('list-group-item');
		listItem.innerText = item.volumeInfo.title;

		booksList.appendChild(listItem);
	});
}

booksList.addEventListener('click', function(event) {
	event.preventDefault();

	if (!event.target.classList.contains('list-group-item')) return;
	
	const bookName = event.target.innerText;

	let authors;
	const book = books.find((item) => {
		authors = item.volumeInfo.authors.join(', ');
		return item.volumeInfo.title === bookName;
	});
	
	console.log(book);

	bookInfo.innerHTML = `
						<div class="panel panel-info">
							<div class="panel-heading">
								<span>${book.volumeInfo.title} - ${authors} (${book.volumeInfo.publishedDate})</span>
							</div>
							<div class="panel-body">
								<div class="col-xs-3">
									<img src="${book.volumeInfo.imageLinks.smallThumbnail}" width="120px" height="180px">
								</div>
								<div class="col-xs-9">
									<p>${book.searchInfo.textSnippet}</p>
									<div class="text-right">
										<a href="${book.accessInfo.webReaderLink}" target="_blank">Read more</a>
									</div>
								</div>
							</div>
						</div>
	`;
});	