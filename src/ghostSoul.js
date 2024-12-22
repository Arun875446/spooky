// Function to create a ghost soul geometry
function createGhostSoul(radius, particleCount) {
  const geometry = new THREE.BufferGeometry();

  // Create vertices for the ghostly shape
  const vertices = [];
  for (let i = 0; i < particleCount; i++) {
    // Randomize the position of particles within a spherical shape
    const theta = Math.random() * Math.PI * 2; // Random angle
    const phi = Math.acos(2 * Math.random() - 1); // Random inclination
    const r = radius * Math.random(); // Random distance from center

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    vertices.push(x, y, z);
  }

  // Convert vertices to Float32Array and set it as position attribute
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  return geometry;
}

// Create the ghost soul
const ghostSoulGeometry = createGhostSoul(1.5, 500); // Radius 1.5, 500 particles
const ghostSoulMaterial = new THREE.PointsMaterial({
  color: 0x88ccff, // Light blue for a ghostly look
  size: 0.05, // Particle size
  transparent: true,
  opacity: 0.7, // Semi-transparent
  depthWrite: false, // Avoid writing to the depth buffer
  blending: THREE.AdditiveBlending, // Additive blending for a glowing effect
});

// Create the Points mesh for the ghost soul
const ghostSoul = new THREE.Points(ghostSoulGeometry, ghostSoulMaterial);
ghostSoul.position.set(0, 2, 6.5); // Position near the cross
scene.add(ghostSoul);

// Animate the ghost soul
function animateGhostSoul() {
  const time = timer.getElapsed();

  // Make the ghost hover and pulse
  ghostSoul.position.y = 2 + Math.sin(time * 2) * 0.2; // Hover up and down
  ghostSoul.rotation.y += 0.01; // Slow rotation
}
animateGhostSoul();
