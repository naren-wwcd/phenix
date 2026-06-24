/**
 * PHENIX BIOGAS INFRASTRUCTURE ENGINE
 * Core Frontend Interactivity Framework v2.1.0
 */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize all core interaction layers
    initScrollAnimations();
    initAnimatedCounters();
    initMapTelemetry();
    initArchitecturalModal();
});

/**
 * 1. GSAP ScrollTrigger Reveal Animations
 * Automatically tracks elements with .reveal-up, .reveal-left, and .reveal-right
 * classes as they scroll into the viewport window.
 */
function initScrollAnimations() {
    // Ensure GSAP and ScrollTrigger plugins are loaded locally or via CDN
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // Vertical Reveal Up
        gsap.utils.toArray(".reveal-up").forEach(element => {
            gsap.fromTo(element, 
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Horizontal Reveal Left-to-Right
        gsap.utils.toArray(".reveal-left").forEach(element => {
            gsap.fromTo(element, 
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Horizontal Reveal Right-to-Left
        gsap.utils.toArray(".reveal-right").forEach(element => {
            gsap.fromTo(element, 
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }
}

/**
 * 2. Auto-Incrementing Impact Counters
 * Animates analytical numerical vectors on the Impact page from 0 to target value 
 * using scroll thresholds.
 */
function initAnimatedCounters() {
    const counters = document.querySelectorAll(".counter");
    if (counters.length === 0) return;

    const countTo = (counter) => {
        const target = +counter.getAttribute("data-target");
        const duration = 2000; // Animation lifecycle time in milliseconds
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth mathematical slowdown
            const easeOutQuad = progress * (2 - progress);
            const currentValue = Math.floor(easeOutQuad * target);

            counter.innerText = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };

        requestAnimationFrame(updateCount);
    };

    // Trigger calculation when numbers hit the visual range via ScrollTrigger if available
    if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.create({
            trigger: ".stats-wall",
            start: "top 85%",
            onEnter: () => {
                counters.forEach(c => countTo(c));
            }
        });
    } else {
        // Fallback execution if dependency loops are delayed
        counters.forEach(c => countTo(c));
    }
}

/**
 * 3. Regional Map Telemetry Module
 * Binds regional geo-location coordinates to a highly responsive tracker tooltip viewport.
 */
function initMapTelemetry() {
    const tooltip = document.getElementById("map-tooltip");
    const pins = document.querySelectorAll(".map-pin");
    if (!tooltip || pins.length === 0) return;

    pins.forEach(pin => {
        // Hover state listener
        pin.addEventListener("mouseenter", () => {
            const info = pin.getAttribute("data-info");
            tooltip.innerText = info;
            tooltip.style.opacity = "1";
            tooltip.style.visibility = "visible";
            tooltip.classList.add("active");
        });

        // Mouse motion vector mapping
        pin.addEventListener("mousemove", (e) => {
            const mapWrapper = pin.parentElement;
            const mapRect = mapWrapper.getBoundingClientRect();
            
            // Offset coordinates smoothly around mouse point indices
            const leftPos = e.clientX - mapRect.left + 15;
            const topPos = e.clientY - mapRect.top + 15;
            
            tooltip.style.left = `${leftPos}px`;
            tooltip.style.top = `${topPos}px`;
        });

        // Mouse exit listener
        pin.addEventListener("mouseleave", () => {
            tooltip.style.opacity = "0";
            tooltip.style.visibility = "hidden";
            tooltip.classList.remove("active");
            tooltip.innerText = "Hover over regional pins";
        });
    });
}

/**
 * 4. Deep-Dive Architectural Modal Overlay
 * Handles programmatic data generation for engineering card overlays.
 */
function initArchitecturalModal() {
    const overlay = document.querySelector(".modal-overlay");
    const closeBtn = document.querySelector(".modal-close-btn");
    const modalBody = document.querySelector(".modal-body-render");
    const triggers = document.querySelectorAll("[data-modal-target]");

    if (!overlay || !closeBtn || !modalBody) return;

    // Open Modal with targeted dataset content
    triggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const targetType = trigger.getAttribute("data-modal-target");
            
            // Build situational technical specifications content inside modal context windows
            if (targetType === "hardware-spec") {
                modalBody.innerHTML = `
                    <h3 class="text-2xl font-bold text-amber uppercase mb-4">Anaerobic Hardware Blueprint</h3>
                    <p class="text-sm text-gray-300 mb-4">High-rate automated system arrays structured with high continuous loading specifications:</p>
                    <table class="w-full text-left text-xs border border-gray-800 text-gray-400">
                        <tr class="border-b border-gray-800 bg-black-pure"><th class="p-2">Parameter</th><th class="p-2">Engineering Value</th></tr>
                        <tr class="border-b border-gray-800"><td class="p-2">Core Temp Band</td><td class="p-2 text-green">55°C (Thermophilic)</td></tr>
                        <tr class="border-b border-gray-800"><td class="p-2">Volatile Solids Red.</td><td class="p-2 text-green">Up to 88% Net destruction</td></tr>
                        <tr><td class="p-2">Biomaterial Ingestion</td><td class="p-2 text-amber">Continuous Dual-Phase Feed</td></tr>
                    </table>
                `;
            } else {
                modalBody.innerHTML = `
                    <h3 class="text-2xl font-bold text-green uppercase mb-4">System Telemetry Matrix</h3>
                    <p class="text-sm text-gray-300">Live configuration arrays currently synchronizing edge monitoring streams to remote operational clouds.</p>
                `;
            }

            overlay.classList.add("active");
            document.body.style.overflow = "hidden"; // Clip underlying scrolling actions
        });
    });

    // Close Actions
    const closeModal = () => {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    };

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });
}