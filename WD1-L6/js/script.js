/* Wait until the whole page is loaded before running any code */
document.addEventListener("DOMContentLoaded", function () {

  /* ===== 1. Navbar changes color after scrolling ===== */
  const navbar = document.getElementById("mainNav");
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* ===== 2. Typing effect in the hero ===== */
  const roles = ["Computer Science Student", "Web Dev Beginner"];
  const typedEl = document.getElementById("typed");
  let roleIndex = 0, charIndex = 0, deleting = false;

  function type() {
    const current = roles[roleIndex];
    // add or remove one character
    charIndex += deleting ? -1 : 1;
    typedEl.textContent = current.substring(0, charIndex);

    let delay = deleting ? 50 : 100;
    if (!deleting && charIndex === current.length) {      // finished typing
      deleting = true; delay = 1500;
    } else if (deleting && charIndex === 0) {             // finished deleting
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;         // next role
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();

  /* ===== 3. Philosophy cards: click to reveal/hide text ===== */
  document.querySelectorAll(".philosophy-card").forEach(function (card) {
    function toggle() {
      const text = card.querySelector(".hidden-text");
      text.style.display = (text.style.display === "block") ? "none" : "block";
    }
    card.addEventListener("click", toggle);
    card.addEventListener("keydown", function (e) {        // keyboard support
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  });

  /* ===== 4. Project filter (All / Midterm / Final) ===== */
  const filterButtons = document.querySelectorAll("#filterButtons button");
  const projects = document.querySelectorAll(".project");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // highlight the clicked button only
      filterButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      projects.forEach(function (p) {
        const show = filter === "all" || p.dataset.category === filter;
        p.classList.toggle("hide", !show);
      });
    });
  });

  /* ===== 5. Contact form validation ===== */
  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("formAlert");

  form.addEventListener("submit", function (e) {
    e.preventDefault();                                    // stop page reload
    let valid = true;

    form.querySelectorAll("input, textarea").forEach(function (field) {
      // checkValidity() uses the required/type rules from the HTML
      const ok = field.checkValidity() && field.value.trim() !== "";
      field.classList.toggle("is-invalid", !ok);
      field.classList.toggle("is-valid", ok);
      if (!ok) valid = false;
    });

    if (valid) {
      alertBox.innerHTML = '<div class="alert alert-success">Thank you! Your message was sent.</div>';
      form.reset();
      form.querySelectorAll(".is-valid").forEach(function (f) { f.classList.remove("is-valid"); });
    } else {
      alertBox.innerHTML = '<div class="alert alert-danger">Please fix the highlighted fields.</div>';
    }
  });

  /* ===== 6. Footer year ===== */
  document.getElementById("year").textContent = new Date().getFullYear();
});
