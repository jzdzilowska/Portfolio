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

  // area w scattered items defined
  const centerX = bodyWidth / 2;
  const centerY = bodyHeight / 2;
  const maxDistance = 200; // max distance from center for scattering 

  items.forEach(item => {
    const itemWidth = item.offsetWidth;
    const itemHeight = item.offsetHeight;
    // random positions around center
    const randomX = centerX + (Math.random() * maxDistance * 2 - maxDistance) - (itemWidth / 2);
    const randomY = centerY + (Math.random() * maxDistance * 2 - maxDistance) - (itemHeight / 2);
    // within the viewport range
    const finalX = Math.max(0, Math.min(bodyWidth - itemWidth, randomX));
    const finalY = Math.max(0, Math.min(bodyHeight - itemHeight, randomY));
    // applied
    item.style.position = 'absolute';
    item.style.left = `${finalX}px`;
    item.style.top = `${finalY}px`;
  });
};

