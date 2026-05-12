
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
    const products = data2.products.slice(28, 32);
    const review = data2.products.slice(1, 7)
    renderCards(container, products)
    UI(data)
    ProductsReview(review)
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
  rating.innerText = `(${val.rating.toFixed(1)})`
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

  if (count >= 5) return;
  count++;
  number.innerText = count;

})

mins.addEventListener('click', () => {
  if (count <= 0) return;
  count--;
  number.innerText = count;
})

function ProductsReview(data) {
  const reviewContainer = document.querySelector('.reviewContainer')
  data.forEach((el) => {
    const reviewDate = `${el.reviews[2].date}`
    const date = new Date(reviewDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    console.log(date);
    const div = document.createElement('div');
    div.classList.add('reviewClass');
    div.innerHTML = `
     <div class="flex items-center justify-between px-5 py-5">
            <div class="">
              <i class="fa-solid fa-star text-yellow-300"></i>
              <i class="fa-solid fa-star text-yellow-300"></i>
              <i class="fa-solid fa-star text-yellow-300"></i>
              <i class="fa-solid fa-star text-yellow-300"></i>
            </div>
            <div class="flex gap-0.5">
              <div class="h-2 w-2 rounded-full bg-black"></div>
              <div class="h-2 w-2 rounded-full bg-black"></div>
              <div class="h-2 w-2 rounded-full bg-black"></div>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="ratingName flex items-center gap-2 text-2xl font-medium">${el.reviews[0].reviewerName}
              <img src="images/check (1).png" alt="" class="w-6 h-6">
            </h3>
            <p class="ratingDescription">${el.reviews[0].comment}</p>
            <p class="ratingDate mt-16">Posted on ${date}</p>
          </div>
    `
    reviewContainer.append(div)
  })
}
