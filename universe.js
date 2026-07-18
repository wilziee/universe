import * as THREE from 'three';

export class Universe {
    constructor(scene) {
        this.scene = scene;
        this.createStarfield();
    }

    createStarfield() {
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array(50000 * 3);
        for(let i=0; i<pos.length; i++) {
            pos[i] = (Math.random() - 0.5) * 1e8; // Disebar sangat jauh
        }
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 2, sizeAttenuation: false });
        const mesh = new THREE.Points(geom, mat);
        this.scene.add(mesh);
    }
}
