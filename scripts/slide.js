'use strict';

class TextButton {
	constructor(param) {
		this.element = document.createElement("button");
		this.element.classList.add(param.cls);
		this.element.textContent = param.label;
		this.element.addEventListener(param.eventHandler["event"], param.eventHandler["handler"])
		this.element.setAttribute("id", param.id);
	}
}

class Slide {
	constructor(param) {
		this.id = param.id;
		this.cls = param.cls;
		this.items = param.items;

		this.numItem = this.items.length;
		this.currentInd = 0;
		this.switching = false;
		this.forward = true;
	}

	Init() {
		// initialize slideview
		this.slideView = document.createElement("div");
		this.slideView.classList.add(this.cls);
		this.slideView.id = this.id;

		// initialize button
		this.slideView.append(new TextButton({
			id: "prev",
			cls: "controll",
			label: "<",
			eventHandler: {
				"event": "click",
				"handler": () => {
					this.ShiftOne(false);
					this.ResetSlideRotator();
				}
			}
		}).element);
		this.slideView.append(new TextButton({
			id: "next",
			cls: "controll",
			label: ">",
			eventHandler: {
				"event": "click",
				"handler": () => {
					this.ShiftOne(true);
					this.ResetSlideRotator();
				}
			}
		}).element);

		// initialize bullets & sildes
		this.bullets = [];
		this.slides = [];
		let bulletWindow = document.createElement("div");
		bulletWindow.classList.add("bullets");
		let slideWindow = document.createElement("div");
		slideWindow.classList.add("slide-window");
		for (let i = 0; i < this.numItem; ++i) {
			let bullet = document.createElement("span");
			bullet.classList.add("bullet");
			bullet.addEventListener('click', () => {
				this.ToSlide(i);
				this.ResetSlideRotator();
			});
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
		this.slideView.append(bulletWindow);
		this.slideView.append(slideWindow);

		this.bullets[0].classList.add("active");
		this.slides[0].classList.add("active");
		this.shifting = false;
		document.body.insertBefore(this.slideView, document.body.firstChild);
	}

	ToSlide(slideInd) {
		if (this.shifting === true) return;
		this.shifting = true;

		this.slides[this.currentInd].classList.remove('active');
		this.bullets[this.currentInd].classList.remove('active');
		setTimeout(() => {
			this.slides[slideInd].classList.add('active');
			this.bullets[slideInd].classList.add('active');

			setTimeout(() => {
				this.currentInd = slideInd;
				this.shifting = false;
			}, 500);
		}, 500);
	}

	ShiftOne(is_forward) {
		this.forward = is_forward;
		const offset = (is_forward === true) ? 1 : -1;
		const nextInd = (this.currentInd + offset + this.numItem) % this.numItem;
		this.ToSlide(nextInd);
	}

	ResetSlideRotator() {
		clearInterval(this.intervalHandle);
		this.intervalHandle = setInterval(this.ShiftOne.bind(this, this.forward), 3000);
	}
}