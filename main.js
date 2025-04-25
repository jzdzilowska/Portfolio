import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';

let mouse = new THREE.Vector2();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  -1, 1, 1, -1, 0, 1
);

const uniforms = {
  uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  uTexture: { value: new THREE.TextureLoader().load('squares.jpg') }, // use your semi-transparent tile texture
  uTime: { value: 0.0 }
};

uniforms.uTexture.value.wrapS = uniforms.uTexture.value.wrapT = THREE.RepeatWrapping;
uniforms.uTexture.value.repeat.set(4, 4);

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  fragmentShader: `
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform sampler2D uTexture;

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution;

      float dist = distance(uv, uMouse);
      float radius = 0.2;
      float pixelSize = mix(1.0 / uResolution.x, 20.0 / uResolution.x, smoothstep(0.0, radius, dist));

      vec2 pixelUV = floor(uv / pixelSize) * pixelSize;

      vec4 color = texture2D(uTexture, pixelUV);
      gl_FragColor = color;
    }
  `,
  vertexShader: `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `
});

const geometry = new THREE.PlaneGeometry(2, 2);
const quad = new THREE.Mesh(geometry, material);
scene.add(quad);

function onMouseMove(event) {
  uniforms.uMouse.value.x = event.clientX / window.innerWidth;
  uniforms.uMouse.value.y = 1.0 - event.clientY / window.innerHeight;
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
});

function animate(t) {
  uniforms.uTime.value = t * 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
