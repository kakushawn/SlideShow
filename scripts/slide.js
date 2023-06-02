

class Slide {
	// id;
	// cls;
	// items;

	// slideView;
	// slideWindow;
	// buttons;
	// bulletWindow

	// slides;
	// bullets;
	// numItem;
	// currentInd;
	// intervalHandle;

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
		this.slideView = document.createElement("div");
		this.slideView.classList.add("slideview");

		// initialize button
		const buttonLabels = [
			['<', "prev", -1],
			['>', "next", 1]
		];
		this.buttons = buttonLabels.forEach(options => {
			let btn = document.createElement("button");
			btn.classList.add("slide-controll");
			btn.setAttribute("id", options[1]);
			btn.addEventListener('click', ()=>{
				clearInterval(this.intervalHandle);
				this.ShiftSlide(options[2]);
				this.Start();
			});
			btn.textContent = options[0];
			this.slideView.append(btn);
			return btn;
		});

		// initialize bullets
		this.bullets = [];
		this.bulletWindow = document.createElement("div");
		this.bulletWindow.classList.add("bullets");
		for (let i = 0; i < this.numItem; ++i) {
			let bullet = document.createElement("span");
			let cls = i > 0 ? "bullet-inactive" : "bullet-active";
			bullet.classList.add("bullet", cls);
			bullet.addEventListener('click', this.ToSlide.bind(this, i));
			this.bulletWindow.append(bullet);
			this.bullets.push(bullet);
		}
		this.bullets[0].classList.remove("bullet-inactive");
		this.bullets[0].classList.add("bullet-active");
		this.slideView.append(this.bulletWindow);

		// initialize sildes
		this.slideWindow = document.createElement("div");
		this.slideWindow.classList.add("slideWindow");
		this.slides = [];
		for (let i = 0; i < this.numItem; ++i) {
			let slide = document.createElement("div");
			let cls = i > 0 ? "slide-inactive" : "slide-active";
			slide.classList.add("slide", cls);
			let img = document.createElement("img");
			img.setAttribute("src", this.items[i]);
			slide.append(img);
			this.slides.push(slide);
			this.slideWindow.append(slide);
		}
		this.slideView.append(this.slideWindow);

		document.body.insertBefore(this.slideView, document.body.firstChild);
		this.shifting = false;
	}

	SlideOut(slideInd) {
		this.slides[slideInd].classList.remove('slide-active');
		this.bullets[slideInd].classList.remove('bullet-active');
		this.slides[slideInd].classList.add('slide-inactive');
		this.bullets[slideInd].classList.add('bullet-inactive');
	}

	SlideIn(slideInd) {
		this.slides[slideInd].classList.remove('slide-inactive');
		this.bullets[slideInd].classList.remove('bullet-inactive');
		this.slides[slideInd].classList.add('slide-active');
		this.bullets[slideInd].classList.add('bullet-active');
	}

	ToSlide(slideInd) {
		if (this.shifting == true) return;
		this.shifting = true;

		this.SlideOut(this.currentInd);
		setTimeout(() => {
			this.SlideIn(slideInd);
		}, 500);

		setTimeout(() => {
			this.currentInd = slideInd;
			this.shifting = false;
		}, 500);
	}

	ShiftSlide(offset) {
		let nextInd = (this.currentInd + offset + this.numItem) % this.numItem;
		this.ToSlide(nextInd);
	}

	Start() {
		this.intervalHandle = setInterval(this.ShiftSlide.bind(this, 1), 3000);
	}
}
