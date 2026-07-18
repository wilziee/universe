// ==========================================
// XAERISOFT PLANET EXPLORER - CORE ENGINE
// ==========================================

// --- 1. DATA PLANET LENGKAP ---
const planetsData = {
    sun: {
        name: "SUN", type: "Yellow Dwarf Star",
        diameter: "1,392,700 km", mass: "1.989 × 10^30 kg", gravity: "274 m/s²", temp: "5,500 °C", distance: "0 km", moons: "0", rotation: "27 Days", orbit: "0 Days",
        facts: ["Matahari menyumbang 99.86% dari total massa Tata Surya.", "Cahaya Matahari membutuhkan waktu 8 menit untuk sampai ke Bumi."],
        map: 'https://corsproxy.io/?https://www.solarsystemscope.com/textures/download/2k_sun.jpg',
        atmosphereColor: new THREE.Color(0xff8800)
    },
    mercury: {
        name: "MERCURY", type: "Terrestrial Planet",
        diameter: "4,880 km", mass: "0.330 × 10^24 kg", gravity: "3.7 m/s²", temp: "167 °C", distance: "57.9M km", moons: "0", rotation: "58.6 Days", orbit: "88 Days",
        facts: ["Merkurius adalah planet terkecil di Tata Surya.", "Meski paling dekat dengan Matahari, Merkurius bukan planet terpanas."],
        map: 'https://corsproxy.io/?https://www.solarsystemscope.com/textures/download/2k_mercury.jpg',
        atmosphereColor: new THREE.Color(0xaaaaaa)
    },
    venus: {
        name: "VENUS", type: "Terrestrial Planet",
        diameter: "12,104 km", mass: "4.87 × 10^24 kg", gravity: "8.9 m/s²", temp: "464 °C", distance: "108.2M km", moons: "0", rotation: "243 Days", orbit: "225 Days",
        facts: ["Venus berputar ke arah yang berlawanan dari kebanyakan planet.", "Atmosfernya sangat tebal, didominasi oleh karbon dioksida."],
        map: 'https://corsproxy.io/?https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg',
        atmosphereColor: new THREE.Color(0xffaa00)
    },
    earth: {
        name: "EARTH", type: "Terrestrial Planet",
        diameter: "12,742 km", mass: "5.97 × 10^24 kg", gravity: "9.8 m/s²", temp: "15 °C", distance: "149.6M km", moons: "1", rotation: "24 Hours", orbit: "365.25 Days",
        facts: ["Satu-satunya planet yang diketahui memiliki kehidupan.", "Permukaan Bumi ditutupi sekitar 71% oleh air."],
        map: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
        normal: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
        specular: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
        clouds: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
        atmosphereColor: new THREE.Color(0x00aaff)
    },
    moon: {
        name: "MOON", type: "Natural Satellite",
        diameter: "3,474 km", mass: "0.073 × 10^24 kg", gravity: "1.6 m/s²", temp: "-53 °C", distance: "384,400 km (From Earth)", moons: "0", rotation: "27.3 Days", orbit: "27.3 Days",
        facts: ["Bulan mengalami penguncian pasang surut (selalu menunjukkan sisi yang sama ke Bumi).", "Satu-satunya benda langit selain Bumi yang pernah diinjak manusia."],
        map: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
        atmosphereColor: new THREE.Color(0xffffff)
    },
    mars: {
        name: "MARS", type: "Terrestrial Planet",
        diameter: "6,779 km", mass: "0.642 × 10^24 kg", gravity: "3.7 m/s²", temp: "-65 °C", distance: "227.9M km", moons: "2", rotation: "24.6 Hours", orbit: "687 Days",
        facts: ["Dikenal sebagai Planet Merah karena besi oksida.", "Memiliki gunung berapi terbesar, Olympus Mons."],
        map: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_1k_color.jpg',
        normal: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_1k_normal.jpg',
        atmosphereColor: new THREE.Color(0xff4400)
    },
    jupiter: {
        name: "JUPITER", type: "Gas Giant",
        diameter: "139,820 km", mass: "1898 × 10^24 kg", gravity: "24.7 m/s²", temp: "-110 °C", distance: "778.5M km", moons: "95", rotation: "9.9 Hours", orbit: "12 Years",
        facts: ["Planet terbesar di Tata Surya.", "Bintik Merah Raksasa adalah badai yang telah berlangsung ratusan tahun."],
        map: 'https://corsproxy.io/?https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg',
        atmosphereColor: new THREE.Color(0xffaa77)
    },
    saturn: {
        name: "SATURN", type: "Gas Giant",
        diameter: "116,460 km", mass: "568 × 10^24 kg", gravity: "10.4 m/s²", temp: "-140 °C", distance: "1.43B km", moons: "146", rotation: "10.7 Hours", orbit: "29 Years",
        facts: ["Memiliki sistem cincin paling spektakuler.", "Kepadatannya sangat rendah sehingga bisa mengapung di air jika ada lautan yang cukup besar."],
        map: 'https://corsproxy.io/?https://www.solarsystemscope.com/textures/download/2k_saturn.jpg',
        atmosphereColor: new THREE.Color(0xeebb88)
    },
    uranus: {
        name: "URANUS", type: "Ice Giant",
        diameter: "50,724 km", mass: "86.8 × 10^24 kg", gravity: "8.7 m/s²", temp: "-195 °C", distance: "2.87B km", moons: "27", rotation: "17.2 Hours", orbit: "84 Years",
        facts: ["Sumbu rotasinya miring hampir 90 derajat.", "Atmosfernya mengandung metana yang memberinya warna biru kehijauan."],
        map: 'https://corsproxy.io/?https://www.solarsystemscope.com/textures/download/2k_uranus.jpg',
        atmosphereColor: new THREE.Color(0x00ffff)
    },
    neptune: {
        name: "NEPTUNE", type: "Ice Giant",
        diameter: "49,244 km", mass: "102 × 10^24 kg", gravity: "11.1 m/s²", temp: "-200 °C", distance: "4.5B km", moons: "14", rotation: "16.1 Hours", orbit: "165 Years",
        facts: ["Planet terjauh dari Matahari.", "Memiliki angin puyuh terkencang di Tata Surya, mencapai 2.100 km/jam."],
        map: 'https://corsproxy.io/?https://www.solarsystemscope.com/textures/download/2k_neptune.jpg',
        atmosphereColor: new THREE.Color(0x3333ff)
    }
};

const fallbackData = {
    diameter: "TBA", mass: "TBA", gravity: "TBA", temp: "TBA", distance: "TBA", moons: "TBA", rotation: "TBA", orbit: "TBA", facts: ["Data sedang dienkripsi."], map: '', atmosphereColor: new THREE.Color(0xffffff)
};

// --- 2. THREE.JS SETUP ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020205);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3.5); 

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 1.5; 
controls.maxDistance = 10;  
controls.zoomSpeed = 0.8;
controls.rotateSpeed = 0.6;

// --- 3. POST-PROCESSING (BLOOM & GLOW) ---
const renderScene = new THREE.RenderPass(scene, camera);
const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0.1;
bloomPass.strength = 1.2;
bloomPass.radius = 0.5;

const composer = new THREE.EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// --- 4. LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05); 
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
sunLight.position.set(5, 3, 5); 
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
    while(currentPlanetGroup.children.length > 0){ 
        currentPlanetGroup.remove(currentPlanetGroup.children[0]); 
    }
    activeCloudMesh = null;

    const data = planetsData[planetKey] || { ...fallbackData, name: planetKey.toUpperCase() };
    const radius = 1;

    const geo = new THREE.SphereGeometry(radius, 64, 64);
    
    let baseMesh;

    // LOGIKA KHUSUS MATAHARI (SUN)
    if (planetKey === 'sun') {
        const sunMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(data.map),
            color: 0xffffff
        });
        baseMesh = new THREE.Mesh(geo, sunMat);
    } 
    // LOGIKA PLANET BIASA
    else {
        const matParams = { roughness: 0.8, metalness: 0.1 };
        if(data.map) matParams.map = textureLoader.load(data.map);
        if(data.normal) matParams.normalMap = textureLoader.load(data.normal);
        if(data.specular) matParams.specularMap = textureLoader.load(data.specular);

        baseMesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial(matParams));
    }

    currentPlanetGroup.add(baseMesh);

    if(data.clouds) {
        const cloudMat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(data.clouds),
            transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false
        });
        activeCloudMesh = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.01, 64, 64), cloudMat);
        currentPlanetGroup.add(activeCloudMesh);
    }

    const atmosScale = (planetKey === 'sun') ? 1.3 : 1.15;
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
    
    const atmosMesh = new THREE.Mesh(new THREE.SphereGeometry(radius * atmosScale, 64, 64), atmosMat);
    currentPlanetGroup.add(atmosMesh);

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

const sfxClick = document.getElementById('sfx-click');
const sfxWarp = document.getElementById('sfx-warp');
const bgm = document.getElementById('bgm');

document.querySelectorAll('.planet-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.planet-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        sfxClick.currentTime = 0; sfxClick.play().catch(()=>{});
        sfxWarp.currentTime = 0; sfxWarp.play().catch(()=>{});

        const planetId = e.currentTarget.getAttribute('data-planet');
        
        gsap.to(camera.position, {
            z: 10, duration: 1, ease: "power2.in",
            onComplete: () => {
                buildPlanet(planetId);
                gsap.to(camera.position, { z: 3.5, duration: 1.5, ease: "power3.out" });
            }
        });
    });
});

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        sfxClick.currentTime = 0; sfxClick.play().catch(()=>{});
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        e.currentTarget.classList.add('active');
        document.getElementById(`tab-${e.currentTarget.getAttribute('data-target')}`).classList.add('active');
    });
});

window.addEventListener('dblclick', () => {
    gsap.to(camera.position, { x: 0, y: 0, z: 3.5, duration: 1, ease: "power2.out" });
    gsap.to(controls.target, { x: 0, y: 0, z: 0, duration: 1, ease: "power2.out" });
});

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

    if(currentPlanetGroup) {
        currentPlanetGroup.rotation.y += 0.001; 
    }
    if(activeCloudMesh) {
        activeCloudMesh.rotation.y += 0.0012; 
    }

    starField.rotation.y = elapsedTime * 0.02;

    camera.position.x += Math.sin(elapsedTime * 0.5) * 0.0005;
    camera.position.y += Math.cos(elapsedTime * 0.3) * 0.0005;

    controls.update();
    composer.render(); 
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
                    bgm.volume = 0.3;
                    bgm.play().catch(() => console.log("User must interact first to play BGM"));
                    buildPlanet('earth'); 
                    animate();
                }, 1500);
            }, 500);
        }
        progBar.style.width = `${progress}%`;
    }, 200);
};
