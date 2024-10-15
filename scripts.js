// Matrix Animation Setup
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.matrix-background').appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = Array(256).join(1).split('');
const fontSize = 16;
const columns = canvas.width / fontSize;
let matrixColor = { r: 0, g: 255, b: 0 }; // Green during loading

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fading effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = `rgb(${matrixColor.r}, ${matrixColor.g}, ${matrixColor.b})`;
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

// Smoothly Transition Matrix to Red
function smoothTransitionToRed(duration = 2000) {
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        matrixColor.g = Math.floor(255 * (1 - progress)); // Green fades out
        matrixColor.r = Math.floor(255 * progress); // Red fades in

        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Typewriter Effect with Proper Line Breaks
function typeWriterEffect(element, text, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            // Handle line breaks with '\n'
            if (text[i] === '\n') {
                element.innerHTML += '<br>'; // Add a new line
            } else {
                element.textContent += text[i]; // Add the character
            }
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Transition to Bio Section
setTimeout(() => {
    console.log("Starting red transition...");
    smoothTransitionToRed(); // Start red transition

    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0'; // Fade out loading screen
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none'; // Hide loading screen

            const bioSection = document.getElementById('bio-section');
            bioSection.style.display = 'block';
            bioSection.style.transition = 'opacity 2s';
            bioSection.style.opacity = '1'; // Fade in bio section

            // Start typewriter effect for bio text
            const bioText = 
                "Lumen's Bio\n" +
                "A fun coder who likes to make projects.\n" +
                "He has a YouTube channel and makes edits.\n" +
                "Ever since he was 14, he loved to code.\n" +
                "He lives in the United States and plans to be a full stack developer.";
            typeWriterEffect(document.querySelector('.bio-text'), bioText, 100);
        }, 1000); // Ensure loading screen is fully hidden before showing bio
    }, 2000); // Wait for red transition to finish

}, 5000); // 5-second loading delay
