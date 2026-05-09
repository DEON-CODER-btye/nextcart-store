
const container = document.querySelector('.container');
const containerTwo = document.querySelector('.containerTwo');


async function apiCall() {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=50')

    if (!response.ok) {
      throw new Error('API error:' + response.status)
    }
    const data = await response.json()
    const firstPart = data.products.slice(34, 42)
    const secondPart = data.products.slice(42, 50)



    renderCards(container, firstPart)
    renderCards(containerTwo, secondPart)


  } catch (error) {
    console.error(error);
  }
}

apiCall()

function renderCards(container, items) {
  container.innerHTML = "";

  items.forEach(item => {
    container.appendChild(createCard(item));
  });

}

const template = document.querySelector('#cardTemplate');

function createCard(data) {
  const clone = template.content.cloneNode(true);

  clone.querySelector('img').src = data.thumbnail;
  clone.querySelector('img').dataset.id = data.id;

  clone.querySelector('.title').innerText = data.title;
  clone.querySelector('.rating').innerText = data.rating;
  clone.querySelector('.price').innerText = `$ ${data.price}`;

  return clone;
}



function goToProduct(id) {
  window.location.href = `product.html?id=${id}`
}

const carts = document.querySelector('.container');
carts.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const id = e.target.dataset.id;
    goToProduct(id);
  }
})

const cartsTwo = document.querySelector('.containerTwo');
cartsTwo.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const id = e.target.dataset.id;
    goToProduct(id);
  }
})

// function reviews() {
//   const
// }