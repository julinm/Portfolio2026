const canvas = document.getElementById('dustCanvas');
const ctx = canvas.getContext('2d');
const isMobile = window.innerWidth <= 768;

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Particulas flotantes
const particles = [];
const particleCount = isMobile ? 200 : 1000; 

// Partículas fijas
const stars = [];
const starCount = isMobile ? 25 : 120;

// Inicializar partículas fijas
for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.3, // tamaño pequeñito
        alpha: Math.random() * 0.5 + 0.7    // brillo variable
    });
}

 
// Inicializar partículas flotantes
for (let i = 0; i < particleCount; i++) {

    const depth = Math.random();

    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        depth: depth,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
        dx: (Math.random() - 0.5) * 0.2,
        dy: -Math.random() * 0.2,
        toCenter: false,
        targetX: null,
        targetY: null,
        speedFactor: 0.05 + depth  * 0.3, 
        isBright: Math.random() < 0.3
    });
}

function initParticles(particleColor) {
    // Si venimos de otra página, expandir desde el centro
    if (sessionStorage.getItem('expandParticles') === 'true') {
        particles.forEach(p => {
            // Parten del centro
                p.x = width / 2;
                p.y = height / 2;

                // Target aleatorio en cualquier punto del canvas
                p.targetX = Math.random() * width;
                p.targetY = Math.random() * height;

                // Mantener movimiento normal después de llegar
                p.dx = (Math.random() - 0.5) * 0.2;
                p.dy = -Math.random() * 0.2;
        });
        sessionStorage.removeItem('expandParticles');
    }

    // Mouse
    let mouse = { x: width / 2, y: height / 2 };
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Touch
    window.addEventListener('touchmove', e => {
        // e.touches es un array de todos los dedos tocando la pantalla
        if(e.touches.length > 0){
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    }, { passive: true });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // tiempo para vibración
        const time = Date.now() * 0.005;

        //Particulas fijas
        stars.forEach(s => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${200 + Math.random()*20}, ${200 + Math.random()*20}, ${220 + Math.random()*20}, ${s.alpha})`;
            ctx.shadowBlur = s.radius * 2;
            ctx.shadowColor = `rgba(220, 220, 255, ${s.alpha})`;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        //Partículas flotantes
        particles.forEach(p => {
            // Si tiene posición target (expandir), animar hacia allí
            if (p.targetX !== null && p.targetY !== null) {
                p.x += (p.targetX - p.x) * 0.05;
                p.y += (p.targetY - p.y) * 0.05;

                // Una vez que llega cerca del target, liberamos la partícula
                if (Math.hypot(p.targetX - p.x, p.targetY - p.y) < 1) {
                    p.targetX = null;
                    p.targetY = null;

                    // recuperar movimiento normal
                    p.dx = (Math.random() - 0.5) * 0.2;
                    p.dy = -Math.random() * 0.2;
                }
            }

            // Movimiento base
            p.x += p.dx;
            p.y += p.dy;

            // Atracción al mouse
            const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
            if (dist < 90) {
                const attraction = 0.03;
                p.x += (mouse.x - p.x) * attraction;
                p.y += (mouse.y - p.y) * attraction;
            }

            // Si debe ir al círculo central
            if (p.toCenter) {
                const cx = width / 2;
                const cy = height / 2;

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

            let r = particleColor.r;
            let g = particleColor.g;
            let b = particleColor.b;
            let alpha = p.alpha;

            // Si la partícula es “brillante”, le asignamos un color casi beige claro
            if (p.isBright) {
                r = 229;
                g = 229;
                b = 229;
                alpha = 0.7 + Math.random() * 0.1;
            }

            // Profundidad visual
            ctx.shadowBlur = p.depth * 8;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha})`; 
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`; 
            ctx.fill();
            ctx.shadowBlur = 0;
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
    const maxRadius = 75; // radio del círculo
    const vibration = 250;  // amplitud de vibración radial
    const duration = 500; // duración

    particles.forEach(p => {
        p.toCenter = Math.random() > 0.02;

        if (p.toCenter) {
            // Solo las que van al centro reciben target
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * maxRadius;
            p.targetX = cx + radius * Math.cos(angle);
            p.targetY = cy + radius * Math.sin(angle);
        } else {
            // Las que no van al centro quedan flotando
            p.targetX = null;
            p.targetY = null;
        }

        // Diferentes velocidades
        p.speedFactor = 0.02 + Math.pow(Math.random(), 2) * 0.15;
    });

    let startTime = null;

    function animateConverge(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        particles.forEach(p => {
            if (p.toCenter && p.targetX !== null && p.targetY !== null) {
                const dx = p.targetX - p.x;
                const dy = p.targetY - p.y;

                const angleVib = Math.random() * Math.PI * 2;
                const vib = vibration * (1 - progress);

                p.x += dx * p.speedFactor + Math.cos(angleVib) * vib * 0.01;
                p.y += dy * p.speedFactor + Math.sin(angleVib) * vib * 0.01;
            }
        });

        if (progress < 1) {
            requestAnimationFrame(animateConverge);
        } else {
            sessionStorage.setItem('expandParticles', 'true');
            window.location.href = link;
        }
    }

    requestAnimationFrame(animateConverge);
}
