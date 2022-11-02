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
    const ru = language.querySelector(".ru"),
        eng = language.querySelector(".eng");

    if (e.target.classList.contains("ru") || e.target.classList.contains("eng")) {

        if (e.target == ru) {
            eng.classList.remove("active")
            ru.classList.add("active")
        } else {
            ru.classList.remove("active");
            eng.classList.add("active");
        }

        const lng = e.target.classList.contains("ru") ? "ru" : "eng";
        getResource(`https://zheka717.github.io/resume/${lng}.json`)
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
});
