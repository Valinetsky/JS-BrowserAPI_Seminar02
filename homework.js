"use strict";
const maxElement = 8;
const images = [];
for (let index = 0; index < maxElement; index++) {
    images.push(`${index + 1}.jpg`);
}
console.log(images);

let activeFrame = 0;

const frames = 3;

let flag = true;

const slider = document.querySelector(".slider");

const frameModulo = (direction) =>
    (((activeFrame + direction) % maxElement) + maxElement) % maxElement;

const getFrame = (direction) => {
    const currentFrame = frameModulo(direction);

    const sliderFrame = document.createElement("div");
    sliderFrame.className = "slider__frame";

    const imageFrame = document.createElement("div");
    const backgroundImageString = `url(./img/${images[currentFrame]}) center/cover no-repeat`;
    imageFrame.className = "frame";

    imageFrame.style.background = backgroundImageString;
    console.log(imageFrame);

    sliderFrame.appendChild(imageFrame);
    console.log(sliderFrame);
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
        }
    });
}

const nextSlide = (direction) => {
    activeFrame = frameModulo(direction);

    if (direction === 1) {
        slider.style.justifyContent = "flex-start";
        console.log(`slider before ${slider}`);
        slider.append(getFrame(direction));
        console.log(`slider after ${slider}`);

        const currentDiv = slider.firstChild;
        const frameWidth = slider.offsetWidth / frames;

        animate({
            duration: 1000,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: function (progress) {
                // console.log(currentDiv);
                currentDiv.style.width = frameWidth * (1 - progress) + "px";
            },
            removeElement: currentDiv,
        });
    }
    if (direction === -1) {
        slider.style.justifyContent = "flex-end";
        console.log(`slider before ${slider}`);
        slider.prepend(getFrame(direction));
        console.log(`slider after ${slider}`);
        const currentDiv = slider.lastElementChild;
        console.log(currentDiv);
        const frameWidth = slider.offsetWidth / frames;

        animate({
            duration: 1000,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: function (progress) {
                currentDiv.style.width = frameWidth * (1 - progress) + "px";
            },
            removeElement: currentDiv,
        });
    }
    // slider.style.justifyContent = "center";
};

initSlider();

const buttons = document.querySelector(".slider__buttons");
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
