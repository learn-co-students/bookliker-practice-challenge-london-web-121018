const booksUrl = 'http://localhost:3000/books'
const usersUrl = 'http://localhost:3000/users'
const listEl = document.querySelector('#list')
const showPanelEl = document.querySelector('#show-panel')

const state = {
    books: [],
    selectedBook: null,
    currentUser: {
      id: 1,
      username: "pouros"
    }
};

//server fetchs////////////////////////////////////////////////////////////

const getBooks = () => {
    return fetch(booksUrl)
    .then(resp => resp.json());
};

const patchBook = () => {
  const book = state.selectedBook
  console.log(book)
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  }).then(jso => console.log(jso));
};

//render pages/////////////////////////////////////////////////////////////
const showLinkBook = (book) => {
    const bookLink = document.createElement('li');

    bookLink.innerText = book.title;
    listEl.appendChild(bookLink);
};

const showBookCard = (book) => {
    const bookDiv = document.createElement('div')

    bookDiv.innerHTML = `<h1>${book.title}</h1>
                       <img src="${book.img_url}">
                       <p>${book.description}</p>
                       <button>Read Book</button>`;
    
    showPanelEl.innerHTML = ''
    showPanelEl.appendChild(bookDiv);
    showBookReaders(book.users)
};

const showBookReaders = (users) => {
    const readersDiv = document.createElement('div');
    const readerList = document.querySelector('.readers')

    readersDiv.className ='readers'
    readersDiv.innerHTML ="<h3>Read by: </h3>";
    users.forEach(user => {
      const userLi = document.createElement('li');
      userLi.innerText = user.username;
      readersDiv.appendChild(userLi);
    });
    if (readerList) {showPanelEl.removeChild(readerList)};
    showPanelEl.appendChild(readersDiv);
};

const renderLinks = () => {
    state.books.forEach(book => {
      showLinkBook(book);
    });
};

const checkUserBook = () => {
  return state.selectedBook.users.includes(state.currentUser);
};

const updateUsersBook = () => {
    if (checkUserBook()) {
      state.selectedBook.users = state.selectedBook.users.filter(user => user !== state.currentUser);
    } else {
      state.selectedBook.users.push(state.currentUser);
      };
      patchBook()
};

const setUser = () => {
    
    const userStatus = document.createElement('p')
    userStatus.innerText = `User: ${state.currentUser.username}`
    listEl.prepend(userStatus);
    // renderLinks()
};

const addListenerListEl = () => {
    listEl.addEventListener('click', event => {
        if (event.target.tagName === 'LI') {
          // debugger
            let book = state.books.find(book => book.title === event.target.innerText)
            state.selectedBook = book
            showBookCard(book)
        };
    });
};

const addListenerShowPanel = () => {
    showPanelEl.addEventListener('click', event => {
      if (event.target.tagName === 'BUTTON') {
          updateUsersBook()
          showBookReaders(state.selectedBook.users)
      };
    });
};

const init = () => {
    getBooks()
      .then((jso) => {
        state.books = jso
        renderLinks()})
    addListenerListEl()
    addListenerShowPanel()
    setUser()
};

init()