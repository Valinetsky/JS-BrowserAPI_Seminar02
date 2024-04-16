"use strict";
const maxElement = 8;
const images = [];
for (let index = 0; index < maxElement; index++) {
    images.push(`${index + 1}.jpg`);
}
console.log(images);

let activeFrame = 0;
const carousel = document.querySelector(".carousel__item");
const carouselOffsetWidth = document.querySelector(".carousel").clientWidth;
const carouselOffsetHeight = document.querySelector(".carousel").clientHeight;
console.log(carouselOffsetWidth);
console.log(carouselOffsetHeight);
carousel.style.width = 3 * carouselOffsetWidth + "px";
carousel.style.height = carouselOffsetHeight + "px";

carousel.style.left = `-${carouselOffsetWidth}px`;
let flag = true;

const frameModulo = (direction) =>
    (((activeFrame + direction) % maxElement) + maxElement) % maxElement;

const getFrame = (direction) => {
    const currentFrame = frameModulo(direction);
    console.log(currentFrame);

    // const img = document.createElement("img");
    // img.alt = "";
    // img.src = "./img/" + images[currentFrame];
    // console.log(img);

    const divElement = document.createElement("div");
    const backgroundImageString = `url(./img/${images[currentFrame]}) center/cover no-repeat`;
    divElement.className = "carousel__element";
    divElement.style.width = carouselOffsetWidth + "px";
    divElement.style.height = carouselOffsetHeight + "px";
    divElement.style.background = backgroundImageString;

    // divElement.appendChild(img);
    return divElement;
};

const initCarousel = () => {
    carousel.append(getFrame(0));
    carousel.append(getFrame(1));
    carousel.prepend(getFrame(-1));
};

const animate = ({ duration, draw, removeElement }) => {
    const start = performance.now();
    requestAnimationFrame(function animate(time) {
        let step = (time - start) / duration;
        if (step > 1) {
            step = 1;
            draw(step);
        }
        if (step < 1) {
            requestAnimationFrame(animate);
        } else {
            removeElement.remove();
        }
    });
};

const nextSlide = (direction) => {
    activeFrame = frameModulo(direction);
    if (direction === 1) {
        // document.querySelector(".carousel__item div").remove();
        carousel.append(getFrame(direction));
        console.log(document.querySelector(".carousel__item div"));
        const currentWidth = document.querySelector(".carousel__item div").style
            .width;
        console.log(currentWidth);
        for (let index = currentWidth; index > 0; index--) {
            document.querySelector(".carousel__item div").style.width -= 1;
            console.log(index);
        }
        // animate({
        //     duration: 1000,
        //     draw: function (progress) {
        //         console.log(progress);
        //         console.log(document.querySelector(".carousel__item div"));
        //         document.querySelector(".carousel__item div").style.width =
        //             carouselOffsetWidth * (1 - progress) + "px";
        //     },
        //     removeElement: document.querySelector(".carousel__item div"),
        // });
    }
    if (direction === -1) {
        // document.querySelector(".carousel__item div:last-child").remove();
        carousel.prepend(getFrame(direction));
        animate({
            duration: 1000,
            draw: function (progress) {
                console.log(
                    document.querySelector(".carousel__item div:last-child")
                );
                document.querySelector(
                    ".carousel__item div:last-child"
                ).style.width = `${carouselOffsetWidth * (1 - progress)}px`;
            },
            removeElement: document.querySelector(
                ".carousel__item div:last-child"
            ),
        });
    }
};

initCarousel();

const buttons = document.querySelector(".carousel__buttons");
buttons.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn_left")) {
        console.log("LEFT");
        nextSlide(-1);
    }
    if (event.target.classList.contains("btn_right")) {
        console.log("right");
        nextSlide(1);
    }
});

// function moveRight() {
//     const elementWidht = getElementWidht();
//     const carouselFlex = getCarouselFlex();
//     const string = `translateX(${elementWidht}px)`;
//     console.log(string);
//     const animation = carouselFlex.animate(
//         [{ transform: "translateX(0)" }, { transform: string }],
//         500
//     );
//     animation.addEventListener("finish", function () {
//         carouselFlex.style.transform = string;
//         let newElement =
//             carouselFlex.firstElementChild.getAttribute("data-index") - 1;
//         console.log(newElement);
//         if (newElement < 1) {
//             newElement = maxElement;
//         }
//         const newDiv = `
// 		<div class="carousel__element" data-index="${newElement}">
//             <img src="img/0${newElement}.jpg" alt="${newElement}" />
//             <p>Описание ${newElement}</p>
//         </div>
// 		`;
//         carouselFlex.removeChild(carouselFlex.lastElementChild);
//         const firstP = carouselFlex.innerHTML;
//         carouselFlex.style.transform = "translateX(0)";
//         carouselFlex.innerHTML = newDiv + firstP;
//     });
// }

// function getElementWidht() {
//     return document.querySelector(".carousel__element").getBoundingClientRect()
//         .width;
// }
// function getCarouselFlex() {
//     return document.querySelector(".carousel__item");
// }
// function Ant(crslId) {
//     let id = document.getElementById(crslId);
//     if (id) {
//         this.crslRoot = id;
//     } else {
//         this.crslRoot = document.querySelector(".ant-carousel");
//     }

//     // Carousel objects
//     this.crslList = this.crslRoot.querySelector(".ant-carousel-list");
//     this.crslElements = this.crslList.querySelectorAll(".ant-carousel-element");
//     this.crslElemFirst = this.crslList.querySelector(".ant-carousel-element");
//     this.leftArrow = this.crslRoot.querySelector("div.ant-carousel-arrow-left");
//     this.rightArrow = this.crslRoot.querySelector(
//         "div.ant-carousel-arrow-right"
//     );
//     this.indicatorDots = this.crslRoot.querySelector("div.ant-carousel-dots");

//     // Initialization
//     this.options = Ant.defaults;
//     Ant.initialize(this);
// }

// Ant.defaults = {
//     // Default options for the carousel
//     elemVisible: 3, // Кол-во отображаемых элементов в карусели
//     loop: true, // Бесконечное зацикливание карусели
//     auto: true, // Автоматическая прокрутка
//     interval: 5000, // Интервал между прокруткой элементов (мс)
//     speed: 750, // Скорость анимации (мс)
//     touch: true, // Прокрутка  прикосновением
//     arrows: true, // Прокрутка стрелками
//     dots: true, // Индикаторные точки
// };

// Ant.prototype.elemPrev = function (num) {
//     num = num || 1;

//     if (this.options.dots) this.dotOn(this.currentElement);
//     this.currentElement -= num;
//     if (this.currentElement < 0) this.currentElement = this.dotsVisible - 1;
//     if (this.options.dots) this.dotOff(this.currentElement);

//     if (!this.options.loop) {
//         // сдвиг вправо без цикла
//         this.currentOffset += this.elemWidth * num;
//         this.crslList.style.marginLeft = this.currentOffset + "px";
//         if (this.currentElement == 0) {
//             this.leftArrow.style.display = "none";
//             this.touchPrev = false;
//         }
//         this.rightArrow.style.display = "block";
//         this.touchNext = true;
//     } else {
//         // сдвиг вправо с циклом
//         let elm,
//             buf,
//             this$ = this;
//         for (let i = 0; i < num; i++) {
//             elm = this.crslList.lastElementChild;
//             buf = elm.cloneNode(true);
//             this.crslList.insertBefore(buf, this.crslList.firstElementChild);
//             this.crslList.removeChild(elm);
//         }
//         this.crslList.style.marginLeft = "-" + this.elemWidth * num + "px";
//         let compStyle = window.getComputedStyle(this.crslList).marginLeft;
//         this.crslList.style.cssText =
//             "transition:margin " + this.options.speed + "ms ease;";
//         this.crslList.style.marginLeft = "0px";
//         setTimeout(function () {
//             this$.crslList.style.cssText = "transition:none;";
//         }, this.options.speed);
//     }
// };

// Ant.prototype.elemNext = function (num) {
//     num = num || 1;

//     if (this.options.dots) this.dotOn(this.currentElement);
//     this.currentElement += num;
//     if (this.currentElement >= this.dotsVisible) this.currentElement = 0;
//     if (this.options.dots) this.dotOff(this.currentElement);

//     if (!this.options.loop) {
//         // сдвиг влево без цикла
//         this.currentOffset -= this.elemWidth * num;
//         this.crslList.style.marginLeft = this.currentOffset + "px";
//         if (this.currentElement == this.dotsVisible - 1) {
//             this.rightArrow.style.display = "none";
//             this.touchNext = false;
//         }
//         this.leftArrow.style.display = "block";
//         this.touchPrev = true;
//     } else {
//         // сдвиг влево с циклом
//         let elm,
//             buf,
//             this$ = this;
//         this.crslList.style.cssText =
//             "transition:margin " + this.options.speed + "ms ease;";
//         this.crslList.style.marginLeft = "-" + this.elemWidth * num + "px";
//         setTimeout(function () {
//             this$.crslList.style.cssText = "transition:none;";
//             for (let i = 0; i < num; i++) {
//                 elm = this$.crslList.firstElementChild;
//                 buf = elm.cloneNode(true);
//                 this$.crslList.appendChild(buf);
//                 this$.crslList.removeChild(elm);
//             }
//             this$.crslList.style.marginLeft = "0px";
//         }, this.options.speed);
//     }
// };

// Ant.prototype.dotOn = function (num) {
//     this.indicatorDotsAll[num].style.cssText =
//         "background-color:#BBB; cursor:pointer;";
// };

// Ant.prototype.dotOff = function (num) {
//     this.indicatorDotsAll[num].style.cssText =
//         "background-color:#556; cursor:default;";
// };

// Ant.initialize = function (that) {
//     // Constants
//     that.elemCount = that.crslElements.length; // Количество элементов
//     that.dotsVisible = that.elemCount; // Число видимых точек
//     let elemStyle = window.getComputedStyle(that.crslElemFirst);
//     that.elemWidth =
//         that.crslElemFirst.offsetWidth + // Ширина элемента (без margin)
//         parseInt(elemStyle.marginLeft) +
//         parseInt(elemStyle.marginRight);

//     // Variables
//     that.currentElement = 0;
//     that.currentOffset = 0;
//     that.touchPrev = true;
//     that.touchNext = true;
//     let xTouch, yTouch, xDiff, yDiff, stTime, mvTime;
//     let bgTime = getTime();

//     // Functions
//     function getTime() {
//         return new Date().getTime();
//     }
//     function setAutoScroll() {
//         that.autoScroll = setInterval(function () {
//             let fnTime = getTime();
//             if (fnTime - bgTime + 10 > that.options.interval) {
//                 bgTime = fnTime;
//                 that.elemNext();
//             }
//         }, that.options.interval);
//     }

//     // Start initialization
//     if (that.elemCount <= that.options.elemVisible) {
//         // Отключить навигацию
//         that.options.auto = false;
//         that.options.touch = false;
//         that.options.arrows = false;
//         that.options.dots = false;
//         that.leftArrow.style.display = "none";
//         that.rightArrow.style.display = "none";
//     }

//     if (!that.options.loop) {
//         // если нет цикла - уточнить количество точек
//         that.dotsVisible = that.elemCount - that.options.elemVisible + 1;
//         that.leftArrow.style.display = "none"; // отключить левую стрелку
//         that.touchPrev = false; // отключить прокрутку прикосновением вправо
//         that.options.auto = false; // отключить автопркрутку
//     } else if (that.options.auto) {
//         // инициализация автопрокруки
//         setAutoScroll();
//         // Остановка прокрутки при наведении мыши на элемент
//         that.crslList.addEventListener(
//             "mouseenter",
//             function () {
//                 clearInterval(that.autoScroll);
//             },
//             false
//         );
//         that.crslList.addEventListener("mouseleave", setAutoScroll, false);
//     }

//     if (that.options.touch) {
//         // инициализация прокрутки прикосновением
//         that.crslList.addEventListener(
//             "touchstart",
//             function (e) {
//                 xTouch = parseInt(e.touches[0].clientX);
//                 yTouch = parseInt(e.touches[0].clientY);
//                 stTime = getTime();
//             },
//             false
//         );
//         that.crslList.addEventListener(
//             "touchmove",
//             function (e) {
//                 if (!xTouch || !yTouch) return;
//                 xDiff = xTouch - parseInt(e.touches[0].clientX);
//                 yDiff = yTouch - parseInt(e.touches[0].clientY);
//                 mvTime = getTime();
//                 if (
//                     Math.abs(xDiff) > 15 &&
//                     Math.abs(xDiff) > Math.abs(yDiff) &&
//                     mvTime - stTime < 75
//                 ) {
//                     stTime = 0;
//                     if (that.touchNext && xDiff > 0) {
//                         bgTime = mvTime;
//                         that.elemNext();
//                     } else if (that.touchPrev && xDiff < 0) {
//                         bgTime = mvTime;
//                         that.elemPrev();
//                     }
//                 }
//             },
//             false
//         );
//     }

//     if (that.options.arrows) {
//         // инициализация стрелок
//         if (!that.options.loop)
//             that.crslList.style.cssText =
//                 "transition:margin " + that.options.speed + "ms ease;";
//         that.leftArrow.addEventListener(
//             "click",
//             function () {
//                 let fnTime = getTime();
//                 if (fnTime - bgTime > that.options.speed) {
//                     bgTime = fnTime;
//                     that.elemPrev();
//                 }
//             },
//             false
//         );
//         that.rightArrow.addEventListener(
//             "click",
//             function () {
//                 let fnTime = getTime();
//                 if (fnTime - bgTime > that.options.speed) {
//                     bgTime = fnTime;
//                     that.elemNext();
//                 }
//             },
//             false
//         );
//     } else {
//         that.leftArrow.style.display = "none";
//         that.rightArrow.style.display = "none";
//     }

//     if (that.options.dots) {
//         // инициализация индикаторных точек
//         let sum = "",
//             diffNum;
//         for (let i = 0; i < that.dotsVisible; i++) {
//             sum += '<span class="ant-dot"></span>';
//         }
//         that.indicatorDots.innerHTML = sum;
//         that.indicatorDotsAll = that.crslRoot.querySelectorAll("span.ant-dot");
//         // Назначаем точкам обработчик события 'click'
//         for (let n = 0; n < that.dotsVisible; n++) {
//             that.indicatorDotsAll[n].addEventListener(
//                 "click",
//                 function () {
//                     diffNum = Math.abs(n - that.currentElement);
//                     if (n < that.currentElement) {
//                         bgTime = getTime();
//                         that.elemPrev(diffNum);
//                     } else if (n > that.currentElement) {
//                         bgTime = getTime();
//                         that.elemNext(diffNum);
//                     }
//                     // Если n == that.currentElement ничего не делаем
//                 },
//                 false
//             );
//         }
//         that.dotOff(0); // точка[0] выключена, остальные включены
//         for (let i = 1; i < that.dotsVisible; i++) {
//             that.dotOn(i);
//         }
//     }
// };

// new Ant();
