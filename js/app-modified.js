// Vars Declartions
const content = document.querySelector('.content');
let cardsMorning;
let navRightWrap = [],
	navLeftWrap = [];
let progress = document.querySelector('.progress__meter progress');
let progressInfo = document.querySelector('.progress__info');
let progressCounter = 1;
let nav = document.querySelector('.header__nav ul');
let linkDataset = null;
let azkarSets = new Set();

const subMenu = document.querySelector('#submenu');
const menuWrap = document.createElement('ul');
menuWrap.classList.add('cats');
subMenu.parentElement.appendChild(menuWrap);

// JSON URL
const url =
	'https://raw.githubusercontent.com/7usien/muslim-battery/ver1/json/azkar.json';

// CLASS AZKAR
class Azker {
	constructor(url, type = 'أذكار الصباح', filterData = 'morning') {
		this.url = url;
		this.type = type;
		this.filterData = filterData;
	}

	fetchData = async () => {
		const response = await fetch(this.url);
		const data = await response.json();

		return data;
	};

	viewType = (data) => {
		const filterData = data.filter((item) => {
			azkarSets.add(item.category);

			if (item.category === this.type) {
				content.appendChild(this.buildUI(item));

				cardsMorning = document.querySelectorAll(
					`[data-type="${this.filterData}"]`
				);
			}
		});

		Array.from(azkarSets).filter((item) => {
			if (item != 'أذكار الصباح' && item != 'أذكار المساء') {
				let li = document.createElement('li');
				li.setAttribute('data-href', item);
				menuWrap.appendChild(li);
				li.textContent = item;
			}
		});
		this.controlUI(cardsMorning);
	};

	buildUI = (item) => {
		let card = document.createElement('div');

		card.classList.add('card');
		card.setAttribute('data-type', `${this.filterData}`);
		card.innerHTML = `
    
          <h2 class="card__title">

           ${item.zekr}


          </h2>


          <div class="card__nav">
            <span class="card__nav--right">→ الدعاء التالي </span>

            <span class="card__count">عدد مرات التكرار :    ${item.count}</span>
            <span class="card__nav--left"> الدعاء السابق ←</span>


          </div>
      
      
      
      `;

		return card;
	};

	controlUI = (cards) => {
		cards.forEach((card) => {
			card.classList.add('hidden');
			let navRight = card.querySelector('.card__nav--right');
			let navLeft = card.querySelector('.card__nav--left');

			navRightWrap.push(navRight);
			navLeftWrap.push(navLeft);
		});
		let first = content.querySelector(`[data-type="${this.filterData}"]`);

		first.classList.remove('hidden');

		navRightWrap.forEach((handler) => {
			handler.addEventListener('click', (e) => {
				if (progressCounter < navRightWrap.length) {
					progressCounter++;
					e.target.parentElement.parentElement.classList.add('hidden');
					e.target.parentElement.parentElement.nextSibling.classList.remove(
						'hidden'
					);
					progressInfo.textContent = `تم قراءة ${progressCounter} من أصل ${navRightWrap.length}`;

					progress.setAttribute('max', navRightWrap.length);
					progress.setAttribute('value', progressCounter);
				} else {
					alert('تم انهاء قراءة الأذكار بنجاح');
				}
			});
		});

		navLeftWrap.forEach((handler) => {
			handler.addEventListener('click', (e) => {
				if (progressCounter < navLeftWrap.length && progressCounter > 1) {
					progressCounter--;
					e.target.parentElement.parentElement.classList.add('hidden');
					e.target.parentElement.parentElement.previousSibling.classList.remove(
						'hidden'
					);
					progressInfo.textContent = `تم قراءة ${progressCounter} من أصل ${navLeftWrap.length}`;

					progress.setAttribute('max', navLeftWrap.length);
					progress.setAttribute('value', progressCounter);
				}
			});
		});
	};
}

async function build(type) {
	const zerkApp = await new Azker(url, type, 'morning');
	zerkApp.fetchData().then((data) => {
		zerkApp.viewType(data);
	});
}

nav.addEventListener('click', (e) => {
	linkDataset = e.target.dataset.href;

	build(linkDataset);
});

linkDataset === null ? build('أذكار الصباح') : build(linkDataset);
