// Animate skill bars using Intersection Observer
const skillFills = document.querySelectorAll(".skill-fill");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.getAttribute("data-width") + "%";
        // Stop observing after animation triggers once
        observer.unobserve(fill);
      }
    });
  },
  {
    threshold: 0.3,
  },
);

// Observe each skill bar
skillFills.forEach((fill) => observer.observe(fill));
