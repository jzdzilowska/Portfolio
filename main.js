// ----------------------------- cursor ----------------------------- //
const dot = document.querySelector('.cursor-dot');
let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;
let bobbleX = 0, bobbleY = 0;
let bobbleSpeed = 0.1; // speed of bobbling effect - keep?

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  dotX += (mouseX - dotX) * 0.1; // Smooth cursor movement
  dotY += (mouseY - dotY) * 0.1;

  // bobble effect around the cursor
  bobbleX += (Math.random() - 0.5) * 5; 
  bobbleY += (Math.random() - 0.5) * 5; 

  // Update dot position with bobble effect
  dot.style.transform = `translate(${dotX}px, ${dotY}px)`;

  requestAnimationFrame(animate);
}

animate();

// ------------------------ delayed hover ------------------------- //
const items = document.querySelectorAll('.item');
items.forEach(item => {
  let timeout;
  item.addEventListener('mouseenter', () => {
    // Show content immediately
    const content = item.querySelector('.content');
    const img = item.querySelector('.content img');
    
    content.style.opacity = '1';
    img.style.opacity = '1'; // Show image immediately
    content.style.transition = 'opacity 0.5s ease';
    img.style.transition = 'opacity 0.5s ease';
  });

  item.addEventListener('mouseleave', () => {
    // delay hiding the content and image
    timeout = setTimeout(() => {
      const content = item.querySelector('.content');
      const img = item.querySelector('.content img');
      
      content.style.opacity = '0';
      img.style.opacity = '0'; // hide img after delay
      content.style.transition = 'opacity 0.5s ease';
      img.style.transition = 'opacity 0.5s ease';
    }, 1000); 
  });
});
/*
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
*/