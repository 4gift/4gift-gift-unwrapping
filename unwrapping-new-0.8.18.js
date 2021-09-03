class GiftUnwrapping {

    delayBeforeStarting = 2;    
    animationDurations = {
        "giftBoxSlideLeftAnimationDuration": 5, //overall duration (in seconds) of the slide-left animation made by the box at the beginning
        "envelopeEnlargingAnimationDuration": 3, //overall duration (in seconds) of the zoom-in animation made by the envelope
        "envelopeSlideLeftAnimationDuration": 3, //overall duration (in seconds) of the slide-left animation made by the envelope when leaving the screen
        "envelopeOpeningAnimationDuration": 1.5, //overall duration (in seconds) of the opening animation of the envelope
        "letterSlideUpAnimationDuration": 1.5, //overall duration (in seconds) of the slide-up animation made by the paper letter inside the envelope
        "messageShowingAnimationDuration": 8, //overall period of time (in seconds) on-screen for each message on the letter
        "tissuePaperDisappearAnimationDuration": 1, //overall duration (in seconds) of the disappearing animation made by the tissue paper
        "dustBagDisappearAnimationDuration": 1, //overall duration (in seconds) of the disappearing animation made by the dust bag
        "giftSlideDownAnimationDuration": 2, //overall duration (in seconds) of the slide-down animation made by the gift at the end
        "finalTextAppearingAnimationDuration": 1 //overall duration (in seconds) of the disappearing animation made by the text at the end
    }

    containerDiv;
    elems = [];
    letterMessages = [];
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
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/letter-part-down-2@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/letter-up-open@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/letter.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/lid.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/pause-icon@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/play-icon@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/desktop/restart-icon@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/mobile/dust-bag@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/brand/mobile/tissue-paper@2x.png",
        "https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/assets/powered_by_4gift_white.svg"
    ]
    images = [];
    loadedImages;
    loader;

    replaceBrand(inputString, brand) {
        let replaceThis = "brand";
        let re = new RegExp(`\\b${replaceThis}\\b`, 'gi');
        return inputString.replace(re, brand);
    }

    preLoad(brandName) { 
        var _this = this;
        _this.loadedImages = 0;
        this.imagesName.forEach(imageName => {
            const img = new Image();
            img.src = _this.replaceBrand(imageName, brandName);
            _this.images.push(img);
            img.onload = (ev) => {
                _this.loadedImages++;
                if (_this.loadedImages >= _this.imagesName.length) {
                    _this.loader.style.display = 'none';
                }
            };
        })
    }

    initialize(brandName, messages, containerDiv, giftUrl) {
        this.buildAnimation(brandName, messages, containerDiv, giftUrl);
        this.preLoad(brandName);
    }

    buildAnimation(brandName, messages, containerDiv, giftUrl) {
        this.containerDiv = containerDiv;
        var sourcePath = 'https://cdn.jsdelivr.net/gh/4gift/4gift-gift-unwrapping/';
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
        cssLink.href = sourceBrandizedPath + "-gift-unwrapping-0.8.12.min.css";
        head.appendChild(cssLink);

        //loader
        const loader = document.createElement("img");
        loader.id = "loader";
        loader.src = sourceAssetPath+ "loader.svg";
        containerDiv.appendChild(loader);
        this.elems.push(loader);
        this.loader = loader;

        //restart button
        const restartButton = document.createElement("button");
        restartButton.id = "restart-button";
        restartButton.onclick = () => this.restartAnimation();
        const restartButtonImg = document.createElement("img");
        restartButtonImg.src = sourceBrandizedAssetPath + "/desktop/restart-icon@2x.png";
        restartButton.appendChild(restartButtonImg);
        containerDiv.appendChild(restartButton);
        this.elems.push(restartButton);

        //pause button
        const pauseButton = document.createElement("button");
        pauseButton.id = "pause-button";
        pauseButton.onclick = () => this.toggleAnimation();
        const pauseButtonImg = document.createElement("img");
        pauseButtonImg.src = sourceBrandizedAssetPath+ "/desktop/pause-icon@2x.png";
        pauseButton.appendChild(pauseButtonImg);
        containerDiv.appendChild(pauseButton);
        this.elems.push(pauseButton);
        this.pauseButton = pauseButton;

        //exit button
//        const exitButton = document.createElement("button");
//        exitButton.id = "exit-button";
//        exitButton.onclick = () => this.exitAnimation();
//        const exitButtonImg = document.createElement("img");
//        exitButtonImg.src = sourceBrandizedAssetPath+ "/desktop/exit-icon@2x.png";
//        exitButton.appendChild(exitButtonImg);
//        containerDiv.appendChild(exitButton);

        //powered by 4gifters logo
        const poweredBy4GiftersLogo = document.createElement("img");
        poweredBy4GiftersLogo.src = sourceAssetPath + "powered_by_4gift_white.svg";
        poweredBy4GiftersLogo.id = "powered-by-4Gifters-logo";
        containerDiv.appendChild(poweredBy4GiftersLogo);

        //gift box cover
        const elemGiftBoxCover = document.createElement("div");
        elemGiftBoxCover.id = "elem-gift-box-cover";
        containerDiv.appendChild(elemGiftBoxCover);
        this.elems.push(elemGiftBoxCover);

        //gift box empty
        const elemGiftBoxEmpty = document.createElement("div");
        elemGiftBoxEmpty.id = "elem-gift-box-empty";
        elemGiftBoxEmpty.classList.add("elem-gift-boxes");
        //const elemGiftBoxEmptyTitle = document.createElement("h4");
        //elemGiftBoxEmptyTitle.id = "elem-gift-box-empty-title";
        //elemGiftBoxEmptyTitle.textContent = enjoyTheGiftString;
        const elemGiftBoxEmptyImg = document.createElement("img");
        elemGiftBoxEmptyImg.id = "elem-gift-box-empty-img";
        elemGiftBoxEmptyImg.src = giftUrl;
        //elemGiftBoxEmpty.appendChild(elemGiftBoxEmptyTitle);
        //this.elems.push(elemGiftBoxEmptyTitle);
        elemGiftBoxEmpty.appendChild(elemGiftBoxEmptyImg);
        //this.elems.push(elemGiftBoxEmptyImg);
        this.containerDiv.appendChild(elemGiftBoxEmpty);
        this.elems.push(elemGiftBoxEmpty);

        //gift box dust bag
        const elemGiftBoxDustBag = document.createElement("div");
        elemGiftBoxDustBag.id = "elem-gift-box-dust-bag";
        elemGiftBoxDustBag.classList.add("elem-gift-boxes");
        this.containerDiv.appendChild(elemGiftBoxDustBag);
        this.elems.push(elemGiftBoxDustBag);

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
        this.elems.push(elemEnvelopeFront);
        //envelope back
        const elemEnvelopeBack = document.createElement("img");
        elemEnvelopeBack.id = "elem-envelope-back";
        elemEnvelopeBack.src = sourceBrandizedAssetPath + "/desktop/envelope-back.png";
        elemEnvelope.appendChild(elemEnvelopeBack);
        this.elems.push(elemEnvelopeBack);
        //elem letter
        const elemLetter = document.createElement("div");
        elemLetter.id = "elem-letter";
        
        messages.forEach(message => {
            const elemLetterP = document.createElement("p");
            elemLetterP.innerHTML = message;
            elemLetter.appendChild(elemLetterP);
            this.letterMessages.push(elemLetterP);
            this.elems.push(elemLetterP);
        });

        elemEnvelope.appendChild(elemLetter);
        this.elems.push(elemLetter);
        //envelope top 2
        const elemEnvelopeTop2 = document.createElement("img");
        elemEnvelopeTop2.id = "elem-envelope-top-2";
        elemEnvelopeTop2.src = sourceBrandizedAssetPath + "/desktop/envelope-top.png";
        elemEnvelope.appendChild(elemEnvelopeTop2);
        this.elems.push(elemEnvelopeTop2);
        //envelope top 1
        const elemEnvelopeTop1 = document.createElement("img");
        elemEnvelopeTop1.id = "elem-envelope-top-1";
        elemEnvelope.appendChild(elemEnvelopeTop1);
        this.elems.push(elemEnvelopeTop1);

        elemGiftBoxTissuePaper.appendChild(elemEnvelope);
        this.elems.push(elemEnvelope);
        this.containerDiv.appendChild(elemGiftBoxTissuePaper);
        this.elems.push(elemGiftBoxTissuePaper);

        const giftBoxSlideLeftAnimationDelay = this.delayBeforeStarting;
        document.documentElement.style.setProperty('--gift-box-slide-left-animation-delay', giftBoxSlideLeftAnimationDelay + "s");
        document.documentElement.style.setProperty('--gift-box-slide-left-animation-duration', this.animationDurations.giftBoxSlideLeftAnimationDuration + "s");

        const envelopeEnlargingAnimationDelay = giftBoxSlideLeftAnimationDelay + 1;
        document.documentElement.style.setProperty('--envelope-enlarging-animation-delay', envelopeEnlargingAnimationDelay + "s");
        document.documentElement.style.setProperty('--envelope-enlarging-animation-duration', this.animationDurations.envelopeEnlargingAnimationDuration + "s");

        const envelopeOpeningAnimationDelay = envelopeEnlargingAnimationDelay + 1;
        document.documentElement.style.setProperty('--envelope-opening-animation-delay', envelopeOpeningAnimationDelay + "s");
        document.documentElement.style.setProperty('--envelope-opening-animation-duration', this.animationDurations.envelopeOpeningAnimationDuration + "s");

        const letterSlideUpAnimationDelay = envelopeOpeningAnimationDelay + this.animationDurations.envelopeOpeningAnimationDuration + 0.1;
        document.documentElement.style.setProperty('--letter-slide-up-animation-delay', letterSlideUpAnimationDelay + "s");
        document.documentElement.style.setProperty('--letter-slide-up-animation-duration', this.animationDurations.letterSlideUpAnimationDuration + "s");

        messages.forEach( (message, index) => {
            const messageShowingAnimationDelay = envelopeOpeningAnimationDelay + index*this.animationDurations.messageShowingAnimationDuration;
            document.documentElement.style.setProperty('--message-showing-animation-delay-' + index, messageShowingAnimationDelay + "s");
            document.documentElement.style.setProperty('--message-showing-animation-duration', this.animationDurations.messageShowingAnimationDuration + "s");
            this.letterMessages[index].style.animationDelay = "var(--message-showing-animation-delay-" + index + ")";
        });

        const envelopeSlideLeftAnimationDelay = envelopeOpeningAnimationDelay + this.animationDurations.messageShowingAnimationDuration*messages.length - 2;
        document.documentElement.style.setProperty('--envelope-slide-left-animation-delay', envelopeSlideLeftAnimationDelay + "s");
        document.documentElement.style.setProperty('--envelope-slide-left-animation-duration', this.animationDurations.envelopeSlideLeftAnimationDuration + "s");

        const tissuePaperDisappearAnimationDelay = envelopeSlideLeftAnimationDelay + 1;
        document.documentElement.style.setProperty('--tissue-paper-disappear-animation-delay', tissuePaperDisappearAnimationDelay + "s");
        document.documentElement.style.setProperty('--tissue-paper-disappear-animation-duration', this.animationDurations.tissuePaperDisappearAnimationDuration + "s");

        const dustBagDisappearAnimationDelay = tissuePaperDisappearAnimationDelay + this.animationDurations.tissuePaperDisappearAnimationDuration + 1.5;
        document.documentElement.style.setProperty('--dust-bag-disappear-animation-delay', dustBagDisappearAnimationDelay + "s");
        document.documentElement.style.setProperty('--dust-bag-disappear-animation-duration', this.animationDurations.dustBagDisappearAnimationDuration + "s");

        //const giftSlideDownAnimationDelay = dustBagDisappearAnimationDelay + this.animationDurations.dustBagDisappearAnimationDuration + 1;
        //document.documentElement.style.setProperty('--gift-slide-down-animation-delay', giftSlideDownAnimationDelay + "s");
        //document.documentElement.style.setProperty('--gift-slide-down-animation-duration', this.animationDurations.giftSlideDownAnimationDuration + "s");

        //const finalTextAppearingAnimationDelay = giftSlideDownAnimationDelay + this.animationDurations.giftSlideDownAnimationDuration;
        //document.documentElement.style.setProperty('--final-text-appearing-animation-delay', finalTextAppearingAnimationDelay + "s");
        //document.documentElement.style.setProperty('--final-text-appearing-animation-duration', this.animationDurations.finalTextAppearingAnimationDuration + "s");

        const restartButtonAppearingAnimationDelay = dustBagDisappearAnimationDelay + this.animationDurations.dustBagDisappearAnimationDuration;
        document.documentElement.style.setProperty('--restart-button-appearing-animation-delay', restartButtonAppearingAnimationDelay + "s");

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
