const elems = [
    document.getElementById("restart-button"),
    document.getElementById("pause-button"),
    document.getElementById("elem-intro-text"),
    document.getElementById("elem-gift-box-empty"),
    document.getElementById("elem-gift-box-empty-title"),
    document.getElementById("elem-gift-box-empty-img"),
    document.getElementById("elem-gift-box-letter"),
    document.getElementById("elem-gift-box-tissue-paper"),
    document.getElementById("elem-gift-box-dust-bag"),
    document.getElementById("elem-gift-box-cover"),
    document.getElementById("elem-tissue-paper"),
    document.getElementById("elem-dust-bag"),
    document.getElementById("elem-envelope"),
    document.getElementById("elem-envelope-top-1"),
    document.getElementById("elem-envelope-top-2"),
    document.getElementById("elem-envelope-back"),
    document.getElementById("elem-envelope-front"),
    document.getElementById("elem-letter"),
    document.getElementById("elem-letter-text"),
    document.getElementById("elem-box"),
    document.getElementById("elem-gift")
];
const pauseButton = document.getElementById("pause-button");


elems.forEach(elem => {
    if (elem)
        elem.style.visibility = 'hidden'
});

window.addEventListener('load', (event) => {

    elems.forEach(elem => {
        if (elem)
            elem.style.visibility = 'visible'
    });

    start();
});


explode();

function start() {    
    elems.forEach(elem => {
        if (elem) {
            elem.classList.add("animate");
        }
    });
}

function toggleAnimation() {
    pauseButton.classList.toggle("pressed");
    elems.forEach(elem => {
        if (elem) {
            elem.classList.toggle("animation-paused");
        }
    });
}

function exitAnimation() {
    //inserire quello che si vuole
}

function restartAnimation() {
    reset();
    setTimeout(() => {
        start()
    }, 500);
}

function reset() {
    elems.forEach(elem => {
        if (elem)
            elem.classList.remove("animate");
    });    
}
  
function explode() {

    const explosion = document.getElementById("explosion");

    var particles = 1000;
  
    for (var i = 0; i < particles; i++) {
        let x = 0, //(explosion.style.width / 2) + rand(80, 150) * Math.cos(2 * Math.PI * i / rand(particles - 10, particles + 10));
        y = 0, //(explosion.style.height / 2) + rand(80, 150) * Math.sin(2 * Math.PI * i / rand(particles - 10, particles + 10)),
        color = 'red' ;
        particle = document.createElement('div');

        particle.classList.add("particle"); 
        particle.style.backgroundColor = rand(0, 2) == 0 ? '#72733A' : 'white';
        particle.style.top = rand(0, 300) + 'px';
        particle.style.left = rand(0, 600) + 'px';
  
        explosion.append(particle);
    }
  }
  
  // get random number between min and max value
  function rand(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
  }