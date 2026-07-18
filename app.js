// ==========================================
// XAERISOFT PLANET EXPLORER - CORE ENGINE
// ==========================================

// --- 1. DATA PLANET ---
const planetsData = {
    earth: {
        name: "EARTH", type: "Terrestrial Planet",
        diameter: "12,742 km", mass: "5.97 × 10^24 kg", gravity: "9.8 m/s²", temp: "15 °C", distance: "149.6M km", moons: "1", rotation: "24 Hours", orbit: "365.25 Days",
        facts: [
            "Bumi adalah satu-satunya planet yang diketahui memiliki kehidupan.",
            "Permukaan Bumi ditutupi sekitar 71% oleh air.",
            "Atmosfer Bumi melindungi dari radiasi matahari dan meteor.",
            "Bumi memiliki medan magnet kuat yang dihasilkan dari inti luarnya.",
            "Bentuk Bumi sebenarnya bukan bola sempurna, melainkan oblate spheroid."
        ],
        // Textures (Using public domain / safe generic URLs for demo)
        map: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
        specular: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
        normal: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
        clouds: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
        atmosphereColor: new THREE.Color(0x00aaff)
    },
    mars: {
        name: "MARS", type: "Terrestrial Planet",
        diameter: "6,779 km", mass: "0.642 × 10^24 kg", gravity: "3.7 m/s²", temp: "-65 °C", distance: "227.9M km", moons: "2", rotation: "24.6 Hours", orbit: "687 Days",
        facts: [
            "Dikenal sebagai Planet Merah karena kandungan besi oksida di permukaannya.",
            "Memiliki gunung berapi terbesar di tata surya, Olympus Mons.",
            "Pernah memiliki air cair di permukaannya miliaran tahun yang lalu."
        ],
        map: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_1k_color.jpg',
        normal: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_1k_normal.jpg',
        atmosphereColor: new THREE.Color(0xff4400)
    },
    // Konfigurasi planet lain (Sun, Mercury, Jupiter, dll) bisa ditambahkan dengan pola yang sama.
    // Untuk demo ini, kita pusatkan arsitektur renderer pada transisi objek.
};

// Fallback data for other planets to avoid errors in demo
const fallbackData = {
    diameter: "TBA", mass: "TBA", gravity: "TBA", temp: "TBA", distance: "TBA", moons: "TBA", rotation: "TBA", orbit: "TBA", facts: ["Data sedang dienkripsi dari satelit XAERISOFT."], map: '', atmosphereColor: new THREE.Color(0xffffff)
};

// --- 2. THREE.JS SETUP ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020205); // Deep space background

// Camera Setup (Solar Smash Style - Very close to planet)
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3.5); 

// Renderer with High Quality
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimation
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// OrbitControls (Smooth, Inertia, Restrictions)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 1.5; // Batas zoom in
controls.maxDistance = 10;  // Batas zoom out
controls.zoomSpeed = 0.8;
controls.rotateSpeed = 0.6;

// --- 3. POST-PROCESSING (BLOOM & GLOW) ---
const renderScene = new THREE.RenderPass(scene, camera);
const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0.1;
bloomPass.strength = 1.2; // Intensitas cinematic neon
bloomPass.radius = 0.5;

const composer = new THREE.EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// --- 4. LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05); // Cahaya sangat redup di sisi gelap
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
sunLight.position.set(5, 3, 5); // Cahaya dari satu sisi (seperti matahari)
sunLight.castShadow = true;
scene.add(sunLight);

// --- 5. ENVIRONMENT (STARS & DUST) ---
function createStarField() {
    const starGeo = new THREE.BufferGeometry();
    const starCount = 5000;
    const starPos = new Float32Array(starCount * 3);
    for(let i=0; i < starCount * 3; i++) {
        starPos[i] = (Math.random() - 0.5) * 100;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);
    return stars;
}
const starField = createStarField();

// --- 6. PLANET GENERATOR ---
const textureLoader = new THREE.TextureLoader();
let currentPlanetGroup = new THREE.Group();
scene.add(currentPlanetGroup);
let activeCloudMesh = null;

// Custom GLSL Shader untuk Atmospheric Scattering (Efek Tepi Menyala / Fresnel)
const atmosphereVertexShader = `
    varying vec3 vNormal;
    void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const atmosphereFragmentShader = `
    varying vec3 vNormal;
    uniform vec3 glowColor;
    void main() {
        float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
        gl_FragColor = vec4(glowColor, 1.0) * intensity;
    }
`;

function buildPlanet(planetKey) {
    // Clear old planet
    while(currentPlanetGroup.children.length > 0){ 
        currentPlanetGroup.remove(currentPlanetGroup.children[0]); 
    }
    activeCloudMesh = null;

    const data = planetsData[planetKey] || { ...fallbackData, name: planetKey.toUpperCase() };
    const radius = 1;

    // Base Mesh
    const geo = new THREE.SphereGeometry(radius, 64, 64);
    const matParams = { 
        roughness: 0.8, metalness: 0.1 
    };
    
    if(data.map) matParams.map = textureLoader.load(data.map);
    if(data.normal) matParams.normalMap = textureLoader.load(data.normal);
    if(data.specular) matParams.specularMap = textureLoader.load(data.specular);

    const baseMesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial(matParams));
    currentPlanetGroup.add(baseMesh);

    // Cloud Layer (Khusus planet yang memiliki awan seperti Bumi)
    if(data.clouds) {
        const cloudMat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(data.clouds),
            transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false
        });
        activeCloudMesh = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.01, 64, 64), cloudMat);
        currentPlanetGroup.add(activeCloudMesh);
    }

    // Atmosphere Glow Layer
    const atmosMat = new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        uniforms: {
            glowColor: { value: data.atmosphereColor || new THREE.Color(0x00F0FF) }
        },
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
    });
    const atmosMesh = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.15, 64, 64), atmosMat);
    currentPlanetGroup.add(atmosMesh);

    // Initial scale for spawn animation
    currentPlanetGroup.scale.set(0.01, 0.01, 0.01);
    gsap.to(currentPlanetGroup.scale, { x: 1, y: 1, z: 1, duration: 2, ease: "power3.out" });

    updateUI(data);
}

// --- 7. UI & INTERACTION ---
function updateUI(data) {
    document.getElementById('planet-name').innerText = data.name;
    document.getElementById('planet-type').innerText = data.type || "Celestial Body";
    document.getElementById('data-diameter').innerText = data.diameter;
    document.getElementById('data-mass').innerText = data.mass;
    document.getElementById('data-gravity').innerText = data.gravity;
    document.getElementById('data-temp').innerText = data.temp;
    document.getElementById('data-distance').innerText = data.distance;
    document.getElementById('data-moons').innerText = data.moons;
    document.getElementById('data-rotation').innerText = data.rotation;
    document.getElementById('data-orbit').innerText = data.orbit;

    const factList = document.getElementById('fact-list');
    factList.innerHTML = '';
    data.facts.forEach(fact => {
        const li = document.createElement('li');
        li.innerText = fact;
        factList.appendChild(li);
    });
}

// Audio
const sfxClick = document.getElementById('sfx-click');
const sfxWarp = document.getElementById('sfx-warp');
const bgm = document.getElementById('bgm');

// Bottom Nav Event Listeners
document.querySelectorAll('.planet-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // UI Update
        document.querySelectorAll('.planet-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Play SFX
        sfxClick.currentTime = 0; sfxClick.play().catch(()=>{});
        sfxWarp.currentTime = 0; sfxWarp.play().catch(()=>{});

        const planetId = e.currentTarget.getAttribute('data-planet');
        
        // Cinematic Camera Transition (GSAP)
        gsap.to(camera.position, {
            z: 10, duration: 1, ease: "power2.in",
            onComplete: () => {
                buildPlanet(planetId);
                gsap.to(camera.position, { z: 3.5, duration: 1.5, ease: "power3.out" });
            }
        });
    });
});

// Tab Switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        sfxClick.currentTime = 0; sfxClick.play().catch(()=>{});
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        e.currentTarget.classList.add('active');
        document.getElementById(`tab-${e.currentTarget.getAttribute('data-target')}`).classList.add('active');
    });
});

// Double click to reset camera
window.addEventListener('dblclick', () => {
    gsap.to(camera.position, { x: 0, y: 0, z: 3.5, duration: 1, ease: "power2.out" });
    gsap.to(controls.target, { x: 0, y: 0, z: 0, duration: 1, ease: "power2.out" });
});

// Window Resize Handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// --- 8. RENDER LOOP ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotasi Planet Perlahan
    if(currentPlanetGroup) {
        currentPlanetGroup.rotation.y += 0.001; // Base rotation
    }
    // Rotasi Awan Sedikit Lebih Cepat
    if(activeCloudMesh) {
        activeCloudMesh.rotation.y += 0.0012; 
    }

    // Bintang bergerak perlahan
    starField.rotation.y = elapsedTime * 0.02;

    // Cinematic micro camera shake (idle movement)
    camera.position.x += Math.sin(elapsedTime * 0.5) * 0.0005;
    camera.position.y += Math.cos(elapsedTime * 0.3) * 0.0005;

    controls.update();
    composer.render(); // Menggunakan composer untuk Bloom, bukan renderer biasa
}

// --- 9. INIT LOADING SEQUENCE ---
window.onload = () => {
    let progress = 0;
    const progBar = document.querySelector('.progress');
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if(progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('loader').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('ui-layer').classList.remove('hidden');
                    // Mulai Audio dan Render
                    bgm.volume = 0.3;
                    bgm.play().catch(() => console.log("User must interact first to play BGM"));
                    buildPlanet('earth'); // Default Planet
                    animate();
                }, 1500);
            }, 500);
        }
        progBar.style.width = `${progress}%`;
    }, 200);
};
