const content = document.querySelector('.content');
const doaaCount = document.querySelector('.card__count');
let increment = 1;

class Doaa {
	constructor(url) {
		this.url = url;
	}

	fetchData = async () => {
		const response = await fetch(this.url);
		const data = await response.json();
		return data;
	};
}

const doaa = new Doaa(
	'https://raw.githubusercontent.com/7usien/muslim-battery/ver1/json/azkar.json'
);

doaa.fetchData().then((doaas) => {
	const filteredDoaa = Array.from(doaas).filter((doaa) => {
		if (doaa['category'] === 'أذكار الصباح') {
			return doaa;
		}
	});

	filteredDoaa.forEach((doaa) => {
		const card = `
      <div class="card" data-type="morning">
          <h2 class="card__title">

           ${doaa.zekr}


          </h2>


          <div class="card__nav">
            <span class="card__nav--right">→ الدعاء السابق </span>

            <span class="card__count">عدد مرات التكرار :    ${doaa.count}</span>
            <span class="card__nav--left"> الدعاء التالي ←</span>


          </div>
        </div>
      
      
      `;

		content.innerHTML += card;
	});

	const cards = document.querySelectorAll('.card[data-type="morning"]');

	cards.forEach((card) => {
		card.parentElement.querySelector('.card').classList.remove('hidden');
		card.classList.add('hidden');
	});
	let countUp = 1;
	let countDown = cards.length;

	const cardNavRight = document.querySelectorAll('.card__nav--left');
	const cardNavleft = document.querySelectorAll('.card__nav--right');
	document.querySelector('progress').setAttribute('max', 31);

	cardNavRight.forEach((item) => {
		item.addEventListener('click', (e) => {
			if (countUp < countDown) {
				e.target.parentElement.parentElement.classList.add('hidden');
				e.target.parentElement.parentElement.nextElementSibling.classList.remove(
					'hidden'
				);
				countUp++;
				console.log(countUp);

				document.querySelector(
					'.progress__info'
				).innerHTML = `تم قراءة ${countUp} من أصل ${countDown}`;
			}

			document.querySelector('progress').setAttribute('max', countDown);

			increment += 1;

			document.querySelector('progress').setAttribute('value', increment);

			console.log(document.querySelector('progress'));

			if (countUp === countDown) {
				alert('تم أنهاء قراءة الأذكار بنجاح ..اللهم تقبل منكم');
			}
		});
	});

	cardNavleft.forEach((item) => {
		item.addEventListener('click', (e) => {
			if (countUp > 1) {
				e.target.parentElement.parentElement.classList.add('hidden');
				e.target.parentElement.parentElement.previousElementSibling.classList.remove(
					'hidden'
				);

				countUp--;

				increment -= 1;
				document.querySelector('progress').setAttribute('value', increment);

				document.querySelector(
					'.progress__info'
				).innerHTML = `تم قراءة ${countUp} من أصل ${countDown}`;
			}
		});
	});
});
