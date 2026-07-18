import * as THREE from 'three';
import { EarthShader } from './earthShader.js';

export class SolarSystem {
    constructor(scene) {
        this.scene = scene;
        this.planets = [];
        this.textureLoader = new THREE.TextureLoader();
        this.sun = null;
        this.earthMat = null;
        
        this.createSun();
        this.initSystem();
    }

    createSun() {
        const geo = new THREE.SphereGeometry(696340, 64, 64);
        const mat = new THREE.MeshStandardMaterial({
            emissive: 0xffaa00,
            emissiveIntensity: 5,
            color: 0xffaa00,
            wireframe: false // Placeholder untuk animated plasma texture
        });
        this.sun = new THREE.Mesh(geo, mat);
        this.scene.add(this.sun);
        
        const sunLight = new THREE.PointLight(0xffffff, 3, 1e10);
        this.sun.add(sunLight);
    }

    createRealDataPlanet(id, radius, distance, textureMaps) {
        const geo = new THREE.SphereGeometry(radius, 64, 64);
        const mat = new THREE.MeshStandardMaterial({
            /* Uncomment saat file ada di direktori
            map: this.textureLoader.load(textureMaps.color),
            normalMap: textureMaps.normal ? this.textureLoader.load(textureMaps.normal) : null
            */
            color: 0x888888, wireframe: true // Fallback visualizer
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(distance, 0, 0);
        mesh.userData = { id: id };
        
        this.scene.add(mesh);
        this.planets.push(mesh);
        return mesh;
    }

    initSystem() {
        // Bumi dengan Shader Khusus (Satellite Mode)
        this.earthMat = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(EarthShader.uniforms),
            vertexShader: EarthShader.vertexShader,
            fragmentShader: EarthShader.fragmentShader
        });
        this.earthMat.uniforms.sunPosition.value = this.sun.position;
        /* Uncomment untuk load data asli
        this.earthMat.uniforms.dayTexture.value = this.textureLoader.load('data/nasa_blue_marble_8k.jpg');
        */

        const earthGeo = new THREE.SphereGeometry(6371, 128, 128);
        this.earth = new THREE.Mesh(earthGeo, this.earthMat);
        this.earth.position.set(149597870, 0, 0); // 1 AU dari matahari (skala km)
        this.earth.userData = { id: 'earth' };
        
        this.scene.add(this.earth);
        this.planets.push(this.earth);

        // Objek Tata Surya lain
        this.moon = this.createRealDataPlanet('moon', 1737, 149597870 + 384400, {});
        this.mars = this.createRealDataPlanet('mars', 3389, 227900000, {});
    }

    setEarthMode(modeId) {
        if(this.earthMat) this.earthMat.uniforms.mode.value = modeId;
    }

    update() {
        this.sun.rotation.y += 0.001;
        this.earth.rotation.y += 0.005;
        // Planet lain...
    }
}
