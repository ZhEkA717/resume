$(document).ready(function(){
    initSlier();
  });

const initSlier = () => {
    $('.slider').slick({
        dots: true,
        focusOnSelect: false,
        focusOnChange: false,
        responsive: [
            {
              breakpoint: 550,
              settings: {
                arrows: false,
              }
            },
          ]
      });
}


const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

class ChoiceLanguage {
    constructor(profile, profileDescr, skills, firstname, speciality, education, works, educationItems) {
        this.profile = profile;
        this.profileDescr = profileDescr;
        this.skills = skills;
        this.firstname = firstname;
        this.speciality = speciality;
        this.education = education;
        this.works = works,
            this.educationItems = educationItems;
    }

    translate() {
        const profile = document.querySelector('.left-content h2'),
            profileDescr = document.querySelector('.left-content p'),
            skills = document.querySelector('.left-content .title_indented h2'),
            firstname = document.querySelector('.right-content h1'),
            speciality = document.querySelector('.right-content h3'),
            education = document.querySelector('.ed'),
            works = document.querySelector('.work');

        profile.innerHTML = this.profile;
        profileDescr.innerHTML = this.profileDescr;
        skills.innerHTML = this.skills;
        firstname.innerHTML = this.firstname;
        speciality.innerHTML = this.speciality;
        education.innerHTML = this.education;
        works.innerHTML = this.works;

        const educationItems = document.querySelectorAll(".education__item"),
            educationName = document.querySelectorAll(".education__name"),
            educationYears = document.querySelectorAll(".education__years"),
            educationDescr = document.querySelectorAll(".education__descr");

        educationItems.forEach((item, i) => {
            educationName[i].innerHTML = this.educationItems[i].educationName;
            educationYears[i].innerHTML = this.educationItems[i].educationYears;
            educationDescr[i].innerHTML = this.educationItems[i].educationDescr;
        });
    }
}



const language = document.querySelector(".language");


language.addEventListener("click", (e) => {
    toTranslate(e);
});

function toTranslate(event) {
    const ru = language.querySelector(".ru"),
        eng = language.querySelector(".eng");

    if (event.target.classList.contains("ru") ||
        event.target.classList.contains("eng")) {

        if (event.target == ru) {
            eng.classList.remove("active")
            ru.classList.add("active")
        } else {
            ru.classList.remove("active");
            eng.classList.add("active");
        }

        const lng = event.target.classList.contains("ru") ? "ru" : "eng";
        getTranslateData(lng);
    }
}

function getTranslateData(lang) {
    getResource(`https://zheka717.github.io/resume/${lang}.json`)
    .then(data => {
        let {
            profile,
            profileDescr,
            skills,
            firstname,
            speciality,
            education,
            works,
            educationItems
        } = data;

        new ChoiceLanguage(profile, profileDescr, skills, firstname, speciality, education, works, educationItems).translate();
    });
}

const sliderModal = document.querySelector('.slider-modal');

const educations = document.querySelectorAll('.education__name');

educations.forEach((item, i) => {
    item.addEventListener('click', () => {
       if (i !== 0) openModal(i);
    });
});

sliderModal.addEventListener('click', (e) => {
    closeModal(e);
});

const openModal = (i) => {
    sliderModal.classList.add('active');
    $('.slider').slick('slickGoTo', i - 1, true);
    document.body.style.overflow = 'hidden';
}

const closeModal = (e) => {
    e.target.classList.remove('active');
    if (e.target === sliderModal) 
    document.body.style.overflow = '';
}



