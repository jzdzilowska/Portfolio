// --------------------------------- cursor ----------------------------------
const dot = document.querySelector('.cursor-dot');
let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  dotX += (mouseX - dotX) * 0.1;
  dotY += (mouseY - dotY) * 0.1;
  dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
  requestAnimationFrame(animate);
}

animate();

// ------------------------------ random item pos ----------------------------
window.onload = function() {
  const items = document.querySelectorAll('.item');
  const bodyWidth = window.innerWidth;
  const bodyHeight = window.innerHeight;

  items.forEach(item => {
    const randomX = Math.random() * (bodyWidth - item.offsetWidth);
    const randomY = Math.random() * (bodyHeight - item.offsetHeight);
    item.style.left = `${randomX}px`;
    item.style.top = `${randomY}px`;
  });
};