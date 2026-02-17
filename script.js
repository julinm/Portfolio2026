document.addEventListener('DOMContentLoaded', function () {

    const toggleButton = document.getElementById('lang-toggle');
    if (!toggleButton) return;

    const spanES = document.getElementById('lang-es');
    const spanEN = document.getElementById('lang-en');

    const currentPage = window.location.pathname.split("/").pop();

    const spanishPages = ["inicio.html", "proyectos.html", "contactame.html"];
    const englishPages = ["home.html", "projects.html", "contactme.html"];

    // Determinar idioma: por página o fallback a localStorage
    let lang = spanishPages.includes(currentPage) ? "ES" :
               englishPages.includes(currentPage) ? "EN" :
               localStorage.getItem('lang') || "EN";

    localStorage.setItem('lang', lang);

    function updateUI() {
        spanES.classList.toggle('lang-active', lang === "ES");
        spanEN.classList.toggle('lang-active', lang === "EN");
    }

    updateUI();

    toggleButton.addEventListener('click', function () {

        lang = (lang === "ES") ? "EN" : "ES";
        localStorage.setItem('lang', lang);

        updateUI();

        const routes = {
            "home.html": "inicio.html",
            "inicio.html": "home.html",
            "projects.html": "proyectos.html",
            "proyectos.html": "projects.html",
            "contactme.html": "contactame.html",
            "contactame.html": "contactme.html"
        };

        if (routes[currentPage]) {
            window.location.href = routes[currentPage];
        }
    });

});

//dark mode
document.addEventListener('DOMContentLoaded', () => {
    const darkToggle = document.getElementById('dark-mode-toggle');


    if(localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkToggle.textContent = "Light Mode";
    }

    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if(document.body.classList.contains('dark-mode')) {
            darkToggle.textContent = "Light Mode";
            localStorage.setItem('dark-mode', 'enabled'); 
        } else {
            darkToggle.textContent = "Dark Mode";
            localStorage.setItem('dark-mode', 'disabled'); 
        }
    });
});

//fade in/out
document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => observer.observe(el));
});

//reveal when scroll
document.addEventListener("DOMContentLoaded", function () {

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });

});

//whatsapp
document.addEventListener('DOMContentLoaded', () => {
    const wpButton = document.getElementById('wp-button');
    wpButton.style.display = 'none'; 

    window.addEventListener('scroll', () => {
        if(window.scrollY > 200) {
            if(wpButton.style.display === 'none') {
                wpButton.style.display = 'flex';
                wpButton.classList.add('bounce'); 
                setTimeout(() => wpButton.classList.remove('bounce'), 1000); 
            }
        } else {
            wpButton.style.display = 'none';
        }
    });
});

//delay en mostrar cards
window.addEventListener("load", () => {
    setTimeout(() => {
        document.body.classList.remove("loading");
    }, 500);
});