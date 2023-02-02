const bookList = document.querySelector('#book-list');
const bookForm = document.querySelector("#book-form");

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}


//////////////////////////////////////
// Book Form Event Listener
//////////////////////////////////////

bookForm.addEventListener('submit', (e)=> 
{
  e.preventDefault();

})

const newBook=
{
  title:'',
  author:'',
  price:'',
  reivews:[],
  inventory:0,
  imageUrl:'',
}

//form is an html form element
//data is an object w keys corr to input names

function fillIn(form, data) 
{
  form.title.value=data.title;
  form.author.value=data.author;
  form.price.value=data.price;
  form.imageUrl=value=data.imageUrl;
  form.inventory.value=data.inventory;
}

fillIn(bookForm, {
  title: "Designing Data-Intensive applications",
  author: "Martin Kleppmann",
  price: "22",
  imageUrl: "https://m.media-amazon.com/images/I/51ZSpMl1-LL._SX379_BO1,204,203,200_.jpg",
  inventory: 1
})

//////////////////////////////////////
// render functions  (Data => Display)
//////////////////////////////////////

// create a function renderHeader() that takes the store name from bookStore and adds to the DOM
function renderHeader(bookStore) {
  document.querySelector('#store-name').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector('#location').textContent = bookStore.location;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#address').textContent = bookStore.address;
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
  
  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;
  img.title = `${book.title} cover`;
  li.append(img);

  const btn = document.createElement('button');

  btn.addEventListener('click', ()=> 
  {
    li.remove();
  })

  btn.textContent = 'Delete';
  li.append(btn);

  bookList.append(li);
}



////////////////////////////////////////////
// call render functions to populate the DOM
////////////////////////////////////////////

renderHeader(bookStore);
renderFooter(bookStore);
bookStore.inventory.forEach(renderBook);



