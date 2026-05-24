const productContainer = document.querySelector(".cartContainer");

async function apiCall() {

  try {

    const response = await fetch("https://dummyjson.com/products?limit=50");

    const data = await response.json();

    const products = data.products;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log(cart);
    const cartProducts = products.filter(product => cart.includes(String(product.id)))
    cartProducts.forEach(product => {

      // console.log(product);
      productContainer.innerHTML += `
      
        <div class="">

          <img 
  src="${product.thumbnail}" 
  class=" mt-16 my-5 rounded-[5px] bg-gray-200"/>

          <h2 class="text-lg font-medium">${product.title}</h2>

          <p class="text-lg">$${product.price}</p>

          <button onclick="removeFromCart(${product.id})" 
          class=" bg-red-500 text-white  px-16 rounded-[3px] py-3 mt-2" ${product.id}">
            Remove Cart
          </button>

        </div>
       
      `;
    });

  } catch (error) {

    console.log(error);

  }

}

apiCall();

function removeFromCart(id) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // string me convert
  id = String(id);

  const updatedCart = cart.filter(productId => productId !== id);

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  location.reload();

}

