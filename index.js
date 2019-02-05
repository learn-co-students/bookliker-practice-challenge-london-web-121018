const state = {
  users: [],
  books: [],
  selectedBook:  null
}

const body = document.querySelector("body")
const listPanel = document.querySelector("#list-panel")
const showPanel = document.querySelector("#show-panel")




const addBook = book => {
  const bookEl = document.createElement('li')
  bookEl.innerText = book.title
  bookEl.className = "book-list"
  bookEl.dataset.id = book.id
  listPanel.appendChild(bookEl)
}

const addBooks = books => {
  state.books.forEach(book => addBook(book))
}

//listener for book
const bookListener = () => {
  document.addEventListener('click', event =>{
    if (event.target.className === "book-list"){
      const id = parseInt(event.target.dataset.id)
      const foundBook = state.books.find(book => book.id === id)
      state.selectedBook = foundBook
      displayThumbnail()
    }
  })
}

// read listener
const readListener = () => {
  document.addEventListener('click', event =>{
    if (event.target.className === "read-btn"){
          read()
      displayThumbnail()
    }
 })
}

// read book
const read = () => {
  const book = state.selectedBook
  if (state.selectedBook.users.some(user => user.id === (me.id))){
      newBooks = book.users.filter(user => user.id !==  me.id)
      book.users = newBooks
      updateBook(state.selectedBook)
  } else {
    book.users.push(me)
    updateBook(state.selectedBook)
  }
}
// get users
const getUsers = () => {
  const users = state.selectedBook.users
  users.forEach(user => {
    const showUser = document.createElement('h3')
    showUser.innerHTML = user.username
    showPanel.appendChild(showUser)
  })
}
//display thumbnail
const displayThumbnail = () => {
  showPanel.innerHTML = ""
  const showTitle = document.createElement('h1')
  showTitle.innerText = state.selectedBook.title
  showPanel.appendChild(showTitle)
  const showImage = document.createElement('img')
  showImage.src = state.selectedBook.img_url
  showPanel.appendChild(showImage)
  const showDesc = document.createElement('p')
  showDesc.innerText = state.selectedBook.description
  showPanel.appendChild(showDesc)
  const showBtn = document.createElement('button')
  showBtn.className = "read-btn"
  showBtn.innerHTML = "Like"
  showPanel.appendChild(showBtn)
  getUsers()
}

//server
function getBooks () {
  return fetch('http://localhost:3000/books')
    .then(resp => resp.json())
}

function updateBook (book) {
  return fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  }).then(resp => resp.json())
}
function fetchUsers () {
  return fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(resp => me = resp[0])
}


fetchUsers()
.then(users => {
  state.users = users
})

getBooks()
.then(books => {
  state.books = books
  addBooks(state.books)
})
bookListener()
readListener()
