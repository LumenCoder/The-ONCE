// Matrix Animation
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.matrix-background').appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = Array(256).join(1).split('');
const fontSize = 16;
const columns = canvas.width / fontSize; // Number of columns for the rain

let matrixColor = '#00FF00'; // Initial matrix color (green)

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fading effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = matrixColor; // Matrix color (will change to red)
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
const matrixInterval = setInterval(drawMatrix, 50);

// Function to fade the matrix out and change to red
function fadeMatrixToRed() {
    matrixColor = '#FF0000'; // Change matrix color to red
    console.log("Matrix color changed to red");

    setTimeout(() => {
        canvas.style.transition = 'opacity 2s';
        canvas.style.opacity = '0'; // Fade out matrix
        console.log("Matrix is fading out");
    }, 1000); // Wait 1 second before fading out
}

// Typewriter Effect with Matrix Characters Flash
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

// Transition from Loading Screen to Bio Section after 5 seconds
setTimeout(() => {
    // Fade matrix to red and then transition
    console.log("Fading matrix to red...");
    fadeMatrixToRed();

    setTimeout(() => {
        // Hide loading screen and show bio section
        document.getElementById('loading-screen').style.display = 'none';
        const bioSection = document.getElementById('bio-section');
        bioSection.style.display = 'block';
        bioSection.style.transition = 'opacity 2s'; // Smooth fade-in for bio
        bioSection.style.opacity = '1';
        console.log("Bio section is now visible");

        // Start typewriter effect for bio text
        typeWriterEffect(document.querySelector('.bio-text h1'), "Lumen's Bio", 500);
        const bioText = "A fun coder who likes to make projects. He has a YouTube channel and makes edits. Ever since he was 14, he loved to code. He lives in the United States and plans to be a full stack developer.";
        typeWriterEffect(document.querySelector('.bio-text p'), bioText, 1000);
    }, 2000); // Wait for matrix to fade out before showing bio

}, 5000); // 5 seconds delay before transitioning
