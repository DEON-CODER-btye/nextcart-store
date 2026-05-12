
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
    const reviewPart = data.products.slice(1, 5)
    console.log(reviewPart);



    renderCards(container, firstPart)
    renderCards(containerTwo, secondPart)
    review(reviewPart)


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

function review(val) {
  const reviewContainer = document.querySelector('.reviewContainer')
  const reviewDate = "2025-04-30T09:41:02.053Z"
  const date = new Date(reviewDate).toLocaleDateString("en-IN");
  const time = new Date(reviewDate).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })
  val.forEach((el) => {
    console.log();
    const div = document.createElement('div');
    div.classList.add('reviewClass');
    div.innerHTML = `
          <i class="fa-solid fa-star text-yellow-300"></i>
            <i class="fa-solid fa-star text-yellow-300"></i>
            <i class="fa-solid fa-star text-yellow-300"></i>
            <i class="fa-solid fa-star text-yellow-300"></i>
            <div class="flex gap-2 py-3">
              <h3 class="text-black inline">${el.reviews[0].reviewerName}</h3>
              <img src="images/check (1).png" alt="" class="w-6">
              </div>
              <p class="text-black text-2xl">${el.reviews[0].comment}</p>
              <div class="flex mt-20 justify-between text-lg">
              <h3 class="text-black">${date}</h3>
              <h3 class="text-black">${time}</h3>
              </div>
            <p class="text-black mt-2 text-sm">${el.reviews[0].reviewerEmail}</p>
    `
    reviewContainer.append(div)
  })

}