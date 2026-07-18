import * as THREE from 'three';
import { EngineRenderer } from './renderer.js';
import { CameraSystem } from './camera.js';
import { SolarSystem } from './solarSystem.js';
import { Galaxy } from './galaxy.js';
import { Universe } from './universe.js';
import { EarthLODManager } from './earthTiler.js';

// Setup Inti
const canvas = document.getElementById('universe-canvas');
const engine = new EngineRenderer(canvas);
const camSystem = new CameraSystem(engine.renderer, canvas);
engine.initComposer(camSystem.camera);

// Generate Objek
const universe = new Universe(engine.scene);
const solarSystem = new SolarSystem(engine.scene);
const galaxy = new Galaxy(engine.scene);
const earthLOD = new EarthLODManager(engine.scene, camSystem.camera);

// Logika Klik (Raycaster)
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let db = {};

// Load Metadata
fetch('objects.json')
    .then(res => res.json())
    .then(data => db = data)
    .catch(err => console.error("Gagal memuat JSON:", err));

window.addEventListener('click', (event) => {
    if(event.target.closest('#ui-container')) return; // Abaikan klik di dalam UI

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camSystem.camera);
    
    // Cek yang diklik
    const intersects = raycaster.intersectObjects(solarSystem.planets);
    if (intersects.length > 0) {
        const objId = intersects[0].object.userData.id;
        showUI(objId);
        
        // Tampilkan tombol layer bumi jika mengklik bumi
        if(objId === 'earth') {
            document.getElementById('earth-layers').style.display = 'block';
        } else {
            document.getElementById('earth-layers').style.display = 'none';
        }
    } else {
        document.getElementById('info-panel').style.display = 'none';
        document.getElementById('earth-layers').style.display = 'none';
    }
});

function showUI(objectId) {
    const data = db[objectId];
    if(data) {
        document.getElementById('info-panel').style.display = 'block';
        document.getElementById('obj-name').innerText = data.name;
        document.getElementById('obj-type').innerText = data.type;
        document.getElementById('data-radius').innerText = data.radius;
        document.getElementById('data-gravity').innerText = data.gravity;
        document.getElementById('travel-rocket').innerText = data.travel_rocket;
        document.getElementById('travel-light').innerText = data.travel_light;

        // Kontrol Badge Data
        const sourceBadge = document.getElementById('data-source-badge');
        sourceBadge.innerText = `Data: ${data.mission_source}`;

        // Kontrol Warning Artist Impression
        const artistBadge = document.getElementById('artist-badge');
        artistBadge.style.display = data.is_artist_impression ? 'inline-block' : 'none';
    }
}

// UI Event Listeners - Earth Layers
for(let i=0; i<=4; i++) {
    document.getElementById(`btn-mode-${i}`).addEventListener('click', () => {
        solarSystem.setEarthMode(i);
    });
}

// Responsivitas Layar
window.addEventListener('resize', () => {
    camSystem.camera.aspect = window.innerWidth / window.innerHeight;
    camSystem.camera.updateProjectionMatrix();
    engine.renderer.setSize(window.innerWidth, window.innerHeight);
    if(engine.composer) engine.composer.setSize(window.innerWidth, window.innerHeight);
});

// Loop Animasi Utama
function animate() {
    requestAnimationFrame(animate);
    
    camSystem.update();
    solarSystem.update();
    galaxy.update();
    earthLOD.update();
    
    engine.render(camSystem.camera);
}

animate();
