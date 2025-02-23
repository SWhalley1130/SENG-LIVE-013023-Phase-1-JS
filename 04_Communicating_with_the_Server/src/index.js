const bookList = document.querySelector('#book-list');
const bookForm = document.querySelector('#book-form');
const toggleBookFormButton = document.querySelector('#toggleForm');

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

//////////////////////////////////////
// Communicating with the Server
//////////////////////////////////////
// const request = fetch('http://localhost:3000/books')
// .then((res) => {
//   return res.json();
// })
// .then((data)=>console.log(data));

fetch('http://localhost:3000/books')
.then(res=>res.json())
.then(book=>{
  book.forEach(renderBook)
})

fetch('http://localhost:3000/stores/1')
.then(res=>res.json())
.then(book=>
{
  renderHeader(book);
  renderFooter(book);
})



//////////////////////////////////////
// render functions (DOM Manipulation)
//////////////////////////////////////
function renderHeader(bookStore) {
  document.querySelector('#store-name').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector('#location').textContent = bookStore.store;
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#hours').textContent = bookStore.hours;
}

// function: renderBook(book)
// --------------------------
// accepts a book object as an argument and creates
// an li something like this:
// <li class="list-li">
//   <h3>Eloquent JavaScript</h3>
//   <p>Marjin Haverbeke</p>
//   <p>$10.00</p>
//   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
// </li>
// appends the li to the ul#book-list in the DOM
function renderBook(book) {
    
  const li = document.createElement('li');
  li.className = 'list-li';
  
  const h3 = document.createElement('h3');
  h3.textContent = book.title;
  li.append(h3);

  const pAuthor = document.createElement('p');
  pAuthor.textContent = book.author;
  li.append(pAuthor);
  
  const pPrice = document.createElement('p');
  pPrice.textContent = formatPrice(book.price);
  li.append(pPrice);
  
  const pStock = document.createElement('p');
  pStock.className = "grey";
  if (book.inventory === 0) {
    pStock.textContent = "Out of stock";
  } else if (book.inventory < 3) {
    pStock.textContent = "Only a few left!";
  } else {
    pStock.textContent = "In stock"
  }
  li.append(pStock);
  
  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;
  li.append(img);

  const btn = document.createElement('button');
  btn.textContent = 'Delete';
  li.append(btn);

  btn.addEventListener('click', (e) => {
    li.remove();
  })


  document.querySelector('#book-list').append(li);
}


function toggleBookForm() {
  const isBookFormHidden = bookForm.classList.toggle('collapsed');
  if (isBookFormHidden) {
    toggleBookFormButton.textContent = "New Book";
  } else {
    toggleBookFormButton.textContent = "Hide Book Form";
  }
}

////////////////////////////////////////////////////////////////
// Event Listeners/Handlers (Behavior => Data => Display)
////////////////////////////////////////////////////////////////

// hide and show the new book form when toggle buton is clicked
toggleBookFormButton.addEventListener('click', toggleBookForm);

// also hide the form when it's visible and the escape key is pressed
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const isVisible = !bookForm.classList.contains("collapsed");
    if (isVisible) {
      toggleBookForm();
    }
  }
})

// handle submitting new book form
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newBook = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: parseFloat(e.target.price.value),
    inventory: parseInt(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value,
    reviews: []
  }
  
  e.target.reset(); // clear form
  toggleBookForm(); // hide book form
  renderBook(newBook); // display new book to DOM
})



////////////////////////////////////////////
// call render functions to populate the DOM
////////////////////////////////////////////

// renderHeader(bookStore)
// renderFooter(bookStore)
//bookStore.inventory.forEach(renderBook)



