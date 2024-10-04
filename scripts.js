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

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ffffff';
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

    let matrixInterval = setInterval(drawMatrix, 33);

    // Fade in the loading text after 1 second
    setTimeout(() => {
        loadingText.style.opacity = "1";
    }, 1000);

    // Show the "Begin" button after 5 seconds
    setTimeout(() => {
        beginButton.style.display = "block";
        beginButton.style.opacity = "1"; // Fade-in the button
    }, 5000);

    // Handle "Begin" button click
    beginButton.addEventListener("click", function () {
        beginButton.classList.add("glitch");

        setTimeout(() => {
            beginButton.style.display = "none"; // Hide button after glitch animation
            loadingSection.style.opacity = "0"; // Fade out matrix and loading text

            // After the fade-out transition, show the bio section
            setTimeout(() => {
                loadingSection.style.display = "none"; // Hide the entire loading section
                bioSection.classList.remove("hidden");
                bioSection.classList.add("visible"); // Show the bio section
            }, 1000); // Matches fade-out duration
        }, 2000); // Glitch animation duration
    });
});
