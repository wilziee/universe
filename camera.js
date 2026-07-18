import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class CameraSystem {
    constructor(renderer, domElement) {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.0001, 1e12);
        this.camera.position.set(0, 0, 30000); // Orbit Bumi (skala dalam km)

        this.controls = new OrbitControls(this.camera, domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 0.001; 
        this.controls.maxDistance = 1e11;  
        this.controls.enableZoom = true;
    }

    update() {
        this.controls.update();
        const dist = this.camera.position.length();
        this.controls.panSpeed = dist * 0.001; // Pan speed berdasar jarak
    }
}
