
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close navigation after selecting a section
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Automatically update copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();

console.log("Rohingya Student Hub homepage loaded successfully.");
