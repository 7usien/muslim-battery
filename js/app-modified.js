const content = document.querySelector('.content');
let cardsMorning;
let navRightWrap = [],
	navLeftWrap = [];

let progress = document.querySelector('.progress__meter progress');

let progressInfo = document.querySelector('.progress__info');
let progressCounter = 1;

const url =
	'https://raw.githubusercontent.com/7usien/muslim-battery/ver1/json/azkar.json';

class Azker {
	constructor(url, type, filterData) {
		this.url = url;
		this.type = type;
		this.filterData = filterData;
	}

	fetchData = async () => {
		const response = await fetch(this.url);
		const data = response.json();

		return data;
	};

	viewType = async (data) => {
		const filterData = await data.filter((item) => {
			if (item.category === this.type) {
				content.appendChild(this.buildUI(item));

				cardsMorning = document.querySelectorAll(
					`[data-type="${this.filterData}"]`
				);
			}
		});
		console.log(cardsMorning);
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

const zerkApp = new Azker(url, 'أذكار الصباح', 'morning');
zerkApp.fetchData().then((data) => {
	zerkApp.viewType(data);
});
