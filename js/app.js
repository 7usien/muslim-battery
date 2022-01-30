const content = document.querySelector('.content');
const doaaCount = document.querySelector('.card__count');
const cards = document.querySelectorAll('.card');
const progressWidth = document.querySelector('.progress__parcent');
const progressInfo = document.querySelector('.progress__info')

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

const doaa = new Doaa('../json/azkar.json');
doaa.fetchData().then((doaas) => {
  const filteredDoaa = Array.from(doaas).filter((doaa) => {
    if (doaa['category'] === 'أذكار الصباح') {
      return doaa;
    }
  });

  filteredDoaa.forEach((doaa) => {
    const card = `
      <div class="card">
          <h2 class="card__title">

           ${doaa.zekr}


          </h2>


          <div class="card__nav">

            <span class="card__nav--right">→ الدعاء التالي</span>
            <span class="card__count">عدد مرات التكرار :    ${doaa.count}</span>

            <span class="card__nav--left">الدعاء السابق ←</span>

          </div>
        </div>
      
      
      `;

    content.innerHTML += card;

  });

  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.parentElement.querySelector('.card').classList.remove('hidden');
    card.classList.add('hidden');
  });
  let countUp = 1;
  let countDown = cards.length;
  progressWidth.style.inlineSize = (100 / countDown);


  const cardNavRight = document.querySelectorAll('.card__nav--right');
  const cardNavleft = document.querySelectorAll('.card__nav--left');




  cardNavRight.forEach((item) => {
    item.addEventListener('click', (e) => {


      if (countUp < countDown) {

        e.target.parentElement.parentElement.classList.add('hidden');
        e.target.parentElement.parentElement.nextElementSibling.classList.remove(
          'hidden'
        );
        countUp++;
        progressInfo.innerText = `تم قراءة ${countUp} من أصل ${countDown}`;


      }

      if (countUp === countDown) {
        alert('تم أنهاء قراءة الأذكار بنجاح ..اللهم تقبل منكم')
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
      }
    });
  });



});

