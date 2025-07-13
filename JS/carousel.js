document.addEventListener("DOMContentLoaded", () => {
  const cardSlider = document.querySelector(".card-slider");
  const sliderContainer = document.querySelector(".slider");
  const dots = document.querySelectorAll(".dot");
  const cards = document.querySelectorAll(".testimonial-card");
  const cardWidth = 337 + 20; // card width + margin (from CSS)
  let currentIndex = 0;

  // Make card-slider scrollable and snap properly
  cardSlider.style.overflowX = "auto";
  cardSlider.style.scrollSnapType = "x mandatory";
  cardSlider.style.scrollBehavior = "smooth";
  cardSlider.style.webkitOverflowScrolling = "touch";
  cardSlider.style.scrollbarWidth = "none"; // Firefox
  cardSlider.style.msOverflowStyle = "none"; // IE/Edge
  cardSlider.classList.add("hide-scrollbar"); // for webkit

  // Create scroll snapping CSS for cards
  cards.forEach(card => {
    card.style.scrollSnapAlign = "center";
    card.style.flex = "0 0 337px"; // consistent with CSS
  });

  // Hide scrollbar (for webkit browsers)
  const style = document.createElement("style");
  style.textContent = `
    .card-slider::-webkit-scrollbar {
      display: none;
    }
  `;
  document.head.appendChild(style);

  // Dot updater
  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  // Scroll to card index
  function scrollToCard(index) {
    const scrollX = index * cardWidth;
    cardSlider.scrollTo({ left: scrollX, behavior: "smooth" });
    currentIndex = index;
    updateDots(index);
  }

  // Dot click handler
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"));
      scrollToCard(index);
    });
  });

  // Sync active dot with scroll
  cardSlider.addEventListener("scroll", () => {
    const index = Math.round(cardSlider.scrollLeft / cardWidth);
    if (index !== currentIndex) {
      currentIndex = index;
      updateDots(currentIndex);
    }
  });

  // Auto-scroll every 4 seconds
  function startAutoSlide() {
    return setInterval(() => {
      const nextIndex = (currentIndex + 1) % cards.length;
      scrollToCard(nextIndex);
    }, 4000);
  }

  let autoSlide = startAutoSlide();

  // Pause auto-slide on interaction
  cardSlider.addEventListener("mouseenter", () => clearInterval(autoSlide));
  cardSlider.addEventListener("mouseleave", () => {
    autoSlide = startAutoSlide();
  });
});

