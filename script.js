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

    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if(document.body.classList.contains('dark-mode')) {
            darkToggle.textContent = "Light Mode";
        } else {
            darkToggle.textContent = "Dark Mode";
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

