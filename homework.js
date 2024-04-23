"use strict";
const timeStep = 1000;
const animationDelay = 500;
const maxElement = 9;
const middleDot = parseInt(maxElement / 2);
const images = [];

const dotsFrame = document.querySelector(".slider__dots");

const dot = (position) => {
    const element = document.createElement("div");
    element.className = "dot";
    element.setAttribute("data-pos", position);
    if (position === middleDot) {
        element.classList.add("dot_middle");
    }
    return element;
};

let activeFrame = 0;

const frameModulo = (direction) =>
    (((activeFrame + direction) % maxElement) + maxElement) % maxElement;

const arrayAndDotsGenerate = () => {
    for (let index = 0; index < maxElement; index++) {
        images.push(`${index + 1}.jpg`);
        dotsFrame.appendChild(dot(index));
    }
};

arrayAndDotsGenerate();

const frames = 3;

let flag = true;

const slider = document.querySelector(".slider");

const getFrame = (direction) => {
    const currentFrame = frameModulo(direction);
    const sliderFrame = document.createElement("div");
    sliderFrame.className = "slider__frame";
    const imageFrame = document.createElement("div");
    const backgroundImageString = `url(./img/${images[currentFrame]}) center/cover no-repeat`;
    imageFrame.className = "frame";
    imageFrame.style.background = backgroundImageString;
    sliderFrame.appendChild(imageFrame);
    return sliderFrame;
};

const initSlider = () => {
    slider.append(getFrame(0));
    slider.append(getFrame(1));
    slider.prepend(getFrame(-1));
};

function animate({ timing, draw, duration, removeElement }) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        draw(progress); // отрисовать её

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        } else {
            removeElement.remove();
            flag = true;
        }
    });
}

const nextSlide = (direction) => {
    if (!flag) {
        return;
    }
    flag = !flag;
    activeFrame = frameModulo(direction);
    const frameWidth = slider.offsetWidth / frames;
    let currentDiv;

    if (direction === 1) {
        slider.style.justifyContent = "flex-start";
        slider.append(getFrame(direction));
        currentDiv = slider.firstChild;
    }
    if (direction === -1) {
        slider.style.justifyContent = "flex-end";
        slider.prepend(getFrame(direction));
        currentDiv = slider.lastElementChild;
    }

    animate({
        duration: timeStep,
        timing: function (timeFraction) {
            return timeFraction;
        },
        draw: function (progress) {
            currentDiv.style.width = frameWidth * (1 - progress) + "px";
        },
        removeElement: currentDiv,
    });
};

const buttons = document.querySelector(".slider__buttons");
buttons.addEventListener("click", function (event) {
    // Start HERE
    let eventClick = new Event("click");
    elem.dispatchEvent(eventClick);
    if (event.target.classList.contains("btn_left")) {
        console.log("LEFT");
        // nextSlide(-1);
        dotClick(elem, -1);
    }
    if (event.target.classList.contains("btn_right")) {
        console.log("right");
        nextSlide(1);
    }
});

const dotsContainer = document.querySelector(".slider__dots");

function dotClick(event, direction = 0) {
    if (event.target.hasAttribute("data-pos")) {
        dotsContainer.removeEventListener("click", dotClick);
        const currentDot = parseInt(event.target.getAttribute("data-pos"));
        let dotsSteps = currentDot - middleDot;
        // let direction;
        if (dotsSteps !== 0) {
            if (dotsSteps < 0) {
                direction = -1;
                dotsSteps = -dotsSteps;
            } else {
                direction = 1;
            }

            // Animation parameters
            const dotsTransform = [
                { transform: "scale(1.5)", background: "white" },
                { transform: "scale(1)" },
            ];

            const dotTiming = {
                duration: timeStep * 0.5,
                iterations: 1,
            };
            const dotHide = [
                { transform: "scale(1)", background: "none" },
                { transform: "scale(2)", background: "initial", offset: 1 },
            ];
            const dotHideTiming = {
                duration: (timeStep + animationDelay) * (dotsSteps - 1),
                iterations: 1,
            };

            // Middle dot animation
            const middleDotAnimation = dotsContainer.childNodes[
                middleDot
            ].animate(dotHide, dotHideTiming, dotListener);
            middleDotAnimation.onfinish = () => dotListener();

            for (let i = 0; i < dotsSteps; i++) {
                ((index) => {
                    setTimeout(() => {
                        dotsContainer.childNodes[
                            currentDot + index * -direction - 1 * direction
                        ].animate(dotsTransform, dotTiming);
                        nextSlide(direction);
                    }, (timeStep + animationDelay) * index);
                })(i);
            }
        }
    }
}

function dotListener() {
    // console.log("Add listener");
    dotsContainer.addEventListener("click", dotClick);
}

dotListener();

initSlider();
