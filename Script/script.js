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
const filterBtns = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectItems.forEach((item) => {
      const category = item.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});
// Contact form validation
const sendBtn = document.getElementById("send-btn");
const formMsg = document.getElementById("form-msg");

sendBtn.addEventListener("click", () => {
  const inputs = document.querySelectorAll(".form-input");
  let allFilled = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      allFilled = false;
      input.style.borderColor = "#dc3545";
    } else {
      input.style.borderColor = "var(--primary)";
    }
  });

  if (!allFilled) {
    formMsg.textContent = "Please fill in all fields.";
    formMsg.className = "form-note error";
    return;
  }

  // Success message
  formMsg.textContent = "Message sent successfully!";
  formMsg.className = "form-note success";

  // Clear form
  inputs.forEach((input) => {
    input.value = "";
    input.style.borderColor = "var(--border)";
  });

  // Clear message after 4 seconds
  setTimeout(() => {
    formMsg.textContent = "";
    formMsg.className = "form-note";
  }, 4000);
});
// Auto update copyright year
document.getElementById('year').textContent = new Date().getFullYear();