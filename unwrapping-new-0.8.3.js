class GiftUnwrapping {

    containerDiv;
    elems;
    pauseButton;
    imagesName = [
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/background-pattern@2x.jpg",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/box-dustbag.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/box-empty.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/box-tissue.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/envelope-back.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/envelope-front.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/envelope-top-reverse.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/envelope-top.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/exit-icon@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/gift@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/letter-part-down-2@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/letter-up-open@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/letter.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/lid.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/pause-icon@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/play-icon@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/restart-icon@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/mobile/dust-bag@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/mobile/tissue-paper@2x.png"
    ]
    images;

    replaceBrand(inputString, brand) {
        let replaceThis = "brand";
        let re = new RegExp(`\\b${replaceThis}\\b`, 'gi');
        return inputString.replace(re, brand);
    }

    preLoad(brandName) {
        var _this = this;
        this.imagesName.forEach(imageName => {
            const img = new Image();
            img.src = _this.replaceBrand(imageName, brandName);
        })
    }

    initialize(brandName, message, enjoyTheGiftString, containerDiv) {
        this.preLoad(brandName);
        this.buildAnimation(brandName, message, enjoyTheGiftString, containerDiv);
    }

    buildAnimation(brandName, message, enjoyTheGiftString, containerDiv, giftUrl) {
        this.containerDiv = containerDiv;
        var sourcePath =  'https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/';
        var sourceAssetPath = sourcePath + 'assets/';
        var sourceBrandizedAssetPath = sourceAssetPath + brandName;
        var sourceBrandizedPath = sourcePath + brandName;

        if (!giftUrl) {
            giftUrl = sourceBrandizedAssetPath +  "/desktop/gift@2x.png"
        }

        const head  = document.getElementsByTagName("head")[0];
        const cssLink  = document.createElement("link");
        cssLink.rel  = "stylesheet";
        cssLink.type = "text/css";
        cssLink.href = sourceBrandizedPath + "-gift-unwrapping-0.8.2.css";
        head.appendChild(cssLink);

        //loader
        const loader = document.createElement("img");
        loader.id = "loader";
        loader.src = sourceAssetPath+ "loader.svg";
        containerDiv.appendChild(loader);

        //restart button
        const restartButton = document.createElement("button");
        restartButton.id = "restart-button";
        restartButton.onclick = () => this.restartAnimation();
        const restartButtonImg = document.createElement("img");
        restartButtonImg.src = sourceBrandizedAssetPath + "/desktop/restart-icon@2x.png";
        restartButton.appendChild(restartButtonImg);
        containerDiv.appendChild(restartButton);

        //pause button
        const pauseButton = document.createElement("button");
        pauseButton.id = "pause-button";
        pauseButton.onclick = () => this.toggleAnimation();
        const pauseButtonImg = document.createElement("img");
        pauseButtonImg.src = sourceBrandizedAssetPath+ "/desktop/pause-icon@2x.png";
        pauseButton.appendChild(pauseButtonImg);
        containerDiv.appendChild(pauseButton);

        //exit button
//        const exitButton = document.createElement("button");
//        exitButton.id = "exit-button";
//        exitButton.onclick = () => this.exitAnimation();
//        const exitButtonImg = document.createElement("img");
//        exitButtonImg.src = sourceBrandizedAssetPath+ "/desktop/exit-icon@2x.png";
//        exitButton.appendChild(exitButtonImg);
//        containerDiv.appendChild(exitButton);

        //gift box cover
        const elemGiftBoxCover = document.createElement("div");
        elemGiftBoxCover.id = "elem-gift-box-cover";
        containerDiv.appendChild(elemGiftBoxCover);

        //gift box empty
        const elemGiftBoxEmpty = document.createElement("div");
        elemGiftBoxEmpty.id = "elem-gift-box-empty";
        elemGiftBoxEmpty.classList.add("elem-gift-boxes");
        const elemGiftBoxEmptyTitle = document.createElement("h4");
        elemGiftBoxEmptyTitle.id = "elem-gift-box-empty-title";
        elemGiftBoxEmptyTitle.textContent = enjoyTheGiftString;
        const elemGiftBoxEmptyImg = document.createElement("img");
        elemGiftBoxEmptyImg.id = "elem-gift-box-empty-img";
        elemGiftBoxEmptyImg.src = giftUrl;
        elemGiftBoxEmpty.appendChild(elemGiftBoxEmptyTitle);
        elemGiftBoxEmpty.appendChild(elemGiftBoxEmptyImg);
        this.containerDiv.appendChild(elemGiftBoxEmpty);

        //gift box dust bag
        const elemGiftBoxDustBag = document.createElement("div");
        elemGiftBoxDustBag.id = "elem-gift-box-dust-bag";
        elemGiftBoxDustBag.classList.add("elem-gift-boxes");
        this.containerDiv.appendChild(elemGiftBoxDustBag);

        //gift box tissue paper
        const elemGiftBoxTissuePaper = document.createElement("div");
        elemGiftBoxTissuePaper.id = "elem-gift-box-tissue-paper";
        elemGiftBoxTissuePaper.classList.add("elem-gift-boxes");
        //envelope
        const elemEnvelope = document.createElement("div");
        elemEnvelope.id = "elem-envelope";
        //envelope front
        const elemEnvelopeFront = document.createElement("img");
        elemEnvelopeFront.id = "elem-envelope-front";
        elemEnvelopeFront.src = sourceBrandizedAssetPath + "/desktop/envelope-front.png";
        elemEnvelope.appendChild(elemEnvelopeFront);
        //envelope back
        const elemEnvelopeBack = document.createElement("img");
        elemEnvelopeBack.id = "elem-envelope-back";
        elemEnvelopeBack.src = sourceBrandizedAssetPath + "/desktop/envelope-back.png";
        elemEnvelope.appendChild(elemEnvelopeBack);
        //elem letter
        const elemLetter = document.createElement("div");
        elemLetter.id = "elem-letter";
        const elemLetterP = document.createElement("p");
        elemLetterP.innerHTML = message;
        elemLetter.appendChild(elemLetterP);
        elemEnvelope.appendChild(elemLetter);
        //envelope top 2
        const elemEnvelopeTop2 = document.createElement("img");
        elemEnvelopeTop2.id = "elem-envelope-top-2";
        elemEnvelopeTop2.src = sourceBrandizedAssetPath + "/desktop/envelope-top.png";
        elemEnvelope.appendChild(elemEnvelopeTop2);
        //envelope top 1
        const elemEnvelopeTop1 = document.createElement("img");
        elemEnvelopeTop1.id = "elem-envelope-top-1";
        elemEnvelope.appendChild(elemEnvelopeTop1);

        elemGiftBoxTissuePaper.appendChild(elemEnvelope);
        this.containerDiv.appendChild(elemGiftBoxTissuePaper);

        this.elems = [
            document.getElementById("loader"),
            document.getElementById("restart-button"),
            document.getElementById("pause-button"),
            document.getElementById("elem-intro-text"),
            document.getElementById("elem-gift-box-empty"),
            document.getElementById("elem-gift-box-empty-title"),
            document.getElementById("elem-gift-box-empty-img"),
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

        this.pauseButton = document.getElementById("pause-button");

        this.elems.forEach(elem => {
            if (elem)
                elem.style.visibility = 'hidden'
        });

    }

    start() {

      this.elems.forEach(elem => {
          if (elem)
              elem.style.visibility = 'visible'
      });
      this.startAnimation();
    }

    toggleAnimation() {
        this.pauseButton.classList.toggle("pressed");
        this.elems.forEach(elem => {
            if (elem) {
                elem.classList.toggle("animation-paused");
            }
        });
    }

    exitAnimation() {
        //inserire quello che si vuole
    }

    restartAnimation() {
        this.resetAnimation();
        setTimeout(() => {
            this.startAnimation()
        }, 500);
    }

    startAnimation() {
        this.elems.forEach(elem => {
            if (elem) {
                elem.classList.add("animate");
            }
        });
    }

    resetAnimation() {
        this.elems.forEach(elem => {
            if (elem)
                elem.classList.remove("animate");
        });
    }
}

/*
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
*/
