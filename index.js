document.addEventListener("DOMContentLoaded", function() {});

const listPanel = document.getElementById('list-panel');
const showPanel = document.getElementById('show-panel');

const browsingUser = {"id":1, "username":"pouros"}

let books;
//create listPanel
function addBook(title, id){
    let li = document.createElement('li');
    li.dataset.id = id;
    li.innerText = title;
    listPanel.appendChild(li);
}
function addBooks(bookList){
    for(const book of bookList){
        addBook(book.title, book.id);
    }
}

//listpanel listener for specified book
function specificBook(){
    listPanel.addEventListener('click', e =>{ 
        getBookByID(e.target.dataset.id)}
        );
}

//Create show panel
function showBook(book){
    let li = document.createElement('li');
    showPanel.innerHTML= `
        <h3> ${book.title} </h3>
        <img src="${book.img_url}">
        <p>${book.description}</p>
        <button id= '${book.id}'> Read book </button>`;
    
    for(const user of book.users){
        showPanel.innerHTML +=`<li>${user.username}</li>`
    }
    const likeBtn = showPanel.querySelector('button')
    likeBtn.addEventListener('click', e=> {
        updateShowBook(books[e.target.id - 1]);
    })
}

//Update show panel, check whether user liked page
function updateShowBook(book){
    if(book.users.find(user => user.id ===1)){
        book.users.pop()
    }else{
        book.users.push(browsingUser);
    }
    showBook(book);
    updateBook(book);
}

//FIRE THE ENGINES BOIS
function initialize(){
    getBooks()
    .then(allBooks =>
        {books = allBooks
        addBooks(books)});
    
    specificBook();  
}

//server
function getBooks(){
    return fetch('http://localhost:3000/books/')
    .then(resp => resp.json());
}
function getBookByID(id){
    return fetch(`http://localhost:3000/books/${id}`)
    .then(resp => resp.json())
    .then(book => showBook(book));
}
function updateBook(book){
    return fetch(`http://localhost:3000/books/${book.id}`,{
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
    }).then(resp => resp.json())
}   
initialize()