// Matrix Animation Setup
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.matrix-background').appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = Array(256).join(1).split('');
const fontSize = 16;
const columns = canvas.width / fontSize;
let matrixColor = { r: 0, g: 255, b: 0 }; // Start as green

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fading effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = `rgb(${matrixColor.r}, ${matrixColor.g}, ${matrixColor.b})`; // Matrix color
    ctx.font = `${fontSize}px monospace`;

    letters.forEach((y_pos, index) => {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        const x_pos = index * fontSize;
        ctx.fillText(text, x_pos, y_pos);

        letters[index] = (y_pos > canvas.height && Math.random() > 0.975) ? 0 : y_pos + fontSize;
    });
}

// Run Matrix Animation
setInterval(drawMatrix, 50);

// Smooth Red Transition
function smoothTransitionToRed(duration = 2000) {
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        matrixColor.g = Math.floor(255 * (1 - progress)); // Fade green to 0
        matrixColor.r = Math.floor(255 * progress); // Fade red to 255

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// Typewriter Effect with Full Text Handling
function typeWriterEffect(element, text, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += String.fromCharCode(0x30A0 + Math.random() * 96);
            setTimeout(() => {
                element.textContent = text.slice(0, i + 1);
                i++;
                type();
            }, 50);
        }
    }
    setTimeout(type, speed);
}

// Particle Background for Bio Section
function initParticles() {
    const particleCanvas = document.createElement('canvas');
    const particleCtx = particleCanvas.getContext('2d');
    document.getElementById('bio-section').appendChild(particleCanvas);

    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    const particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * particleCanvas.width,
        y: Math.random() * particleCanvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
    }));

    function drawParticles() {
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        particleCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';

        particles.forEach(p => {
            particleCtx.beginPath();
            particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            particleCtx.fill();
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > particleCanvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > particleCanvas.height) p.speedY *= -1;
        });

        requestAnimationFrame(drawParticles);
    }

    drawParticles();
}

// Transition to Bio Section
setTimeout(() => {
    smoothTransitionToRed(); // Start red transition

    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none'; // Hide loading screen
        const bioSection = document.getElementById('bio-section');
        bioSection.style.display = 'block';
        bioSection.style.opacity = '0';
        bioSection.style.transition = 'opacity 2s';
        setTimeout(() => {
            bioSection.style.opacity = '1'; // Fade in bio section
            initParticles(); // Initialize particle background
            typeWriterEffect(document.querySelector('.bio-text h1'), "Lumen's Bio", 500);
            const bioText = "A fun coder who likes to make projects. He has a YouTube channel and makes edits. Ever since he was 14, he loved to code. He lives in the United States and plans to be a full stack developer.";
            typeWriterEffect(document.querySelector('.bio-text p'), bioText, 1000);
        }, 100); // Slight delay to ensure smooth transition
    }, 2000); // Wait for red transition to finish
}, 5000); // 5-second loading delay
