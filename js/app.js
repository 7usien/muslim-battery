
const content = document.querySelector('.content');
const doaaCount = document.querySelector('.card__count');
const cards = document.querySelectorAll('.card');



class Doaa {

  fetchData = async () => {

    const respons = await fetch('../json/azkar.json');
    const data = await respons.json();
    return data

  }




}

const doaa = new Doaa();
doaa.fetchData()
  .then(doaas => {


    const filteredDoaa = Array.from(doaas).filter((doaa) => {
      if (doaa['category'] === 'أذكار الصباح') {
        return doaa
      }

    });

    const totalCount = filteredDoaa.length;
    filteredDoaa.forEach((doaa) => {


      const card = `
      <div class="card">
          <h2 class="card__title">

           ${doaa.zekr}


          </h2>


          <div class="card__nav">

            <span class="card__nav--right">الدعاء التالي</span>
            <span class="card__count">عدد مرات التكرار :    ${doaa.count}</span>

            <span class="card__nav--left">الدعاء السابق</span>

          </div>
        </div>
      
      
      `;

      content.innerHTML += card;




    })

  })






