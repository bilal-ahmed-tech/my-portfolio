document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // NAVBAR — FULLSCREEN MOBILE MENU
  // ============================================
  const navCollapse = document.querySelector("#navbarNav");
  const togglerOpen = document.querySelector(".toggler-open");
  const togglerClose = document.querySelector(".toggler-close");

  if (navCollapse) {
    const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });

    navCollapse.addEventListener("show.bs.collapse", () => {
      togglerOpen?.classList.add("d-none");
      togglerClose?.classList.remove("d-none");
    });

    navCollapse.addEventListener("hide.bs.collapse", () => {
      togglerOpen?.classList.remove("d-none");
      togglerClose?.classList.add("d-none");
    });

    const navbarNav = document.querySelector(".navbar-nav");
    navbarNav?.addEventListener("click", (e) => {
      const clicked = e.target.closest(".nav-link, .nav-link-btn");
      if (clicked && navCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
    const lgBreakpoint = window.matchMedia("(min-width: 992px)");
    lgBreakpoint.addEventListener("change", (e) => {
      navCollapse.style.transition = "none";
      if (e.matches && navCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          navCollapse.style.transition = "";
        });
      });
    });
  }

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // Intersection Observer — performant, no scroll event
  // ============================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length > 0 && navLinks.length > 0) {
    const setActiveLink = (id) => {
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.getAttribute("id"));
          }
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((section) => navObserver.observe(section));
  }

  // ============================================
  // SKILLS — ANIMATE BARS ON SCROLL
  // ============================================
  const skillFills = document.querySelectorAll(".skill-fill");

  if (skillFills.length > 0) {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target;
            fill.style.width = fill.getAttribute("data-width") + "%";
            skillObserver.unobserve(fill);
          }
        });
      },
      { threshold: 0.3 },
    );

    skillFills.forEach((fill) => skillObserver.observe(fill));
  }

  // ============================================
  // PROJECTS — FILTER TABS
  // Event delegation — one listener on parent handles all buttons
  // ============================================
  const projectFilters = document.querySelector(".project-filters");
  const projectItems = document.querySelectorAll(".project-item");

  if (projectFilters && projectItems.length > 0) {
    projectFilters.addEventListener("click", (e) => {
      const clicked = e.target.closest(".filter-btn");
      if (!clicked) return;

      // Update active button
      projectFilters
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      clicked.classList.add("active");

      const filter = clicked.getAttribute("data-filter");

      // Show or hide projects
      projectItems.forEach((item) => {
        const match =
          filter === "all" || item.getAttribute("data-category") === filter || item.getAttribute("data-category").includes(filter);
        item.classList.toggle("hidden", !match);
      });
    });
  }

  // ============================================
  // CONTACT FORM — VALIDATION
  // Event delegation — one listener on form handles input resets
  // ============================================
  // ============================================
  // CONTACT FORM — VALIDATION
  // ============================================
  const formWrap = document.querySelector(".contact-form-wrap");
  const contactForm = document.querySelector(".contact-form-wrap form");
  const sendBtn = document.getElementById("send-btn");
  const formMsg = document.getElementById("form-msg");

  if (formWrap && contactForm && sendBtn && formMsg) {
    // Reset border color on input when user starts typing
    formWrap.addEventListener("input", (e) => {
      if (e.target.classList.contains("form-input")) {
        e.target.style.borderColor = e.target.value.trim()
          ? "var(--primary)"
          : "var(--border)";
      }
    });

    // Submit instead of click — also fires on Enter key
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const inputs = formWrap.querySelectorAll(".form-input");

      // Validation rules
      const validators = {
        name: {
          validate: (val) => val.trim().length >= 2,
          message: "Name must be at least 2 characters.",
        },
        email: {
          validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
          message: "Please enter a valid email address.",
        },
        subject_line: {
          validate: (val) => val.trim().length >= 3,
          message: "Subject must be at least 3 characters.",
        },
        message: {
          validate: (val) => val.trim().length >= 10,
          message: "Message must be at least 10 characters.",
        },
      };

      // Run validation
      let allValid = true;
      let firstError = "";

      inputs.forEach((input) => {
        const rule = validators[input.getAttribute("name")];
        if (rule) {
          if (!rule.validate(input.value)) {
            allValid = false;
            input.style.borderColor = "#dc3545";
            if (!firstError) firstError = rule.message;
          } else {
            input.style.borderColor = "var(--primary-dark)";
          }
        }
      });

      if (!allValid) {
        formMsg.textContent = firstError;
        formMsg.className = "form-note error";
        return;
      }

      // Loading state
      sendBtn.disabled = true;
      sendBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
      formMsg.textContent = "";
      formMsg.className = "form-note";

      // Collect form data
      const formData = new FormData();
      formData.append(
        "access_key",
        document.querySelector('[name="access_key"]').value,
      );
      formData.append(
        "subject",
        document.querySelector('[name="subject"]').value,
      );
      formData.append("name", document.querySelector('[name="name"]').value);
      formData.append("email", document.querySelector('[name="email"]').value);
      formData.append(
        "subject_line",
        document.querySelector('[name="subject_line"]').value,
      );
      formData.append(
        "message",
        document.querySelector('[name="message"]').value,
      );
      formData.append("botcheck", "");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          formMsg.textContent = "Message sent! I'll get back to you soon.";
          formMsg.className = "form-note success";

          inputs.forEach((input) => {
            input.value = "";
            input.style.borderColor = "var(--border)";
          });

          setTimeout(() => {
            formMsg.textContent = "";
            formMsg.className = "form-note";
          }, 5000);
        } else {
          formMsg.textContent = "Something went wrong. Please try again.";
          formMsg.className = "form-note error";
        }
      } catch (error) {
        formMsg.textContent = "Network error. Please check your connection.";
        formMsg.className = "form-note error";
      } finally {
        sendBtn.disabled = false;
        sendBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send Message`;
      }
    });
  }

  // ============================================
  // FOOTER — AUTO UPDATE COPYRIGHT YEAR
  // ============================================
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});