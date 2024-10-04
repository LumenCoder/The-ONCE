document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.querySelector('.matrix');
    const ctx = canvas.getContext('2d');
    const loadingText = document.querySelector(".loading-text");
    const beginButton = document.getElementById("begin-button");
    const bioSection = document.getElementById("bio-section");
    const loadingSection = document.getElementById("loading-section");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}<>?';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1); // Initialize the matrix "rain"

    let matrixColor = "#ffffff"; // Default matrix color
    let matrixSpeed = 33; // Default matrix speed
    let matrixInterval;

    // Function to draw the matrix animation
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = matrixColor; // Apply the matrix color
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Start matrix animation
    function startMatrix(speed = 33) {
        clearInterval(matrixInterval);
        matrixInterval = setInterval(drawMatrix, speed);
    }
    startMatrix(matrixSpeed); // Start with default speed

    // Fade in the loading text after 1 second
    setTimeout(() => {
        loadingText.style.opacity = "1"; // Fades in text
    }, 1000);

    // Show the "Begin" button after 5 seconds
    setTimeout(() => {
        beginButton.style.display = "block"; // Show button
        setTimeout(() => { // Trigger opacity change after display is set to block
            beginButton.style.opacity = "1"; // Fade-in the button
        }, 100); // Small delay to ensure button appears correctly
    }, 5000);

    // Gradually change matrix color on hover
    beginButton.addEventListener("mouseover", function () {
        let currentColor = 255; // Start with white (RGB: 255,255,255)
        const colorChangeInterval = setInterval(() => {
            if (currentColor > 0) {
                currentColor -= 5; // Gradually reduce the color towards red (255,0,0)
                matrixColor = `rgb(${currentColor},${currentColor},${currentColor})`;
            } else {
                clearInterval(colorChangeInterval); // Stop once fully red
            }
        }, 50);
        // Gradually slow down matrix animation speed on hover
        const speedChangeInterval = setInterval(() => {
            if (matrixSpeed < 100) {
                matrixSpeed += 2; // Gradually slow down the matrix
                startMatrix(matrixSpeed);
            } else {
                clearInterval(speedChangeInterval); // Stop once fully slowed down
            }
        }, 50);
    });

    beginButton.addEventListener("mouseout", function () {
        let currentColor = 0; // Start with red (RGB: 255,0,0)
        const colorChangeInterval = setInterval(() => {
            if (currentColor < 255) {
                currentColor += 5; // Gradually return to white
                matrixColor = `rgb(${currentColor},${currentColor},${currentColor})`;
            } else {
                clearInterval(colorChangeInterval); // Stop once fully white
            }
        }, 50);
        // Gradually restore matrix speed on mouse out
        const speedChangeInterval = setInterval(() => {
            if (matrixSpeed > 33) {
                matrixSpeed -= 2; // Gradually speed up the matrix
                startMatrix(matrixSpeed);
            } else {
                clearInterval(speedChangeInterval); // Stop once back to normal speed
            }
        }, 50);
    });

    // Handle "Begin" button click
    beginButton.addEventListener("click", function () {
        beginButton.classList.add("glitch");
        matrixColor = "#ff0000"; // Change matrix color to red instantly on click

        setTimeout(() => {
            // Fade out the button, loading text, and matrix
            beginButton.style.opacity = "0";
            loadingText.style.opacity = "0";
            canvas.style.opacity = "0"; // Matrix fades out

            // After the fade-out, transition to the bio section
            setTimeout(() => {
                loadingSection.style.display = "none"; // Hide loading section
                bioSection.classList.remove("hidden"); // Show the bio section
                bioSection.classList.add("visible");
            }, 1000); // Matches fade-out duration
        }, 2000); // Wait for glitch effect duration before fading out
    });
});
