/**
 * Phenix Front-End Operational Suite (Session 2)
 * Core Features: Counter Rollups, Map Tooltip Tracking, Portfolio Filtering, Modal State Injections
 */

document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins cleanly
    gsap.registerPlugin(ScrollTrigger);
    
    initGlobalScripts();
    if (document.querySelector('.stats-wall')) initImpactAnalytics();
    if (document.querySelector('.project-grid')) initProjectPortfolio();
});

/**
 * Universal Shared Page Components (Sticky Nav Control)
 */
function initGlobalScripts() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Universal GSAP Reveal Directives for Modern Structural Flows
    gsap.utils.toArray('.reveal-up').forEach(elem => {
        gsap.to(elem, {
            scrollTrigger: { trigger: elem, start: "top 85%", toggleActions: "play none none none" },
            opacity: 1, y: 0, duration: 1, ease: "power3.out"
        });
    });

    if(document.querySelector('.reveal-left')) {
        gsap.to('.reveal-left', {
            scrollTrigger: { trigger: '.reveal-left', start: "top 80%" },
            opacity: 1, x: 0, duration: 1.2, ease: "power2.out"
        });
    }

    if(document.querySelector('.reveal-right')) {
        gsap.to('.reveal-right', {
            scrollTrigger: { trigger: '.reveal-right', start: "top 80%" },
            opacity: 1, x: 0, duration: 1.2, ease: "power2.out"
        });
    }
}

/**
 * Impact and Analytics Systems Logic
 */
function initImpactAnalytics() {
    // Scroll-triggered precision counter metric logic
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 85%",
            onEnter: () => {
                let count = 0;
                const speed = target / 60; // 60 frames structural window execution
                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        counter.innerText = Math.floor(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            }
        });
    });

    // Interactive Map Tooltip Tracking Sequence
    const pins = document.querySelectorAll('.map-pin');
    const tooltip = document.getElementById('map-tooltip');

    pins.forEach(pin => {
        pin.addEventListener('mouseenter', (e) => {
            tooltip.innerText = e.target.getAttribute('data-info');
            tooltip.style.color = 'var(--amber-glow)';
        });
        pin.addEventListener('mouseleave', () => {
            tooltip.innerText = "Hover over regional pins";
            tooltip.style.color = '#fff';
        });
    });
}

/**
 * Project Portfolio Dynamic Repository Datastore & Operations
 */
const mockProjectData = {
    amul: {
        title: "Surat Dairy Effluent Treatment Facility",
        client: "Regional Milk Producers Cooperative",
        location: "Surat, Gujarat",
        capacity: "25 TPD Bio-CNG Matrix",
        before: "35,000 ppm chemical oxygen demand discharge raw loading stress.",
        after: "Zero environmental discharge penalty; 100% processing system thermal loop dependency self-supplied.",
        testimonial: "Phenix converted our downstream compliance nightmare into an unyielding profit center. The ROI window collapsed below 22 months.",
        author: "Director of Infrastructure Operations"
    },
    indore: {
        title: "Indore Smart City Solid Waste Nexus",
        client: "Municipal Urban Cleanliness Enterprise",
        location: "Indore, Madhya Pradesh",
        capacity: "500 Tonnes Progressive Input Capacity",
        before: "Landfill load aggregation hitting 400 metric tonnes daily expansion margins.",
        after: "Complete elimination of regional organic degradation vectors; fuels municipal urban mass transit networks.",
        testimonial: "This plant forms the absolute spine of our zero-waste municipal vision. Pure technological execution.",
        author: "Chief Municipal Commissioner"
    },
    punjab: {
        title: "Punjab Paddy Straw Bio-CNG Matrix",
        client: "Agricultural Grid Aggregation Syndicate",
        location: "Sangrur, Punjab",
        capacity: "35 TPD Bio-CNG Yield Network",
        before: "Widespread seasonal agricultural burning yielding toxic ambient air columns.",
        after: "120,000 dense seasonal acres cleared of combustive liabilities directly into processing streams.",
        testimonial: "Phenix delivered field-level operational collection logistics where others failed completely. Outstanding engineering.",
        author: "President, Sustainable Farm Alliance"
    }
};

function initProjectPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    gsap.fromTo(card, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Deep Dive Contextual Project Modal Management Actions
function openProjectModal(key) {
    const data = mockProjectData[key];
    if (!data) return;

    const body = document.getElementById('modal-dynamic-body');
    body.innerHTML = `
        <h2 class="text-3xl font-bold uppercase tracking-wider text-amber mb-2">${data.title}</h2>
        <p class="text-xs text-gray-500 uppercase tracking-widest font-bold mb-6">${data.client} &nbsp;|&nbsp; ${data.location}</p>
        
        <div class="grid-2 gap-6 mb-8">
            <div style="background: rgba(255,255,255,0.02); padding: 20px; border-left: 2px solid #ef4444;">
                <h4 class="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">Operational baseline (Before)</h4>
                <p class="text-sm text-gray-300 leading-relaxed">${data.before}</p>
            </div>
            <div style="background: rgba(46,196,182,0.03); padding: 20px; border-left: 2px solid var(--green-glow);">
                <h4 class="text-xs text-green uppercase tracking-wider font-bold mb-2">Phenix Ecosystem Outcome (After)</h4>
                <p class="text-sm text-white leading-relaxed font-bold">${data.after}</p>
            </div>
        </div>

        <div style="background: var(--bg-dark); padding: 30px; border: 1px dashed rgba(255,255,255,0.05); border-radius: 4px;">
            <p class="text-gray-300 italic text-sm leading-relaxed">"${data.testimonial}"</p>
            <h5 class="text-xs text-amber font-bold uppercase tracking-wider mt-4">— ${data.author}</h5>
        </div>
        
        <div class="mt-8 flex-between text-xs font-bold uppercase text-gray-500 tracking-widest">
            <span>Engineering Architecture Verified</span>
            <span class="text-green">Capacity Metric: ${data.capacity}</span>
        </div>
    `;

    document.getElementById('project-modal').classList.add('active');
}

function closeProjectModal(e) {
    if (e.target.classList.contains('modal-overlay')) {
        document.getElementById('project-modal').classList.remove('active');
    }
}