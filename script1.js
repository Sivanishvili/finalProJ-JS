const firstSection = document.querySelector(".cards").children;
// console.log(firstSection)
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const maxItem = 9;
let index = 1;

prev.addEventListener("click", function () {
  index--;
  showItems();
});
next.addEventListener("click", function () {
  index++;
  showItems();
});

function showItems() {
  for (let i = 0; i < firstSection.length; i++) {
    firstSection[i].classList.remove("show");
    firstSection[i].classList.add("hide");

    if (i >= index * maxItem - maxItem && i < index * maxItem) {
      firstSection[i].classList.add("show");
      firstSection[i].classList.remove("hide");
    }
  }
}

window.onload = showItems();


