const carouselSlide = document.querySelector('.carrosel-imagem');
const carouselImages = document.querySelectorAll('.carrosel-imagem img');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

class Slide {
    constructor(carouselSlide, carouselImages, prevBtn, nextBtn) {
        this.carouselSlide = carouselSlide;
        this.carouselImages = carouselImages;
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.counter = 0; // contador para saber em qual imagem estamos
        this.size = this.carouselImages[0].clientWidth; // pega o tamanho da imagem
        this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)'; // inicializa o slide no primeiro item

        // Clone the first and last image
        let firstClone = this.carouselImages[0].cloneNode(true);
        let lastClone = this.carouselImages[this.carouselImages.length - 1].cloneNode(true);

        // Add the clones to the carousel
        this.carouselSlide.append(firstClone); // adiciona o clone no final
        this.carouselSlide.prepend(lastClone); // adiciona o clone no inicio
    }

    start() {
        setInterval(() => {
           
            this.next();
        }, 1000); // muda paara a proxima imagem a cada 1 segundo
    }

    next() { // metodo para ir para a proxima imagem
        if (this.counter >= this.carouselImages.length - 6) { // se for a ultima imagem
            this.direction = -1; // muda a direção
        } else if (this.counter <= 0) { // se for a primeira imagem
            this.direction = 1; // muda a direção
        }
        this.carouselSlide.style.transition = "transform 0.4s ease-in-out"; // adiciona uma transição
        this.counter += this.direction;
        this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
    }
    
    prev() {
        if (this.counter <= 0) {
            return;
        }
        this.carouselSlide.style.transition = "transform 0.4s ease-in-out";
        this.counter--;
        this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
    }

    setupEventListeners() {
        this.carouselSlide.addEventListener('transitionend', () => {
            if (this.carouselImages[this.counter].id === 'lastClone') {
                this.carouselSlide.style.transition = "none";
                this.counter = this.carouselImages.length - 2;
                this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
            }
            if (this.carouselImages[this.counter].id === 'firstClone') {
                this.carouselSlide.style.transition = "none";
                this.counter = this.carouselImages.length - this.counter;
                this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
            }
        });
    }
}


// criar um new Slide()

let slide = new Slide(carouselSlide, carouselImages, prevBtn, nextBtn);

if (slide) {
    slide.start();
    slide.setupEventListeners();
}
