document.addEventListener("DOMContentLoaded", function () { });
const bookList = document.getElementById("list")
const showBook = document.getElementById("show-panel")
const currentUser = { "id": 1, "username": "pouros" }

const state = {
  books: [],
  selectedBook: null,
  user: currentUser,
}

function addBooks(books) {
  bookList.innerHTML = ''
  //debugger
  books.forEach(book => addBook(book))
}

function addBook(book) {
  const bookLink = document.createElement('li')
  bookLink.className = "book"
  bookLink.innerText = book.title
  bookLink.addEventListener('click', () => displayBook(book))
  bookList.append(bookLink)
}

function displayBook(book) {
  state.selectedBook = book
  showBook.innerText = ''
  const bookDisplay = document.createElement('span')
  const likeButton = document.createElement('button')
  const unlikeButton = document.createElement('button')
  const hideUsers = document.createElement('button')
  hideUsers.innerText = "Hide Users"
  hideUsers.addEventListener('click', () => {
    let userList = document.getElementsByClassName("user")
    for (user of userList) {
      user.style = "display:none"
    }
  })
  likeButton.innerText = "Like this book!"
  unlikeButton.innerText = "Unlike this book!"
  likeButton.className = "user"
  unlikeButton.className = "user"
  likeButton.addEventListener('click', () => likeBook(book, state.user))
  unlikeButton.addEventListener('click', () => unlikeBook(book, state.user))
  bookDisplay.innerHTML = `<h2>${book.title}</h2><img src=${book.img_url}><br><b>Description</b>: ${book.description}`

  bookDisplay.innerHTML += `<h3 class="user"> Users who like this book</h3>`
  book.users.forEach(user => {
    bookDisplay.innerHTML += `<span class="user">User: ${user.username}<br></span>`
  })

  bookDisplay.append(likeButton)
  bookDisplay.append(unlikeButton)
  showBook.append(bookDisplay)
  bookDisplay.append(hideUsers)
}

function likeBook(book, user) {
  book.users.push(user)
  updateBook(book)
  displayBook(book)
}

function unlikeBook(book, user) {
  book.users = book.users.filter(function (value, index, arr) { return value != user })
  updateBook(book)
  displayBook(book)
}


// Server Stuff

function getBooks() {
  return fetch("http://localhost:3000/books").then(resp => resp.json())
}

function updateBook(book) {
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PATCH",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  }).then(resp => console.log(resp))
}

function initialize() {
  getBooks()
    .then(books => {
      state.books = books
      addBooks(state.books)
    })
}

initialize()




