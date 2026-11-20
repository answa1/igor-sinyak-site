
/* ==========================================
   IGOR SINYAK WEBSITE
   MAIN JAVASCRIPT
========================================== */


/* ==========================================
   1. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ ПРОКРУТКЕ
========================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* ==========================================
   2. УВЕЛИЧЕНИЕ ФОТОГРАФИЙ
========================================== */

const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const closeModalButton = document.getElementById("closeModal");

const photos = document.querySelectorAll(
    ".main-photo img, " +
    ".bio-cover img, " +
    ".bio-feature-image img, " +
    ".bio-gallery-item img, " +
    ".bag-image img, " +
    ".fact-image img, " +
    ".crime-cover-image img, " +
    ".crime-photo img, " +
    ".crime-interview-image img, " +
    ".interview-cover-photo img, " +
    ".interview-fashion-image img, " +
    ".interview-robbery-image img, " +
    ".interview-new-life-image img"
);


function openPhoto(photo) {
    if (!photoModal || !modalImage) return;

    modalImage.src = photo.src;
    modalImage.alt = photo.alt || "Увеличенная фотография";

    photoModal.classList.add("show");
    document.body.style.overflow = "hidden";
}


function closePhoto() {
    if (!photoModal || !modalImage) return;

    photoModal.classList.remove("show");
    document.body.style.overflow = "";

    modalImage.src = "";
}


photos.forEach((photo) => {
    photo.style.cursor = "zoom-in";

    photo.addEventListener("click", () => {
        openPhoto(photo);
    });
});


if (closeModalButton) {
    closeModalButton.addEventListener("click", closePhoto);
}


if (photoModal) {
    photoModal.addEventListener("click", (event) => {
        if (event.target === photoModal) {
            closePhoto();
        }
    });
}


document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closePhoto();
    }
});


/* ==========================================
   3. АНИМАЦИЯ КАРТОЧЕК ПРИ НАВЕДЕНИИ
========================================== */

const animatedCards = document.querySelectorAll(
    ".bag-card, " +
    ".bio-card, " +
    ".crime-stolen-card, " +
    ".crime-money-card"
);

animatedCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.classList.add("card-hover");
    });

    card.addEventListener("mouseleave", () => {
        card.classList.remove("card-hover");
    });
});


/* ==========================================
   4. ПЛАВНАЯ ПРОКРУТКА ПО ЯКОРЯМ
========================================== */

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* ==========================================
   5. АНИМАЦИЯ ЦИФР НА СТРАНИЦЕ ОГРАБЛЕНИЯ
========================================== */

const moneyNumbers = document.querySelectorAll(
    ".crime-money-card strong"
);

function animateNumber(element) {
    if (element.dataset.animated === "true") return;

    const originalText = element.textContent;
    const number = parseInt(
        originalText.replace(/[^\d]/g, ""),
        10
    );

    if (!number) return;

    element.dataset.animated = "true";

    const duration = 1300;
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentNumber = Math.floor(number * easedProgress);

        element.textContent =
            "€" + currentNumber.toLocaleString("ru-RU");

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = originalText;
        }
    }

    requestAnimationFrame(updateNumber);
}


if (moneyNumbers.length > 0) {
    const moneyObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    moneyNumbers.forEach((number) => {
        moneyObserver.observe(number);
    });
}


/* ==========================================
   6. АНИМАЦИЯ ХРОНОЛОГИИ
========================================== */

const timelineItems = document.querySelectorAll(
    ".crime-timeline-item"
);

const timelineObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2
    }
);

timelineItems.forEach((item) => {
    timelineObserver.observe(item);
});


/* ==========================================
   7. ЗАЩИТА ОТ ОШИБОК И ЗАВЕРШЕНИЕ
========================================== */

console.log("IGOR SINYAK WEBSITE: JavaScript loaded successfully");
