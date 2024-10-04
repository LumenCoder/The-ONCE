// Wait for the DOM to load before running any scripts
document.addEventListener("DOMContentLoaded", function() {

    // 1. Matrix Animation Effect (for loading screen)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.querySelector('.matrix-animation').appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:<>/?';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize); // Number of columns for the rain
    const drops = Array(columns).fill(1); // Initialize the drops

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Translucent background to fade out characters
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ffffff'; // White matrix characters
        ctx.font = fontSize + 'px monospace';

        // Loop through the drops array
        for (let i = 0; i < drops.length; i++) {
            const text = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Randomly reset the drop (creating the falling effect)
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(drawMatrix, 33); // Draw every 33 milliseconds (~30 FPS)

    // 2. Handle the "Begin" Button Click
    const beginButton = document.getElementById("begin-button");
    const loadingSection = document.getElementById("loading-section");
    const bioSection = document.getElementById("bio-section");

    beginButton.addEventListener("click", function() {
        // Add glitch effect for 2 seconds
        beginButton.classList.add('glitching');
        setTimeout(() => {
            beginButton.classList.remove('glitching');
            // Transition to bio section
            transitionToBio();
        }, 2000);
    });

    function transitionToBio() {
        // Fade out matrix effect
        const fadeOutInterval = setInterval(() => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }, 30);

        setTimeout(() => {
            clearInterval(fadeOutInterval);
            loadingSection.style.display = "none"; // Hide loading section
            bioSection.classList.remove("hidden"); // Show bio section
            bioSection.classList.add("visible");

            // Start bio section typing effect
            typewriterEffect();
        }, 1000); // Give time for the matrix to fade out
    }

    // 3. Typewriter Effect with Matrix Glitch
    const bioText = "A fun coder who likes to make projects. He has a YouTube channel and makes edits. Ever since he was 14, he loved to code. He lives in the United States and plans to be a full stack developer.";
    const bioTextElement = document.getElementById("bio-text");

    let charIndex = 0;

    function typewriterEffect() {
        if (charIndex < bioText.length) {
            let randomChars = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
            let typedChar = bioText[charIndex];

            // Random character matrix-style glitch before the real character
            bioTextElement.innerHTML += `<span>${randomChars}</span>`;
            setTimeout(() => {
                bioTextElement.innerHTML = bioTextElement.innerHTML.slice(0, -1) + typedChar;
                charIndex++;
                typewriterEffect();
            }, 100); // Typing speed (including glitch)
        }
    }
});
// Continue from the previous JavaScript code...

// 4. Handle click on social text to show social links
const socialText = document.getElementById("social-text");
const socialLinksSection = document.getElementById("social-links-section");

socialText.addEventListener("click", function() {
    reverseTypewriterEffect(bioTextElement, function() {
        // After bio text disappears, show social links section
        bioSection.style.display = "none"; // Hide bio section
        socialLinksSection.classList.remove("hidden"); // Show social links section
        socialLinksSection.classList.add("visible");

        // Start the typewriter effect for social links
        typewriterEffectSocials();
    });
});

// 5. Reverse Typewriter Effect
function reverseTypewriterEffect(element, callback) {
    let text = element.innerHTML;
    let charIndex = text.length;

    function eraseCharacter() {
        if (charIndex > 0) {
            // Apply reverse matrix glitch before removing each character
            let randomChars = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
            element.innerHTML = element.innerHTML.slice(0, -1) + `<span>${randomChars}</span>`;

            setTimeout(() => {
                element.innerHTML = element.innerHTML.slice(0, -1); // Remove character
                charIndex--;
                eraseCharacter(); // Continue removing characters
            }, 50); // Speed of reverse typewriter
        } else {
            // When all characters are removed, call the callback to proceed to the next step
            callback();
        }
    }

    eraseCharacter();
}

// 6. Typewriter Effect for Social Links
const socialLinksText = [
    "My YouTube Channels",
    "My Snapchat",
    "My TikTok",
    "My Instagram",
    "My Github"
];

function typewriterEffectSocials() {
    const socialLinksContent = document.querySelector('.social-links-content ul');
    socialLinksContent.innerHTML = ''; // Clear previous content

    let linkIndex = 0;

    function typeNextLink() {
        if (linkIndex < socialLinksText.length) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = "#"; // Add actual links later
            a.target = "_blank";
            a.textContent = socialLinksText[linkIndex];
            a.classList.add('social-link');
            li.appendChild(a);
            socialLinksContent.appendChild(li);

            // Apply glitch effect on each link as it's typed out
            let randomChars = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
            a.innerHTML = `<span>${randomChars}</span>`; // Show random matrix character

            setTimeout(() => {
                a.innerHTML = socialLinksText[linkIndex]; // Replace with the real link text
                linkIndex++;
                typeNextLink();
            }, 150); // Speed of typing each link
        }
    }

    typeNextLink();
}

// 7. Handle "Bye" animation and redirect on social link click
document.querySelector('.social-links-content').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault(); // Prevent immediate redirect

        // "Bye" animation: reverse typewriter for social links + matrix code animation
        reverseTypewriterEffect(document.querySelector('.social-links-content ul'), function() {
            // After reverse typewriter effect, show matrix code and fade out
            showByeMatrixEffect(event.target.href); // Pass the URL to redirect after animation
        });
    }
});

function showByeMatrixEffect(url) {
    const canvas = document.querySelector('canvas');
    
    const byeMatrixInterval = setInterval(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Accelerate matrix code for the "Bye" effect
        drawMatrix(); // Continue the matrix animation
    }, 30);

    setTimeout(() => {
        clearInterval(byeMatrixInterval); // Stop the animation after 2 seconds
        window.location.href = url; // Redirect to the social link URL
    }, 2000); // Wait for 2 seconds before redirecting
}
