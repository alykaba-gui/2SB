// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  let isMenuOpen = false;

  mobileMenuBtn.addEventListener("click", function () {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      mobileMenu.classList.remove("hidden");
      menuIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
      menuIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    }
  });

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll("button");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      isMenuOpen = false;
      mobileMenu.classList.add("hidden");
      menuIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    });
  });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Contact form handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    // Add loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Envoi en cours...";
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // envoie d'email
    async function postJSON(donnees) {
      try {
        const reponse = await fetch("/sendMail", {
          method: "POST", // ou 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donnees),
        });

        const resultat = await reponse.json();
        console.log("Réussite :", resultat);
      } catch (erreur) {
        console.error("Erreur :", erreur);
      }
    }
    postJSON(data)
      .then(() => {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      })
      .catch((error) => {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      });

    /* setTimeout(() => {
      // Reset form
      contactForm.reset();

      // Show success message
      alert(
        "Merci pour votre demande ! Nous vous contacterons dans les plus brefs délais."
      );

      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }, 2000);*/
  });
});

// Add scroll effect to header
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("shadow-xl");
  } else {
    header.classList.remove("shadow-xl");
  }
});

// Animate stats on scroll
function animateStats() {
  const stats = document.querySelectorAll(".text-3xl, .text-4xl");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const number = parseInt(text.replace(/\D/g, ""));

        if (number && !target.classList.contains("animated")) {
          target.classList.add("animated");
          animateNumber(target, 0, number, 2000);
        }
      }
    });
  });

  stats.forEach((stat) => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }

    const suffix = element.textContent.replace(/\d+/g, "");
    element.textContent = Math.floor(current) + suffix;
  }, 16);
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  animateStats();
});

// Add smooth reveal animations for sections
function addRevealAnimations() {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
}

// Initialize reveal animations
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(addRevealAnimations, 100);
});
