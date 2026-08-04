// ═══════════════════════════════════════════════
// SUNSET BIRTHDAY — PREMIUM SCRIPT
// ═══════════════════════════════════════════════

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ═══════════════════════════════════════════
    // 1. ENTRANCE SPLASH SCREEN
    // ═══════════════════════════════════════════
    const entranceScreen = document.getElementById("entranceScreen");
    const enterBtn = document.getElementById("enterBtn");
    const entranceLine = document.querySelector(".entrance-line");

    // Lock scroll while entrance is showing
    document.body.classList.add("no-scroll");

    // Animate entrance elements in
    const entranceTl = gsap.timeline({ delay: 0.3 });
    entranceTl
        .to(".entrance-pretext", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        })
        .to(".entrance-title", {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.5")
        .add(() => {
            entranceLine.classList.add("animate");
        }, "-=0.3")
        .to(".entrance-btn", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5");

    // Click to enter
    enterBtn.addEventListener("click", () => {
        // Animate button press
        gsap.to(enterBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut"
        });

        // Fade out entrance
        setTimeout(() => {
            entranceScreen.classList.add("hidden");
            document.body.classList.remove("no-scroll");

            // Start hero animations after entrance fades
            setTimeout(() => {
                startHeroAnimations();
                initScrollAnimations();
            }, 600);
        }, 200);
    });


    // ═══════════════════════════════════════════
    // 2. HERO ANIMATIONS
    // ═══════════════════════════════════════════
    function startHeroAnimations() {
        const tl = gsap.timeline();

        tl.to(".hero-title", {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
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
    }


    // ═══════════════════════════════════════════
    // 3. ALL SCROLL-BASED ANIMATIONS
    // ═══════════════════════════════════════════
    function initScrollAnimations() {

        // Section Dividers
        document.querySelectorAll(".section-divider").forEach(divider => {
            const lines = divider.querySelectorAll(".divider-line");
            const diamond = divider.querySelector(".divider-diamond");

            ScrollTrigger.create({
                trigger: divider,
                start: "top 85%",
                onEnter: () => {
                    lines.forEach(line => line.classList.add("drawn"));
                    diamond.classList.add("visible");
                },
                onLeaveBack: () => {
                    lines.forEach(line => line.classList.remove("drawn"));
                    diamond.classList.remove("visible");
                }
            });
        });

        // Gallery Scroll Animations (staggered)
        const galleryItems = gsap.utils.toArray(".gallery-item");

        galleryItems.forEach((item, index) => {
            const xOffset = index % 2 === 0 ? -40 : 40;

            gsap.fromTo(item, 
                { opacity: 0, y: 60, x: xOffset, scale: 0.85 },
                {
                    opacity: 1, 
                    y: 0, 
                    x: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 88%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Animate item headers
        gsap.utils.toArray(".item-header").forEach(header => {
            gsap.fromTo(header,
                { opacity: 0, y: 20 },
                {
                    opacity: 0.9,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: header,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Animate section title
        gsap.fromTo(".section-title",
            { opacity: 0, y: 40, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".section-title",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Animate footer text
        gsap.fromTo(".footer-text",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".footer-text",
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Parallax Hero Effect
        gsap.to(".hero-content", {
            y: -80,
            opacity: 0.3,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });

        // Secret Button (scroll-reveal)
        const secretBtn = document.querySelector(".secret-btn");
        
        if (secretBtn) {
            gsap.fromTo(secretBtn,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".footer",
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Lightbox
        initLightbox(galleryItems);

        // Secret Picture Reveal
        initSecretReveal(secretBtn);
    }


    // ═══════════════════════════════════════════
    // 4. LIGHTBOX MODAL
    // ═══════════════════════════════════════════
    function initLightbox(galleryItems) {
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightboxImg");
        const lightboxClose = document.getElementById("lightboxClose");

        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                const img = item.querySelector("img");
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    lightbox.classList.add("open");
                    document.body.classList.add("no-scroll");
                }
            });
        });

        function closeLightbox() {
            lightbox.classList.remove("open");
            document.body.classList.remove("no-scroll");
        }

        lightboxClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeLightbox();
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightbox.classList.contains("open")) {
                closeLightbox();
            }
        });
    }


    // ═══════════════════════════════════════════
    // 5. SECRET PICTURE REVEAL
    // ═══════════════════════════════════════════
    function initSecretReveal(secretBtn) {
        const secretContainer = document.querySelector(".final-picture-container");
        
        if (secretBtn && secretContainer) {
            let isSecretVisible = false;

            secretBtn.addEventListener("click", () => {
                if (!isSecretVisible) {
                    isSecretVisible = true;
                    secretBtn.textContent = "Hide Memory";
                    secretContainer.style.display = 'flex';
                    gsap.to(secretContainer, {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        ease: "power3.out"
                    });
                } else {
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
    }


    // ═══════════════════════════════════════════
    // 6. CELEBRATE CONFETTI
    // ═══════════════════════════════════════════
    const btn = document.querySelector(".celebrate-btn");
    btn.addEventListener("click", () => {
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
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            
            confetti(Object.assign({}, defaults, { 
                particleCount: Math.floor(particleCount / 1.5), 
                origin: { x: randomInRange(0.1, 0.9), y: -0.1 }, 
                angle: 270, 
                spread: 120, 
                startVelocity: 15 
            }));
        }, 250);

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
        
        gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });


    // ═══════════════════════════════════════════
    // 7. CURSOR GLOW (desktop only)
    // ═══════════════════════════════════════════
    const cursorGlow = document.getElementById("cursorGlow");
    
    if (cursorGlow && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        cursorGlow.classList.add("active");
        
        document.addEventListener("mousemove", (e) => {
            cursorGlow.style.left = e.clientX + "px";
            cursorGlow.style.top = e.clientY + "px";
        });
    }

});
