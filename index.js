// <div id="list-panel">

const url = `http://localhost:3000/books`

const showPEl = document.querySelector('#show-panel')
const ulListEl = document.querySelector('#list')

function getBooks(){
  return fetch(url)
    .then(resp => resp.json())
      .then(booksData => state.books = booksData)
        .then(() => listBooks())

}

const state = {
  books: []
}

const listBook = book => {
  liEl = document.createElement('li')
  liEl.dataset.id = book.id
  liEl.innerHTML = `
  ${book.title}`
  ulListEl.append(liEl)
  liEl.addEventListener('click', clickOnBook)
}

const listBooks = () => {
  state.books.forEach(book => listBook(book))
}

const renderIndBook = book => {
  usersList = book.users.map(user => `<li>${user.username}<li>`).join("")
  showPEl.innerHTML = `
  <h1>${book.title}</h1>
  <p>${book.description}</p>
  <img src=${book.img_url}</img>
  <ul>${usersList}<ul>
  <button data-id=${book.id}>Like</button>
  `
}

const clickOnBook = (event) => {
  bookId = event.target.dataset.id
  theBook = state.books.find(book => book.id == bookId)
  renderIndBook(theBook)

}

showPEl.addEventListener("click", event => {

  user = {
    id: 1,
    username:"sutty"
  }

  bookId = event.target.dataset.id
  theBook = state.books.find(book => book.id == bookId)
  theBook.users.push(user)
  renderIndBook(theBook)
  likeBookDB(theBook)
})

  const likeBookDB = (theBook) => {
    return fetch(`http://localhost:3000/books/${theBook.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(theBook)
    })
  }

getBooks()
