// language
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('lang-toggle');
    if (!toggleButton) return; // si no existe el botón, salimos

    const currentPage = window.location.pathname.split("/").pop();

    toggleButton.addEventListener('click', () => {
        if(currentPage === "home.html") {
            window.location.href = "inicio.html";
        } else if(currentPage === "inicio.html") {
            window.location.href = "home.html";
        }
        if(currentPage === "projects.html") {
            window.location.href = "proyectos.html";
        } else if(currentPage === "proyectos.html") {
            window.location.href = "projects.html";
        }
        if(currentPage === "contactme.html") {
            window.location.href = "contactame.html";
        } else if(currentPage === "contactame.html") {
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
