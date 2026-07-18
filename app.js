// ==========================================
// XAERISOFT PLANET EXPLORER - NEXT GEN ENGINE
// ==========================================

// --- 1. DATA PLANET & HIGH-RES TEXTURES ---
// Menggunakan CDN resmi, stabil, dan bebas CORS
const CDN = "https://cdn.jsdelivr.net/gh/brian3kb/grapefruit-3d-solar-system@master/src/assets/textures/";
const MRDOOB = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/";
const GLOBE = "https://unpkg.com/three-globe/example/img/";

const planetsData = {
    sun: {
        name: "SUN", type: "Yellow Dwarf Star",
        diameter: "1,392,700 km", mass: "1.989 × 10^30 kg", gravity: "274 m/s²", temp: "5,500 °C", distance: "0 km", moons: "0", rotation: "27 Days", orbit: "0 Days",
        facts: ["Matahari menyumbang 99.86% dari total massa Tata Surya.", "Cahaya Matahari membutuhkan waktu 8 menit untuk sampai ke Bumi."],
        map: CDN + 'sun.jpg',
        atmosphereColor: new THREE.Color(0xff6600), power: 1.5, emissive: 0xffaa00
    },
    mercury: {
        name: "MERCURY", type: "Terrestrial Planet",
        diameter: "4,880 km", mass: "0.330 × 10^24 kg", gravity: "3.7 m/s²", temp: "167 °C", distance: "57.9M km", moons: "0", rotation: "58.6 Days", orbit: "88 Days",
        facts: ["Merkurius adalah planet terkecil di Tata Surya.", "Meski paling dekat dengan Matahari, Merkurius bukan planet terpanas."],
        map: CDN + 'mercury.jpg', useBump: true, roughness: 0.9,
        atmosphereColor: new THREE.Color(0xaaaaaa), power: 5.0
    },
    venus: {
        name: "VENUS", type: "Terrestrial Planet",
        diameter: "12,104 km", mass: "4.87 × 10^24 kg", gravity: "8.9 m/s²", temp: "464 °C", distance: "108.2M km", moons: "0", rotation: "243 Days", orbit: "225 Days",
        facts: ["Venus berputar ke arah yang berlawanan dari kebanyakan planet.", "Atmosfernya sangat tebal, didominasi oleh karbon dioksida."],
        map: CDN + 'venus_surface.jpg', clouds: CDN + 'venus_atmosphere.jpg', cloudOpacity: 0.85,
        atmosphereColor: new THREE.Color(0xffaa00), power: 2.5
    },
    earth: {
        name: "EARTH", type: "Terrestrial Planet",
        diameter: "12,742 km", mass: "5.97 × 10^24 kg", gravity: "9.8 m/s²", temp: "15 °C", distance: "149.6M km", moons: "1", rotation: "24 Hours", orbit: "365.25 Days",
        facts: ["Satu-satunya planet yang diketahui memiliki kehidupan.", "Permukaan Bumi ditutupi sekitar 71% oleh air."],
        map: MRDOOB + 'earth_atmos_2048.jpg', normal: MRDOOB + 'earth_normal_2048.jpg', specular: MRDOOB + 'earth_specular_2048.jpg',
        clouds: MRDOOB + 'earth_clouds_1024.png', nightMap: GLOBE + 'earth-night.jpg',
        atmosphereColor: new THREE.Color(0x00aaff), power: 3.0
    },
    moon: {
        name: "MOON", type: "Natural Satellite",
        diameter: "3,474 km", mass: "0.073 × 10^24 kg", gravity: "1.6 m/s²", temp: "-53 °C", distance: "384,400 km", moons: "0", rotation: "27.3 Days", orbit: "27.3 Days",
        facts: ["Bulan mengalami penguncian pasang surut (selalu menunjukkan sisi yang sama ke Bumi).", "Satu-satunya benda langit selain Bumi yang pernah diinjak manusia."],
        map: MRDOOB + 'moon_1024.jpg', useBump: true, roughness: 1.0,
        atmosphereColor: new THREE.Color(0xffffff), power: 7.0
    },
    mars: {
        name: "MARS", type: "Terrestrial Planet",
        diameter: "6,779 km", mass: "0.642 × 10^24 kg", gravity: "3.7 m/s²", temp: "-65 °C", distance: "227.9M km", moons: "2", rotation: "24.6 Hours", orbit: "687 Days",
        facts: ["Dikenal sebagai Planet Merah karena besi oksida.", "Memiliki gunung berapi terbesar, Olympus Mons."],
        map: MRDOOB + 'mars_1k_color.jpg', normal: MRDOOB + 'mars_1k_normal.jpg', roughness: 0.9,
        atmosphereColor: new THREE.Color(0xff4400), power: 3.5
    },
    jupiter: {
        name: "JUPITER", type: "Gas Giant",
        diameter: "139,820 km", mass: "1898 × 10^24 kg", gravity: "24.7 m/s²", temp: "-110 °C", distance: "778.5M km", moons: "95", rotation: "9.9 Hours", orbit: "12 Years",
        facts: ["Planet terbesar di Tata Surya.", "Bintik Merah Raksasa adalah badai yang telah berlangsung ratusan tahun."],
        map: CDN + 'jupiter.jpg', clouds: CDN + 'jupiter.jpg', cloudOpacity: 0.35, isGas: true,
        atmosphereColor: new THREE.Color(0xffaa77), power: 2.2
    },
    saturn: {
        name: "SATURN", type: "Gas Giant",
        diameter: "116,460 km", mass: "568 × 10^24 kg", gravity: "10.4 m/s²", temp: "-140 °C", distance: "1.43B km", moons: "146", rotation: "10.7 Hours", orbit: "29 Years",
        facts: ["Memiliki sistem cincin paling spektakuler.", "Kepadatannya sangat rendah sehingga bisa mengapung di air jika ada lautan yang cukup besar."],
        map: CDN + 'saturn.jpg', ring: CDN + 'saturn_ring.png',
        atmosphereColor: new THREE.Color(0xeebb88), power: 2.5
    },
    uranus: {
        name: "URANUS", type: "Ice Giant",
        diameter: "50,724 km", mass: "86.8 × 10^24 kg", gravity: "8.7 m/s²", temp: "-195 °C", distance: "2.87B km", moons: "27", rotation: "17.2 Hours", orbit: "84 Years",
        facts: ["Sumbu rotasinya miring hampir 90 derajat.", "Atmosfernya mengandung metana yang memberinya warna biru kehijauan."],
        map: CDN + 'uranus.jpg', ring: CDN + 'uranus_ring.png',
        atmosphereColor: new THREE.Color(0x00ffff), power: 2.5
    },
    neptune: {
        name: "NEPTUNE", type: "Ice Giant",
        diameter: "49,244 km", mass: "102 × 10^24 kg", gravity: "11.1 m/s²", temp: "-200 °C", distance: "4.5B km", moons: "14", rotation: "16.1 Hours", orbit: "165 Years",
        facts: ["Planet terjauh dari Matahari.", "Memiliki angin puyuh terkencang di Tata Surya, mencapai 2.100 km/jam."],
        map: CDN + 'neptune.jpg', clouds: CDN + 'neptune.jpg', cloudOpacity: 0.3, isGas: true,
        atmosphereColor: new THREE.Color(0x3333ff), power: 2.5
    }
};

const fallbackData = { diameter: "TBA", mass: "TBA", gravity: "TBA", temp: "TBA", distance: "TBA", moons: "TBA", rotation: "TBA", orbit: "TBA", facts: ["Data sedang dienkripsi."], map: '', atmosphereColor: new THREE.Color(0xffffff) };

// --- 2. THREE.JS SETUP & CAMERA ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020205);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3.0); // Diperdekat agar memakan 70-80% layar

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
controls.maxDistance = 8;  
controls.zoomSpeed = 0.8;
controls.rotateSpeed = 0.6;

// --- 3. POST-PROCESSING (BLOOM & GLOW) ---
const renderScene = new THREE.RenderPass(scene, camera);
const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.2, 0.5, 0.85);
bloomPass.threshold = 0.05;
bloomPass.strength = 1.0;
bloomPass.radius = 0.6;

const composer = new THREE.EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// --- 4. LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.03); // Gelap agar night-light & bayangan realistis
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
sunLight.position.set(10, 5, 10); 
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
scene.add(sunLight);

// --- 5. ENVIRONMENT (STARS & DUST) ---
function createStarField() {
    const starGeo = new THREE.BufferGeometry();
    const starCount = 8000;
    const starPos = new Float32Array(starCount * 3);
    for(let i=0; i < starCount * 3; i++) {
        starPos[i] = (Math.random() - 0.5) * 200;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.7 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);
    return stars;
}
const starField = createStarField();

// --- 6. ADVANCED PLANET GENERATOR ---
const textureLoader = new THREE.TextureLoader();
let currentPlanetGroup = new THREE.Group();
scene.add(currentPlanetGroup);

// Fallback Procedural Noise Texture generator jika network gagal
function createProceduralNoise() {
    const cvs = document.createElement('canvas'); cvs.width = 512; cvs.height = 512;
    const ctx = cvs.getContext('2d');
    for(let x=0; x<512; x+=4) {
        for(let y=0; y<512; y+=4) {
            const v = Math.floor(Math.random() * 80) + 100;
            ctx.fillStyle = `rgb(${v}, ${v}, ${v})`; ctx.fillRect(x,y,4,4);
        }
    }
    return new THREE.CanvasTexture(cvs);
}
const fallbackTexture = createProceduralNoise();

function safeLoad(url) {
    if(!url) return fallbackTexture;
    return textureLoader.load(url, undefined, undefined, () => fallbackTexture);
}

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
    uniform float power;
    void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), power);
        gl_FragColor = vec4(glowColor, 1.0) * intensity * 1.5;
    }
`;

function buildPlanet(planetKey) {
    while(currentPlanetGroup.children.length > 0){ 
        currentPlanetGroup.remove(currentPlanetGroup.children[0]); 
    }
    const meshesToAnimate = [];
    const data = planetsData[planetKey] || { ...fallbackData, name: planetKey.toUpperCase() };
    const radius = 1;
    const geo = new THREE.SphereGeometry(radius, 128, 128); // Resolusi tinggi
    
    // 1. BASE PLANET MESH
    if (planetKey === 'sun') {
        const sunMat = new THREE.MeshStandardMaterial({
            map: safeLoad(data.map),
            emissive: new THREE.Color(data.emissive),
            emissiveMap: safeLoad(data.map),
            emissiveIntensity: 1.5,
            roughness: 1.0
        });
        const baseMesh = new THREE.Mesh(geo, sunMat);
        currentPlanetGroup.add(baseMesh);
        meshesToAnimate.push({ mesh: baseMesh, speedY: 0.001 });

        // Corona / Plasma Layer
        const plasmaMat = new THREE.MeshStandardMaterial({
            map: safeLoad(data.map), emissive: new THREE.Color(0xff8800), emissiveIntensity: 2.0,
            blending: THREE.AdditiveBlending, transparent: true, opacity: 0.6, depthWrite: false
        });
        const plasmaMesh = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.015, 64, 64), plasmaMat);
        currentPlanetGroup.add(plasmaMesh);
        meshesToAnimate.push({ mesh: plasmaMesh, speedY: -0.0015, speedX: 0.0005 }); // Animated plasma

        // Cahaya pusat agar Sun menerangi sekitarnya
        const coreLight = new THREE.PointLight(0xffccaa, 2, 50);
        currentPlanetGroup.add(coreLight);
    } 
    else {
        const matParams = { 
            map: safeLoad(data.map), 
            roughness: data.roughness || 0.7, 
            metalness: 0.05 
        };

        if(data.normal) matParams.normalMap = safeLoad(data.normal);
        else if(data.useBump) { matParams.bumpMap = safeLoad(data.map); matParams.bumpScale = 0.015; }
        if(data.specular) matParams.specularMap = safeLoad(data.specular);

        // Earth Night Lights
        if(data.nightMap) {
            matParams.emissiveMap = safeLoad(data.nightMap);
            matParams.emissive = new THREE.Color(0xffffee);
            matParams.emissiveIntensity = 1.0; 
        }

        const baseMesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial(matParams));
        baseMesh.castShadow = true; baseMesh.receiveShadow = true;
        currentPlanetGroup.add(baseMesh);
        meshesToAnimate.push({ mesh: baseMesh, speedY: 0.001 });
    }

    // 2. CLOUDS / GAS LAYERS
    if(data.clouds) {
        const cloudMat = new THREE.MeshStandardMaterial({
            map: safeLoad(data.clouds),
            transparent: true, opacity: data.cloudOpacity || 0.5, 
            blending: data.isGas ? THREE.NormalBlending : THREE.AdditiveBlending, 
            depthWrite: false
        });
        const cloudMesh = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.01, 64, 64), cloudMat);
        cloudMesh.receiveShadow = true;
        currentPlanetGroup.add(cloudMesh);
        meshesToAnimate.push({ mesh: cloudMesh, speedY: 0.0013 }); // Putaran awan sedikit lebih cepat
    }

    // 3. HIGH-RES RINGS (Saturn / Uranus)
    if(data.ring) {
        const ringGeo = new THREE.RingGeometry(1.4, 2.4, 128);
        const pos = ringGeo.attributes.position;
        const uvs = ringGeo.attributes.uv;
        // Koreksi Pemetaan UV Radial untuk tekstur cincin 1D
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i), y = pos.getY(i);
            const r = Math.sqrt(x*x + y*y);
            uvs.setXY(i, (r - 1.4) / (2.4 - 1.4), 0.5);
        }
        const ringMat = new THREE.MeshStandardMaterial({
            map: safeLoad(data.ring), color: 0xffffff, side: THREE.DoubleSide,
            transparent: true, opacity: 0.95, roughness: 0.6
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2 + 0.15; // Miring realistis
        ringMesh.castShadow = true; ringMesh.receiveShadow = true;
        currentPlanetGroup.add(ringMesh);
        meshesToAnimate.push({ mesh: ringMesh, speedZ: 0.0005 });
    }

    // 4. ATMOSPHERE GLOW SHADER (Semua planet mendapatkan ini)
    const atmosScale = (planetKey === 'sun') ? 1.3 : (data.ring ? 1.05 : 1.15);
    const atmosMat = new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        uniforms: {
            glowColor: { value: data.atmosphereColor || new THREE.Color(0x00F0FF) },
            power: { value: data.power || 3.0 }
        },
        blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false
    });
    
    const atmosMesh = new THREE.Mesh(new THREE.SphereGeometry(radius * atmosScale, 64, 64), atmosMat);
    currentPlanetGroup.add(atmosMesh);

    currentPlanetGroup.userData.animations = meshesToAnimate;
    updateUI(data);
}

// --- 7. UI & HYPER-WARP INTERACTION ---
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
        const li = document.createElement('li'); li.innerText = fact; factList.appendChild(li);
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
        
        // Motion Blur & Warp Transition Effect
        gsap.to(camera, { fov: 100, duration: 0.8, ease: "power2.in", onUpdate: () => camera.updateProjectionMatrix() });
        gsap.to(currentPlanetGroup.scale, {
            x: 0.01, y: 0.01, z: 0.01, duration: 0.8, ease: "power2.in",
            onComplete: () => {
                buildPlanet(planetId);
                currentPlanetGroup.scale.set(0.01, 0.01, 0.01);
                gsap.to(currentPlanetGroup.scale, { x: 1, y: 1, z: 1, duration: 1.2, ease: "back.out(1.2)" });
                gsap.to(camera, { fov: 45, duration: 1.2, ease: "power3.out", onUpdate: () => camera.updateProjectionMatrix() });
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
    gsap.to(camera.position, { x: 0, y: 0, z: 3.0, duration: 1, ease: "power2.out" });
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

    if(currentPlanetGroup && currentPlanetGroup.userData.animations) {
        currentPlanetGroup.userData.animations.forEach(anim => {
            if(anim.speedY) anim.mesh.rotation.y += anim.speedY;
            if(anim.speedX) anim.mesh.rotation.x += anim.speedX;
            if(anim.speedZ) anim.mesh.rotation.z += anim.speedZ;
        });
    }

    starField.rotation.y = elapsedTime * 0.015;

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
                    // Initial Setup Scale
                    currentPlanetGroup.scale.set(0.01, 0.01, 0.01);
                    gsap.to(currentPlanetGroup.scale, { x: 1, y: 1, z: 1, duration: 2, ease: "power3.out" });
                    animate();
                }, 1500);
            }, 500);
        }
        progBar.style.width = `${progress}%`;
    }, 200); 
