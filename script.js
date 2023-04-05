const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
 
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})
 
function setPage(pageNum) {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("page", pageNum);
  urlParams.set("limit", limit);
  window.history.pushState(null, '', `?${urlParams.toString()}`);
}
 
function getLimit() {
  const urlParams = new URLSearchParams(window.location.search);
  const limit = urlParams.get("limit");
  return Number(limit ?? 9);
}
 
function getPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page");
  return Number(page ?? 1);
}
 
let currentPage = getPage()
const limit = getLimit()
 
/**
 * 
 * @returns { 
 *  products:{
 *    id: number,
 *    title: string,
 *    description: string,
 *    price: number,
 *    discountPercentage: number,
 *    rating: number,
 *    stock: number,
 *    brand: string,
 *    category: string,
 *    thumbnail: string,
 *    images: string[]
 *  }[]
 * total: number,
 * skip: number,
 * limit: number
 * }
 * @param { limit: number, skip: number } options 
 * @returns 
 */
const fetchPosts = async (options = {}) => {
  let { limit, skip } = options;
  limit = limit || 9;
  skip = skip || 0;
 
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const data = await response.json();
  return data;
};
 
 
const drawCard = (cardObj, wrapper) => {
  const card = document.createElement("div");
  card.classList.add("card");
  wrapper.appendChild(card);
 
  // img
  const img = document.createElement("img");
  img.src = cardObj.thumbnail;
  img.classList.add("img");
  card.appendChild(img);
 
  // create title
  const title = document.createElement("div");
  title.classList.add("title");
  title.innerHTML = cardObj.title;
  card.appendChild(title);
 
  // description
  const description = document.createElement("div");
  description.classList.add("description");
  card.appendChild(description);
 
 
 
  // learn 
  // const description2 = document.createElement("div");
  // description2.classList.add("description2");
  // description2.innerHTML = cardObj.description; 
  // card.appendChild(description2);
 
  //svg
  // const img2 = document.createElement("img");
  // img2.src = cardObj.images[0]; 
  // img2.classList.add("img2");
  // card.appendChild(img2);
 
  // name
  // const name = document.createElement("div");
  // name.classList.add("name");
  // name.innerHTML = cardObj.name; /
  // card.appendChild(name);
 
  //date
  // const date = document.createElement("div");
  // date.classList.add("date");
  // date.innerHTML = cardObj.date; 
  // card.appendChild(date);
 
 
 
  //botton --------------------- ??????????
 
  const button = document.createElement("button");
  button.textContent = "Learn More .. ";
  button.classList.add("order_btn");
  card.appendChild(button);
  cards.appendChild(card);
  button.addEventListener("click", async function (c) {
    const result = await fetch(`https://dummyjson.com/products/${cardObj.id}`);
    const product = await result.json()
    console.log(product) // Do something with the product
  });
};
 





async function drawCards() {
  const wrapper = document.getElementById("cards");
  wrapper.innerHTML = "";
  const skip = calculateCurrentSkip(currentPage, limit);
  const result = await fetchPosts({ limit: limit, skip: skip });
  setPage(currentPage)
  for (let cardObj of result.products) {
    drawCard(cardObj, wrapper);
  }
  validatePaginationButtons(result)
}
 
function calculateCurrentSkip(currentPage, limit) {
  if (currentPage === 1) return 0;
  return (currentPage - 1) * limit;
}
 
 
// listen for button click for next page
document.getElementsByClassName("next")[0].addEventListener("click", () => {
  currentPage += 1;
  drawCards(currentPage);
});
 
document.getElementsByClassName("prev")[0].addEventListener("click", () => {
  currentPage -= 1;
  drawCards(currentPage);
});
 
function validatePaginationButtons(result) {
  // disable next button if current page is last page
  const nextPageButton = document.getElementsByClassName("next")[0];
  const prevPageButton = document.getElementsByClassName("prev")[0];
 
  if (currentPage === 1) {
    disableButton(prevPageButton)
  } else {
    enableButton(prevPageButton)
  }
 
  if (result.total === result.skip + result.limit) {
    disableButton(nextPageButton)
  } else {
    enableButton(nextPageButton)
  }
}
 
function disableButton(elem) {
  elem.style.pointerEvents = "none";
}
 
function enableButton(elem) {
  elem.style.pointerEvents = "auto";
}
 
drawCards()