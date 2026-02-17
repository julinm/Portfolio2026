document.addEventListener('DOMContentLoaded', function () {

    const toggleButton = document.getElementById('lang-toggle');
    if (!toggleButton) return;

    const spanES = document.getElementById('lang-es');
    const spanEN = document.getElementById('lang-en');

    let lang = localStorage.getItem('lang');

    if (!lang) {
        lang = 'EN';
        localStorage.setItem('lang', lang);
    }

    function updateUI() {
        if (lang === 'ES') {
            spanES.classList.add('lang-active');
            spanEN.classList.remove('lang-active');
        } else {
            spanEN.classList.add('lang-active');
            spanES.classList.remove('lang-active');
        }
    }

    updateUI();

    toggleButton.addEventListener('click', function () {

        // Cambiar idioma
        lang = (lang === 'ES') ? 'EN' : 'ES';
        localStorage.setItem('lang', lang);

        updateUI();

        // Redirección
        const currentPage = window.location.pathname.split("/").pop();

        if (currentPage === "home.html") {
            window.location.href = "inicio.html";
        } else if (currentPage === "inicio.html") {
            window.location.href = "home.html";
        } else if (currentPage === "projects.html") {
            window.location.href = "proyectos.html";
        } else if (currentPage === "proyectos.html") {
            window.location.href = "projects.html";
        } else if (currentPage === "contactme.html") {
            window.location.href = "contactame.html";
        } else if (currentPage === "contactame.html") {
            window.location.href = "contactme.html";
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