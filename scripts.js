// Matrix Animation
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.matrix-background').appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = Array(256).join(1).split('');
const fontSize = 16;
const columns = canvas.width / fontSize; // Number of columns for the rain

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fading effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF00'; // Matrix green color
    ctx.font = `${fontSize}px monospace`;

    letters.forEach((y_pos, index) => {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96); // Random Katakana characters
        const x_pos = index * fontSize;

        ctx.fillText(text, x_pos, y_pos);

        // Randomly reset letter positions
        letters[index] = (y_pos > canvas.height && Math.random() > 0.975) ? 0 : y_pos + fontSize;
    });
}

// Run the matrix effect at an interval
setInterval(drawMatrix, 50);

// Typewriter Effect
function typeWriterEffect(element, text, speed = 100) {
    let i = 0;

    function type() {
        if (i < text.length) {
            // Before each character appears, flash random characters briefly
            element.textContent += String.fromCharCode(0x30A0 + Math.random() * 96);
            setTimeout(() => {
                element.textContent = text.slice(0, i + 1); // Correct character replaces the random one
                i++;
                type(); // Call recursively until complete
            }, 50); // Matrix pre-flash duration
        }
    }

    setTimeout(type, speed); // Delay start if needed
}

// Button Interaction to Show Bio Section
document.getElementById('begin-btn').addEventListener('click', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const bioSection = document.getElementById('bio-section');

    // Smooth transition to bio section
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        bioSection.style.display = 'block';
        typeWriterEffect(document.querySelector('.bio-text h1'), "Lumen's Bio");
        typeWriterEffect(document.querySelector('.bio-text p'), "A fun coder who likes to make projects. He has a YouTube channel and makes edits. Ever since he was 14, he loved to code. He lives in the United States and plans to be a full stack developer.");
    }, 1000); // Delay to allow fade-out of the loading screen
});
