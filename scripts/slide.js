class Slide {
	constructor(param) {
		this.id = param.id;
		this.cls = param.cls;
		this.items = param.items;

		this.numItem = this.items.length;
		this.currentInd = 0;
		this.switching = false;
	}

	Init() {
		// initialize slideview
		this.slideView = document.querySelector(".slideview");

		// initialize button
		this.slideView.querySelector(".controll#prev").addEventListener(
			"click", () => { this.ShiftSlide(-1); this.SlideShow(-1);}
		);
		this.slideView.querySelector(".controll#next").addEventListener(
			"click", () => { this.ShiftSlide(1); this.SlideShow(1);}
		);

		// initialize bullets & sildes
		this.bullets = [];
		this.slides = [];
		let bulletWindow = this.slideView.querySelector(".bullets");
		let slideWindow = this.slideView.querySelector(".slideWindow");
		for (let i = 0; i < this.numItem; ++i) {
			let bullet = document.createElement("span");
			bullet.classList.add("bullet");
			bullet.addEventListener('click', () => { this.ToSlide(i); this.SlideShow();});
			bulletWindow.append(bullet);
			this.bullets.push(bullet);

			let slide = document.createElement("div");
			slide.classList.add("slide");
			let img = document.createElement("img");
			img.src = this.items[i];
			slide.append(img);
			this.slides.push(slide);
			slideWindow.append(slide);
		}

		this.bullets[0].classList.add("bullet-active");
		this.slides[0].classList.add("slide-active");
		this.shifting = false;
	}

	ToSlide(slideInd) {
		if (this.shifting == true) return;
		this.shifting = true;

		this.slides[this.currentInd].classList.remove('slide-active');
		this.bullets[this.currentInd].classList.remove('bullet-active');
		setTimeout(() => {
			this.slides[slideInd].classList.add('slide-active');
			this.bullets[slideInd].classList.add('bullet-active');
		}, 500);

		setTimeout(() => {
			this.currentInd = slideInd;
			this.shifting = false;
		}, 500);
	}

	ShiftSlide(offset) {
		offset = (offset<0) ?-1 :1;
		let nextInd = (this.currentInd + offset + this.numItem) % this.numItem;
		this.ToSlide(nextInd);
	}

	SlideShow(direction) {
		clearInterval(this.intervalHandle);
		this.intervalHandle = setInterval(this.ShiftSlide.bind(this, direction), 3000);
	}
}
