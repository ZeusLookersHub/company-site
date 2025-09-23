// ---------------------
// Particles Background
// ---------------------
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 6 + 2;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.color = Math.random() > 0.5 ? "#FFD700" : "#FFFFFF";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

const particlesArray = [];
for (let i = 0; i < 50; i++) {
  particlesArray.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ---------------------
// Countdown Timer
// ---------------------
const countdownDate = new Date("December 31, 2025 23:59:59").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2, '0');
  document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

  if (distance < 0) {
    document.getElementById("countdown").innerText = "We're Live!";
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ---------------------
// Email Collection
// ---------------------
const emailForm = document.getElementById("emailForm");

emailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailForm.querySelector("input").value;

  let emails = JSON.parse(localStorage.getItem("emails")) || [];
  emails.push(email);
  localStorage.setItem("emails", JSON.stringify(emails));

  alert("Thanks! Your email has been saved.");
  emailForm.reset();
});

// ---------------------
// Music Control
// ---------------------
const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.3; // خفف الصوت
// لتشغيل الموسيقى عند أول ضغطة
document.body.addEventListener("click", () => {
  bgMusic.play();
}, { once: true });
