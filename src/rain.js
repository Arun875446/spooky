// Define the profile for the raindrop
const points = [];
points.push(new THREE.Vector2(0, 1.5)); // Top of the drop (pointy tip)
points.push(new THREE.Vector2(0.3, 1)); // Slope outward
points.push(new THREE.Vector2(0.6, 0.5)); // Curve outward
points.push(new THREE.Vector2(0.7, 0)); // Widest part
points.push(new THREE.Vector2(0.4, -0.8)); // Taper to the bottom
points.push(new THREE.Vector2(0, -1)); // Bottom of the raindrop

// Create the lathe geometry by revolving the points around the Y-axis
const raindropGeometry = new THREE.LatheGeometry(points, 32);

// Material
const raindropMaterial = new THREE.MeshPhysicalMaterial();
raindropMaterial.color = new THREE.Color(debugObject.color);
raindropMaterial.flatShading = false;
raindropMaterial.side = THREE.DoubleSide;
raindropMaterial.opacity = 0.5;
raindropMaterial.transparent = true;
raindropMaterial.metalness = 0;
raindropMaterial.roughness = 0;
raindropMaterial.transmission = 1;
raindropMaterial.ior = 4;
raindropMaterial.thickness = 0;

rainTweaks.addColor(debugObject, "color").onChange(() => {
  raindropMaterial.color.set(debugObject.color);
});

rainTweaks.add(raindropMaterial, "transmission").min(0).max(1).step(0.0001);
rainTweaks.add(raindropMaterial, "ior").min(1).max(10).step(0.0001);
rainTweaks.add(raindropMaterial, "thickness").min(0).max(1).step(0.0001);

for (let i = 0; i < 110; i++) {
  // Create the mesh
  const raindrop = new THREE.Mesh(raindropGeometry, raindropMaterial);

  raindrop.position.x = (Math.random() - 0.5) * 25;
  raindrop.position.y = (Math.random() - 0.5) * 20;
  raindrop.position.z = (Math.random() - 0.5) * 20;

  // diamond.rotation.x = Math.random() * Math.PI;
  // diamond.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();
  raindrop.scale.set(0.4, 0.4, 0.4);
  // diamond.scale.set(0.2,3,0.2);
  group.add(raindrop);
  scene.add(group);

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    raindrop.position.y -= 0.1; // Make raindrops fall downward
    if (raindrop.position.y < -10) {
      raindrop.position.y = 10; // Reset raindrop position when it goes below the screen
    }
    window.requestAnimationFrame(tick);
  };

  tick();
}
