// Initialize Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('warehouseCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Warehouse Grid Settings
const rows = 18;
const columns = 4;
const maxStackHeight = 4;
const boxSize = 1;
const warehouse = [];

// Function to create a 3D Box
function createBox(x, y, z, label) {
    const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const box = new THREE.Mesh(geometry, material);
    box.position.set(x, y, z);
    box.userData = { label: label || "Empty Box", color: 0x808080 };
    return box;
}

// Populate Warehouse with Stackable Positions
for (let i = 0; i < rows; i++) {
    warehouse[i] = [];
    for (let j = 0; j < columns; j++) {
        warehouse[i][j] = [];
        for (let k = 0; k < maxStackHeight; k++) {
            const box = createBox(i * 1.2, k * 1.2, j * 1.2);
            scene.add(box);
            warehouse[i][j].push(box);
        }
    }
}

// Camera Positioning
camera.position.set(10, 10, 20);
camera.lookAt(0, 0, 0);

// Rotate & Zoom Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 5;
controls.maxDistance = 50;

// Raycaster for Object Selection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const selectedBox = intersects[0].object;
        const newLabel = prompt("Enter details (Wine Name, Year, Bottles):", selectedBox.userData.label);
        if (newLabel !== null) {
            selectedBox.userData.label = newLabel;
            selectedBox.material.color.set(0x008000); // Turn Green if occupied
        }
    }
});

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
