const clockContainer = document.querySelector(".js_clock"),
    clockTitle = clockContainer.querySelector(".js_title");

const form = document.querySelector(".js_form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".greeting");

const USER_LS = "currentUser",
    SHOW_CH = "showing";

const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bg_image");
    body.appendChild(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "오후" : "오전";
    const ch_hours = hours % 12;
    const write_hours = ch_hours ? ch_hours : 12;

    clockTitle.innerHTML = `${ampm} ${write_hours < 10 ? `0${write_hours}` : write_hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(e) {
    e.preventDefault();
    const currentValue = input.value;
    console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askName() {
    form.classList.add(SHOW_CH);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOW_CH);
    greeting.classList.add(SHOW_CH);
    greeting.innerHTML = `hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    setInterval(getTime, 1000);
    loadName();
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();
