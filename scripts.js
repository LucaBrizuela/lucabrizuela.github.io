// --- ANIMATED BACKGROUND ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particles = [];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 210, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// --- TYPING EFFECT ---
function typeEffect(element, speed) {
    const text = element.innerText;
    element.innerText = "";
    let i = 0;

    const timer = setInterval(() => {
        if (i < text.length) {
            element.append(text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

document.addEventListener("DOMContentLoaded", () => {
    initCanvas();
    createParticles();
    animate();

    const bio = document.getElementById('bio-text');
    if (bio) typeEffect(bio, 30);

    const certText = document.getElementById('cert-text');
    if (certText) {
        certText.innerText = `Stepping into a career in software and web development requires a balance of hard and soft skills.
This certification guided me through professional communication, elevator pitch development, and technical growth using the MERN stack.
The program covered Web Development fundamentals, Front-End Development with React, and Back-End Development with Node.js and Express,
preparing me to enter the tech industry as an entry-level full-stack developer or to specialize further.`;

        typeEffect(certText, 20);
    }
});

window.addEventListener('resize', initCanvas);


