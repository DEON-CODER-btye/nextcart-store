
const parmas = new URLSearchParams(window.location.search);
const reviewContainer = document.querySelector('.reviewContainer')
const container = document.querySelector('.cardContainer')
const title = document.querySelector('.title')
const discount = document.querySelector('.discount')
const price = document.querySelector('.price')
const description = document.querySelector('.description')
const stock = document.querySelector('.stock')
const rating = document.querySelector('.rating')
const img = document.querySelectorAll('.image')
const image = document.querySelector('.img')
const title1 = document.querySelector('.title1')
const price1 = document.querySelector('.price1')
const rating1 = document.querySelector('.rating1')
const plus = document.querySelector('.plus')
const mins = document.querySelector('.mins')
const number = document.querySelector('.number')
const id = parmas.get('id');
console.log(id);

async function apiCall() {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    const response2 = await fetch('https://dummyjson.com/products?limit=50')

    if (!response.ok) {
      throw new Error("API failed");
    }

    const data = await response.json()
    const data2 = await response2.json()
    console.log(data);
    const products = data2.products.slice(28, 32);
    console.log(products);
    renderCards(container, products)
    UI(data)
  } catch (error) {
    console.log(error);
  }

}
apiCall()



function UI(val) {
  img.forEach((el) => {
    el.src = val.thumbnail

  });

  const discountPrice = Number(val.price - (val.price * val.discountPercentage) / 100);
  title.innerText = val.title
  price.innerText = `$${Math.floor(val.price)}`
  description.innerText = val.description
  stock.innerText = `Stock(${val.stock})`
  rating.innerText = `(${Math.floor(val.rating)}k)`
  discount.innerText = `$${Math.floor(discountPrice)}`

}

function renderCards(container, items) {
  container.innerHTML = "";

  items.forEach(item => {
    container.appendChild(createCard(item));
  });

}


const template = document.querySelector('#cardTemplate');

function createCard(data) {
  const clone = template.content.cloneNode(true);

  clone.querySelector('.img').src = data.thumbnail;
  clone.querySelector('.img').dataset.id = data.id;

  clone.querySelector('.title1').innerText = data.title;
  clone.querySelector('.rating1').innerText = `(${(data.rating.toFixed(1))})`;
  clone.querySelector('.price1').innerText = `$ ${data.price}`

  return clone;
}

container.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const id = e.target.dataset.id;
    console.log(id);
    window.location.href = `product.html?id=${id}`;
  }
})

let count = 0;
number.textContent = count;

plus.addEventListener('click', (e) => {

  if (count >= 2) return;
  count++;
  number.innerText = count;

})

mins.addEventListener('click', () => {
  if (count <= 0) return;
  count--;
  number.innerText = count;
})


