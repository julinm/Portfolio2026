const canvas = document.getElementById('dustCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Generar partículas
const particles = [];
const particleCount = 1000; 

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5, // tamaño de la partícula
        alpha: Math.random() * 0.5 + 0.1, // transparencia
        dx: (Math.random() - 0.5) * 0.2, // velocidad horizontal
        dy: -Math.random() * 0.3 // velocidad vertical hacia arriba
    });
}

// Animar partículas
function initDustCanvas() {
    const canvas = document.getElementById('dustCanvas');
    if (!canvas) return; // Si no hay canvas en esta página, no hace nada

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Generar partículas
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.5 + 0.1,
            dx: (Math.random() - 0.5) * 0.2,
            dy: -Math.random() * 0.3
        });
    }
}

    // Animar partículas
    function initParticles(particleColor) {
    const canvas = document.getElementById('dustCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 1000; // ajusta cantidad

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.3 + 0.05,
            dx: (Math.random() - 0.5) * 0.2,
            dy: -Math.random() * 0.2
        });
    }

    let mouse = { x: width / 2, y: height / 2 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            // Movimiento base (para cubrir siempre la pantalla)
            p.x += p.dx;
            p.y += p.dy;

            // Atracción solo si está dentro de cierto radio del mouse
            const distance = Math.hypot(p.x - mouse.x, p.y - mouse.y);
            if (distance < 90) { // radio de atracción
                const attraction = 0.01; // fuerza de atracción
                p.x += (mouse.x - p.x) * attraction;
                p.y += (mouse.y - p.y) * attraction;
            }

            // Dibujar
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, ${p.alpha})`;
            ctx.fill();

            // Reaparecer al salir de los bordes (garantiza que siempre esté lleno)
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}