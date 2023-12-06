const endpoint = "https://striveschool-api.herokuapp.com/books";

function endpointQuery() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((db) => db.forEach((elem) => generateCards(elem)))
    .then(() => {
      const discardButtons = document.querySelectorAll(
        ".card-body a.btn:last-child"
      );
      discardButtons.forEach((elem) =>
        elem.addEventListener("click", () => {
          elem.closest(".card").classList.add("custom-hidden");
        })
      );
    }).then(() => {
      const buyButtons = document.querySelectorAll('.card-body a:first-of-type')
      buyButtons.forEach(elem => elem.addEventListener('click', addToCart))
    })
    .catch(console.log('there was an error'));
}

function addToCart() {
  const listContainer = document.querySelector('#mySidenav ul')
  const listItem = document.createElement('li')
  const removeButton = document.createElement('button')
  const itemTitle = this.previousElementSibling.previousElementSibling.innerText //card h5
  const itemPrice = this.previousElementSibling.innerText //card p
  removeButton.addEventListener('click', removeFromCart)
  removeButton.innerText = 'Remove'
  

  listItem.innerHTML = `<p>${itemTitle}</p>
  <p>${itemPrice}</p>`
  listContainer.appendChild(listItem)
  listItem.appendChild(removeButton)

}

function removeFromCart() {
  this.closest('li').remove()
}

function generateCards(book) {
  const cardContainer = document.querySelector(".container-lg");

  const cardHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${book.img}" class="card-img-top" alt="Cover of ${book.title}">
    <div class="card-body">
      <h5 class="card-title">${book.title}</h5>
      <p class="card-text">${book.price}</p>
      <a href="#" class="btn btn-primary">Compra</a>
      <a href="#" class="btn btn-primary">Scarta</a>
    </div>
    </div>
    `;

  cardContainer.innerHTML += cardHTML;
}

endpointQuery();

 function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
} 

const showCart = document.querySelector('span')
showCart.addEventListener('mouseover', openNav)
