"use strict";
// const items = document.querySelector(".carousel-inner");
// console.log(items);
// console.log(items.children.length);
// console.log(items.firstChild);
// const findFirstDiv = (rootDiv) => {
//     const elementDiv = items.querySelector(".carousel-item");
//     return elementDiv;
// };
// console.log(findFirstDiv());
// if (findFirstDiv().hasAttribute("data-example")) {
//     console.log("Has attribute");
// } else {
//     console.log("No attribute");
// }

let currentIndex = 0;
const carouselItems = document.querySelectorAll(".flex-item");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

console.log(carouselItems);

function goToSlide(index) {
    if (index < 0) {
        index = carouselItems.length - 1;
    } else if (index >= carouselItems.length) {
        index = 0;
    }

    currentIndex = index;
    carouselItems[currentIndex].style.transform = `translateX(-${
        currentIndex * 100
    }%)`;
}

function goToPrevSlide() {
    goToSlide(currentIndex - 1);
}

function goToNextSlide() {
    goToSlide(currentIndex + 1);
}

prevBtn.addEventListener("click", () => {
    console.log("left");
    goToPrevSlide();
});

nextBtn.addEventListener("click", () => {
    console.log("right");
    goToNextSlide();
});

// setInterval(goToNextSlide, 3000); // автоматическая прокрутка каждые 3 секунды

// const items = document.querySelectorAll(".carousel .item");
// const dots = document.querySelectorAll(".carousel-indicators li");
// let currentItem = 0;
// let isEnabled = true;

// function changeCurrentItem(n) {
//     currentItem = (n + items.length) % items.length;
// }

// function nextItem(n) {
//     hideItem("to-left");
//     changeCurrentItem(n + 1);
//     showItem("from-right");
// }

// function previousItem(n) {
//     hideItem("to-right");
//     changeCurrentItem(n - 1);
//     showItem("from-left");
// }

// function goToItem(n) {
//     if (n < currentItem) {
//         hideItem("to-right");
//         currentItem = n;
//         showItem("from-left");
//     } else {
//         hideItem("to-left");
//         currentItem = n;
//         showItem("from-right");
//     }
// }

// function hideItem(direction) {
//     isEnabled = false;
//     items[currentItem].classList.add(direction);
//     dots[currentItem].classList.remove("active");
//     items[currentItem].addEventListener("animationend", function () {
//         this.classList.remove("active", direction);
//     });
// }

// function showItem(direction) {
//     items[currentItem].classList.add("next", direction);
//     dots[currentItem].classList.add("active");
//     items[currentItem].addEventListener("animationend", function () {
//         this.classList.remove("next", direction);
//         this.classList.add("active");
//         isEnabled = true;
//     });
// }

// document
//     .querySelector(".carousel-control.left")
//     .addEventListener("click", function () {
//         if (isEnabled) {
//             previousItem(currentItem);
//         }
//     });

// document
//     .querySelector(".carousel-control.right")
//     .addEventListener("click", function () {
//         if (isEnabled) {
//             nextItem(currentItem);
//         }
//     });

// document
//     .querySelector(".carousel-indicators")
//     .addEventListener("click", function (e) {
//         const target = [].slice
//             .call(e.target.parentNode.children)
//             .indexOf(e.target);
//         if (target !== currentItem && target < dots.length) {
//             goToItem(target);
//         }
//     });
