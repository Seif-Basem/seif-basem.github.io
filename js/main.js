// title trick
let docTitle = document.title;
window.addEventListener("blur", () => {
    document.title = "Come back :(";
});
window.addEventListener("focus", () => {
    document.title = docTitle;
});

//logo animation
const logo = document.getElementById("logo"),
      images = logo.querySelectorAll("img");
const getActive = () => document.body.dataset.active === "true",
      setActiveTo = active => document.body.dataset.active = active;
const shift = (image, index, rangeX, rangeY) => {
  const active = getActive();
  const translationIntensity = active ? 24 : 4,
        maxTranslation = translationIntensity * (index + 1),
        currentTranslation = `${maxTranslation * rangeX}% ${maxTranslation * rangeY}%`;
  const scale = active ? 1 + (index * 0.4) : 1;
  image.animate({ 
    translate: currentTranslation, 
    scale 
  }, { duration: 750, fill: "forwards", easing: "ease" });
}
const shiftAll = (images, rangeX, rangeY) => 
  images.forEach((image, index) => shift(image, index, rangeX, rangeY));
const shiftLogo = (e, images) => {  
  const rect = logo.getBoundingClientRect(),
        radius = 1000;
  const centerX = rect.left + (rect.width / 2),
        centerY = rect.top + (rect.height / 2);
  const rangeX = (e.clientX - centerX) / radius,
        rangeY = (e.clientY - centerY) / radius;
  shiftAll(images, rangeX, rangeY);
}
const resetLogo = () => {
  setActiveTo(false);
  shiftAll(images, 0.4, -0.7);
}
window.onmousemove = e => shiftLogo(e, images);
document.body.onmouseleave = () => {
  if(!getActive()) resetLogo();
}
window.onmousedown = e => {
  setActiveTo(true);
  shiftLogo(e, images);
}
window.onmouseup = e => resetLogo();
resetLogo();

// work animation
let text = document.querySelector(".sec-text");
let textLoad = () => {
  setTimeout(() => {
    text.textContent = "Front End Developer";
  }, 0);
  setTimeout(() => {
    text.textContent = "Graphic Designer";
  }, 4000);
  setTimeout(() => {
    text.textContent = "Presentations Maker";
  }, 8000);
}
textLoad();
setInterval(textLoad, 12000);

//tabs
let tabs = document.querySelectorAll(".tabs .card");
let tabsArray = Array.from(tabs);
let divs = document.querySelectorAll(".content > div");
let divsArray = Array.from(divs);

tabsArray.forEach((ele) => {
  ele.addEventListener("click", function (e) {
  // console.log(ele);
  tabsArray.forEach((ele) => {
      ele.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
  divsArray.forEach((div) => {
      div.style.display = "none";
  });
  document.querySelector(e.currentTarget.dataset.cont).style.display = "flex";
  });
});

//more btn
let more = document.getElementById("more");
let story = document.getElementById("story");
more.onclick = function(){
  story.classList.toggle("active");
}

//btn-top
let btnTop = document.querySelector(".btn-top");
window.onscroll = function () {
  // console.log(this.scrollY);
    if (this.scrollY >= 1000) {
      btnTop.classList.add("show");
    } else {
      btnTop.classList.remove("show");
    }
};


//loading
// var loader = document.getElementById("preloader");
// window.addEventListener("load", function(){
//     loader.style.display = "none";
// });

AOS.init({
  duration: 1200
});