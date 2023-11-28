let songIndex = 0;
let audioElement = new Audio('');
let masterplay = document.getElementById('masterplay');
let progressBar = document.getElementById('progressBar');
let title = document.getElementById('title');
let playerPoster = document.getElementById('player-poster');

let scrollingUp = document.querySelector(".scrolling-up");

// get elements
const header = document.querySelector(".header");
const scrollBtn = document.getElementById("scroll-btn");
const menu = document.getElementById("menu-icon");
const navlist = document.querySelector(".nav-list");
const navlistEl = document.querySelectorAll(".nav-list li a");

// handle nav list element on click
navlist.addEventListener("click", (e) => {
    // remove active class from every element
    navlistEl.forEach((el) => {
        if (el.classList.contains("active")) el.classList.remove("active");
    });

    // add active class to current element
    if (e.target.tagName === "A") {
        if (!e.target.classList.contains("active"))
            e.target.classList.add("active");
    }
});

// Handle menu click
menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navlist.classList.toggle("open");
};

window.onscroll = function () {
    if (window.scrollY >= 400) scrollingUp.classList.add("show");
    else scrollingUp.classList.remove("show");
};
scrollingUp.onclick = function () {
    window.scrollTo(0, 0);
};

let audios = [];
fetch(`https://quran-endpoint.vercel.app/quran`)
    .then(response => response.json())
    .then(data => {

        for (let i = 0; i < 114; i++) {
            audios.push(data.data[i].recitation.full);

        }
        audioElement.src = audios[0];

    })


fetch("http://api.alquran.cloud/v1/meta")
    .then(response => response.json())
    .then(data => {
        let surahs = data.data.surahs.references;
        title.innerHTML =
            `ماهر المعيقلي  <div class="subtitle  fw-medium "><span id="artists-name">  ${surahs[0].name}</span></div>

        `;
    })


// Hadith Changer 
let hadithContainer = document.querySelector('.hadithContainer'),
    next = document.querySelector('.buttons .next'),
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number');
let hadithIndex = 0;

HadithChanger();
function HadithChanger() {
    fetch("https://api.hadith.gading.dev/books/muslim?range=1-150")
        .then(response => response.json())
        .then(data => {

            let Hadiths = data.data.hadiths;
            changeHadith();

            next.addEventListener('click', () => {
                hadithIndex == 149 ? hadithIndex = 0 : hadithIndex++;
                changeHadith()
            })
            prev.addEventListener('click', () => {
                hadithIndex == 0 ? hadithIndex = 149 : hadithIndex--;
                changeHadith()
            })

            function changeHadith() {
                hadithContainer.innerText = Hadiths[hadithIndex].arab;
                // number.innerText = `150  -  ${hadithIndex + 1}`
                number.innerText = `151   -   ${Hadiths[hadithIndex].number}`;

            }
        })
}

// Surah Api
let SurahsContainer = document.querySelector('.surhasContainer');

getSurahs();
function getSurahs() {
    fetch("https://api.alquran.cloud/v1/meta")
        .then(response => response.json())
        .then(data => {
            let surahs = data.data.surahs.references;
            let numberOfSurahs = 114;
            SurahsContainer.innerHTML = "";
            for (let i = 0; i < numberOfSurahs; i++) {

                SurahsContainer.innerHTML +=
                    `
                    <div  class="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6 mt-3">
                    <div class="surah">
                    <div class="surah-img">
                    </div>
                    <p class="mt-3">${surahs[i].name}</p>
                    <p>${surahs[i].englishName}</p>
                       </div>
                    </div>
                   
                `
            }
            let index = 0;
            let SurahsTitels = document.querySelectorAll('.surah');
            let popup = document.querySelector('.surah-popup');
            let AyatContainer = document.querySelector('.ayat');

            SurahsTitels.forEach((title, index) => {
                title.addEventListener('click', () => {
                    fetch("https://api.alquran.cloud/v1/meta")
                        .then(response => response.json())
                        .then(data => {
                            let surahs = data.data.surahs.references;

                        })
                    fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
                        .then(response => response.json())
                        .then(data => {

                            AyatContainer.innerHTML = "";
                            let Ayat = data.data.ayahs;
                            Ayat.forEach(aya => {
                                popup.classList.add('active');


                                let nameSurah = document.querySelector('#nameSurah');



                                document.getElementById('linkSurah').href = `https://quran.com/ar/${index + 1}`;





                                nameSurah.innerHTML = surahs[index].name;

                                AyatContainer.innerHTML +=

                                    `

                                    <div class="card text-center mb-3 bg-light p-1">

                                      <div class="card-header">
                                         <p   class="card-title btn btn-outline-secondary" > آیه  ${aya.numberInSurah}</p> 
                                      </div>

                                          <div class="card-body bg-light"'>

                                              <h5 class="card-title Quran-ayah ">${aya.text}</h5>

                                           </div>
                                     </div>

                                  `
                            })

                        })
                })
            })



            let closePopup = document.querySelector('.close-popup');
            closePopup.addEventListener('click', () => {
                popup.classList.remove('active');
            })
        })
}

// PrayTime Api
getPrayTimes();
function getPrayTimes() {
    fetch("https://api.aladhan.com/v1/timingsByCity?city=assiut&country=egypt&method=8")
        .then(response => response.json())
        .then(data => {
            let times = data.data.timings;
            document.getElementById("fajr-time").innerHTML = times.Fajr;
            document.getElementById("sunrise-time").innerHTML = data.data.timings.Sunrise;
            document.getElementById("dhuhr-time").innerHTML = times.Dhuhr;
            document.getElementById("asr-time").innerHTML = times.Asr;
            document.getElementById("maghrib-time").innerHTML = data.data.timings.Maghrib;
            document.getElementById("isha-time").innerHTML = data.data.timings.Isha;


        }

        )
}

let name1 = document.getElementById('name');

fetch("https://api.aladhan.com/v1/asmaAlHusna")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < 99; i++) {

            name1.innerHTML += `
            <div  class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 mt-3">
            <div class="name-names">
            <p class="general-color fs-4">${JSON.stringify(data.data[i].name)}</p>
            <p>${JSON.stringify(data.data[i].transliteration)}</p>

            </div>
            </div>
        
                `

        }
    })

fetch("https://api.alquran.cloud/v1/meta")
    .then(response => response.json())
    .then(data => {
        let surahs = data.data.surahs.references;
        let numberOfSurahs = 114;
        readerQuran.innerHTML = "";
        for (let i = 0; i < numberOfSurahs; i++) {
            readerQuran.innerHTML +=
                `
                    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6 mt-3">
                    <div class="card">
                      <img src="C:/Users/Mahrous Gamal/Desktop/Quran/img/1.jpeg" class="card-img-top reader-image" alt="...">
                      <div class="card-body">
                        <span ><i id=${i} class="bi p-btn bi-play-circle-fill fs-4" ></i></span>
                        <div class="info">
                          <h5 class="name">ماهر المعيقلي</h5>
                          <h6 class="artits">${surahs[i].name} </h6>
                        </div>
                      </div>
                    </div>
                  </div>

                `
        }

    })










