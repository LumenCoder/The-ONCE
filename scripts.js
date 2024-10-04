document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.querySelector('.matrix');
    const ctx = canvas.getContext('2d');
    const loadingText = document.querySelector(".loading-text");
    const beginButton = document.getElementById("begin-button");
    const bioSection = document.getElementById("bio-section");
    const loadingSection = document.getElementById("loading-section");
    const bioText = document.getElementById("bio-text");
    const socialsText = document.getElementById("socials-text");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}<>?';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1); // Initialize the matrix "rain"

    let matrixColor = "#ffffff"; // Default matrix color (white)
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
    });

    // When the "Begin" button is clicked, transition to bio section
    beginButton.addEventListener("click", function () {
        // Add glitch effect to the button
        beginButton.classList.add("glitch");

        // Transition: Slow down matrix animation
        let slowDownInterval = setInterval(() => {
            if (matrixSpeed < 100) {
                matrixSpeed += 2;
                startMatrix(matrixSpeed);
            } else {
                clearInterval(slowDownInterval); // Stop once fully slowed
                // Hide the loading section and show the bio section
                loadingSection.style.opacity = "0"; // Fade out loading section
                setTimeout(() => {
                    loadingSection.style.display = "none"; // Completely hide it
                    bioSection.style.display = "flex"; // Show bio section
                    setTimeout(() => {
                        bioSection.classList.add("visible"); // Fade-in bio
                        typewriterEffect(bioText, bioText.textContent, 0);
                        particleBackground(); // Start particle background
                    }, 100);
                }, 1000); // Wait for the fade out before changing sections
            }
        }, 50);
    });

    // Typewriter effect function
    function typewriterEffect(element, text, index) {
        if (index < text.length) {
            const matrixFlash = randomMatrixChars(10); // Flash random characters before typing the real one
            element.textContent = element.textContent.slice(0, index) + matrixFlash + text[index];
            setTimeout(() => {
                element.textContent = element.textContent.slice(0, index + 1); // Remove matrix chars and show correct letter
                typewriterEffect(element, text, index + 1);
            }, 100);
        } else if (element === bioText) {
            // After bio text is done typing, add interaction to socials text
            socialsText.addEventListener('click', handleSocialClick);
        }
    }

    // Function to flash random matrix characters before typing a real one
    function randomMatrixChars(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
        }
        return result;
    }

    // Handle click on socials text
    function handleSocialClick() {
        // Reverse typewriter effect to hide the bio
        reverseTypewriterEffect(bioText, bioText.textContent, bioText.textContent.length);
    }

    // Reverse typewriter effect function (hides text)
    function reverseTypewriterEffect(element, text, index) {
        if (index >= 0) {
            const matrixFlash = randomMatrixChars(10); // Flash random characters during removal
            element.textContent = element.textContent.slice(0, index) + matrixFlash;
            setTimeout(() => {
                element.textContent = element.textContent.slice(0, index - 1); // Remove matrix chars and remove the correct letter
                reverseTypewriterEffect(element, text, index - 1);
            }, 100);
        } else if (element === bioText) {
            // Once bio is hidden, transition the socials text to the top
            socialsText.style.position = 'absolute';
            socialsText.style.top = '10px';
            socialsText.textContent = 'Check out my socials below!';
            showSocialLinks(); // Show social media links
        }
    }

    // Function to show social links with typewriter effect
    function showSocialLinks() {
        const socialLinks = ['My YouTube Channels', 'My Snapchat', 'My TikTok', 'My Instagram', 'My Github'];
        const socialContainer = document.createElement('div');
        socialContainer.classList.add('social-links');
        bioSection.appendChild(socialContainer);

        socialLinks.forEach((link, index) => {
            const linkElement = document.createElement('p');
            linkElement.textContent = link;
            linkElement.classList.add('social-link');
            socialContainer.appendChild(linkElement);

            // Typewriter effect for each link
            setTimeout(() => {
                typewriterEffect(linkElement, link, 0);
            }, index * 500); // Delay between each link
        });
    }

    // Particle background effect for the bio section
    function particleBackground() {
        const particleCanvas = document.createElement('canvas');
        particleCanvas.classList.add('particle-canvas');
        bioSection.appendChild(particleCanvas);

        const pCtx = particleCanvas.getContext('2d');
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;

        const particlesArray = [];
        const numParticles = 100; // Adjust number of particles as needed

        // Particle class to define individual particles
        class Particle {
            constructor() {
                this.x = Math.random() * particleCanvas.width;
                this.y = Math.random() * particleCanvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = (Math.random() * 0.4) - 0.2;
                this.speedY = (Math.random() * 0.4) - 0.2;
                this.opacity = Math.random() * 0.5 + 0.1; // Low opacity
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Reset position when off-screen
                if (this.x < 0 || this.x > particleCanvas.width || this.y < 0 || this.y > particleCanvas.height) {
                    this.x = Math.random() * particleCanvas.width;
                    this.y = Math.random() * particleCanvas.height;
                }
            }
            draw() {
                pCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // White particles with low opacity
                pCtx.beginPath();
                pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                pCtx.fill();
            }
        }

               // Create particles and push them to the array
        function initParticles() {
            for (let i = 0; i < numParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        // Animate the particles
        function animateParticles() {
            pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            particlesArray.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        // Initialize and animate particles
        initParticles();
        animateParticles();

        // Update canvas size on window resize
        window.addEventListener('resize', () => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        });
    }
});
