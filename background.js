const canvas = document.getElementById('dustCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Lista de partículas global
const particles = [];
const particleCount = 2000;

// Inicializar partículas
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
        dx: (Math.random() - 0.5) * 0.2,
        dy: -Math.random() * 0.2,
        toCenter: false,
        targetX: null,
        targetY: null,
        speedFactor: 0.05 + Math.random() * 0.1  // velocidad individual
    });
}

// Función para animar partículas
function initParticles(particleColor) {
    // Si venimos de otra página, expandir desde el centro
    if (sessionStorage.getItem('expandParticles') === 'true') {
        particles.forEach(p => {
            p.x = width / 2;
            p.y = height / 2;
            p.targetX = Math.random() * width;
            p.targetY = Math.random() * height;
        });
        sessionStorage.removeItem('expandParticles');
    }

    let mouse = { x: width / 2, y: height / 2 };
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const time = Date.now() * 0.005; // tiempo para vibración

        particles.forEach(p => {
            // Si tiene posición target (expandir), animar hacia allí
            if (p.targetX !== null && p.targetY !== null) {
                p.x += (p.targetX - p.x) * 0.05;
                p.y += (p.targetY - p.y) * 0.05;
            }

            // Movimiento base
            p.x += p.dx;
            p.y += p.dy;

            // Atracción al mouse
            const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
            if (dist < 90) {
                const attraction = 0.01;
                p.x += (mouse.x - p.x) * attraction;
                p.y += (mouse.y - p.y) * attraction;
            }

            // Si debe ir al centro (forma redonda)
            if (p.toCenter) {
                const cx = width / 2;
                const cy = height / 2;

                // Vector hacia el centro + offset aleatorio
                const targetX = cx + (p.offsetX || 0);
                const targetY = cy + (p.offsetY || 0);

                p.x += (targetX - p.x) * p.speedFactor;
                p.y += (targetY - p.y) * p.speedFactor;
            }

            // Reaparecer bordes
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            // Dibujar
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, ${p.alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

// Función al click del botón
function convergeToCenterAndRedirect(link) {
    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = 100; // radio de la bola central
    const vibration = 2000;  // amplitud de vibración radial
    const duration = 800; // duración de la convergencia

    particles.forEach(p => {
        p.toCenter = true;

        // Ángulo y radio aleatorio para distribuir partículas dentro de la bola
        // Distribución dentro de un círculo centrado
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * maxRadius;

        p.targetX = cx + radius * Math.cos(angle);
        p.targetY = cy + radius * Math.sin(angle);

        p.speedFactor = 0.02 + Math.random() * 0.08; // velocidades diferentes
    });

    let startTime = null;

    function animateConverge(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const time = Date.now() * 0.005;

        particles.forEach(p => {
            // Vector hacia la posición final
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;

            // Distancia y vibración radial
            const dist = Math.hypot(dx, dy);
            const angleVib = Math.random() * Math.PI * 2;
            const vib = vibration * (1 - progress);

            // Actualizar posición hacia el target con velocidad individual y vibración
            p.x += dx * p.speedFactor + Math.cos(angleVib) * vib * 0.05;
            p.y += dy * p.speedFactor + Math.sin(angleVib) * vib * 0.05;
        });

        if (progress < 1) {
            requestAnimationFrame(animateConverge);
        } else {
            // Al final, guardar flag para expandir partículas en la siguiente página
            sessionStorage.setItem('expandParticles', 'true');
            window.location.href = link;
        }
    }

    requestAnimationFrame(animateConverge);
}
