import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

export class EngineRenderer {
    constructor(canvas) {
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            powerPreference: "high-performance",
            logarithmicDepthBuffer: true // Esensial untuk skala alam semesta
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        
        this.scene = new THREE.Scene();
    }

    initComposer(camera) {
        this.composer = new EffectComposer(this.renderer);
        const renderPass = new RenderPass(this.scene, camera);
        this.composer.addPass(renderPass);

        // Efek Bloom untuk Matahari dan Galaksi
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5, 0.4, 0.85
        );
        this.composer.addPass(bloomPass);
    }

    render(camera) {
        if (this.composer) {
            this.composer.render();
        } else {
            this.renderer.render(this.scene, camera);
        }
    }
}
