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
// Project filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });

  });
});