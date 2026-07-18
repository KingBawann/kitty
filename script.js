// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    // Hero animations
    tl.to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.5 // Add slight delay since loader is gone
    })
    .to(".hero-subtitle", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .to(".celebrate-btn", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .to(".scroll-indicator", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5");

    // Vertical Scroll Gallery Animations
    const galleryItems = gsap.utils.toArray(".gallery-item");

    galleryItems.forEach(item => {
        // Fade in and scale up as they scroll into view
        gsap.fromTo(item, 
            { opacity: 0, y: 100, scale: 0.9 },
            {
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

    });

    // Celebrate Button Interaction
    const btn = document.querySelector(".celebrate-btn");
    btn.addEventListener("click", () => {
        // Confetti explosion
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // Side fireworks
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            
            // Falling from top
            confetti(Object.assign({}, defaults, { 
                particleCount: Math.floor(particleCount / 1.5), 
                origin: { x: randomInRange(0.1, 0.9), y: -0.1 }, 
                angle: 270, 
                spread: 120, 
                startVelocity: 15 
            }));
        }, 250);

        // Background Pulse Effect
        gsap.to(".bg-orbs", {
            opacity: 1,
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 5,
            ease: "power1.inOut",
            onComplete: () => {
                gsap.to(".bg-orbs", { scale: 1, duration: 1 });
            }
        });
        
        // Button pop effect
        gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });

    // Reveal Secret Button on Scroll
    const secretBtn = document.querySelector(".secret-btn");
    
    if (secretBtn) {
        gsap.to(secretBtn, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            pointerEvents: "auto",
            scrollTrigger: {
                trigger: ".footer",
                start: "top 95%", // Show button when reaching the footer
                toggleActions: "play reverse play reverse" // Fade in on scroll down, fade out on scroll up
            }
        });
    }

    // Secret Reveal on Click
    const secretContainer = document.querySelector(".final-picture-container");
    
    if (secretBtn && secretContainer) {
        let isSecretVisible = false;

        secretBtn.addEventListener("click", () => {
            if (!isSecretVisible) {
                // Show the secret
                isSecretVisible = true;
                secretBtn.textContent = "Hide Memory";
                secretContainer.style.display = 'flex';
                gsap.to(secretContainer, {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out"
                });
                // Removed lenis.scrollTo so the button stays in place
            } else {
                // Hide the secret
                isSecretVisible = false;
                secretBtn.textContent = "Another Memory";
                gsap.to(secretContainer, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: "power2.in",
                    onComplete: () => {
                        secretContainer.style.display = 'none';
                    }
                });
            }
        });
    }
});
