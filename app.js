const main = document.querySelector("main");
const textBox = document.querySelector(".text-reader");
const voicesSelect = document.getElementById("language");
const textArea = document.getElementById("text");
const form = document.getElementById("custom-text-form");
const toggleBtn = document.getElementById("toggle");
const readBtn = document.getElementById("read-btn");
const defaultBtn = document.getElementById("default-voice");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];


let message = new SpeechSynthesisUtterance();
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
    if (voice.default) {
      message.voice = voice;
    }
  });
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
  console.log(message.voice);
}

function setDefaultVoice(e) {
  message.voice = voices.find((voice) => voice.lang === "en-US");
}

function setText(text) {
  message.text = text;
}

function speak() {
  speechSynthesis.speak(message);
}

function createBox(item) {
  const { image, text } = item;
  const box = document.createElement("div");
  box.className = "box";
  box.innerHTML = `
    <img src="${image}" alt="${text}">
    <p class="info">${text}</p>
    `;
  main.appendChild(box);
}

function setUI() {
  data.forEach(createBox);
  getVoices();
}

setUI();

speechSynthesis.addEventListener("voiceschanged", getVoices);
voicesSelect.addEventListener("change", setVoice);
toggleBtn.addEventListener("click", () => textBox.classList.toggle("show"));
closeBtn.addEventListener("click", () => textBox.classList.remove("show"));
defaultBtn.addEventListener("click", setDefaultVoice);

form.addEventListener("submit", (e) => {
  setText(textArea.value);
  speak();
  e.preventDefault();
});

main.addEventListener("click", (e) => {
  const box = e.target.parentElement;
  if (box.className.includes("box")) {
    const text = box.lastElementChild.innerText;
    setText(text);
    speak();
    box.classList.add('active')
    setTimeout(()=>box.classList.remove('active'), 500)
  }
});
