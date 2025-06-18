// counter animation 
function animateCounter(element, target, duration = 4000) {
  let start = 0;
  const stepTime = Math.abs(Math.floor(duration / target));
  const updateCounter = () => {
    start++;
    element.textContent = start;
    if (start < target) {
      setTimeout(updateCounter, stepTime);
    }
  };
  updateCounter();
}

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute("data-target"));
        animateCounter(counter, target);
        observer.unobserve(counter); 
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
});

//   owl carousel
$(document).ready(function () {
  const owl = $(".owl-carousel");

  owl.owlCarousel({
    items: 3,
    loop: true,
    center: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: { items: 1 },
      550:{items:2},
      992: { items: 3 },
    },
  });

  function animateCenterCard() {
    if (window.innerWidth >= 992) {
      $(".slider-card").removeClass("center-lift");
      setTimeout(() => {
        $(".owl-item.center .slider-card").addClass("center-lift");
      }, 50);
    }
  }
  animateCenterCard();
  owl.on("changed.owl.carousel", function () {
    animateCenterCard();
  });
});
