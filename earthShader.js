import * as THREE from 'three';

export const EarthShader = {
    uniforms: {
        sunPosition: { value: new THREE.Vector3(1, 0, 0) },
        dayTexture: { value: null },
        nightTexture: { value: null },
        specularMap: { value: null },
        cloudTexture: { value: null },
        mode: { value: 0 }
    },
    vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
    `,
    fragmentShader: `
        uniform vec3 sunPosition;
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform sampler2D specularMap;
        uniform sampler2D cloudTexture;
        uniform int mode;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
            vec3 normal = normalize(vNormal);
            vec3 sunDir = normalize(sunPosition - vWorldPosition);
            
            float intensity = max(dot(normal, sunDir), 0.0);
            float terminator = smoothstep(-0.2, 0.2, dot(normal, sunDir));

            vec4 dayColor = texture2D(dayTexture, vUv);
            vec4 nightColor = texture2D(nightTexture, vUv);
            vec4 clouds = texture2D(cloudTexture, vUv);
            float specular = texture2D(specularMap, vUv).r;

            vec4 finalColor;

            if(mode == 0) { // SATELLITE MODE
                vec3 mixedDay = mix(dayColor.rgb, clouds.rgb, clouds.a);
                vec3 viewDir = normalize(cameraPosition - vWorldPosition);
                vec3 halfVector = normalize(sunDir + viewDir);
                float specInt = pow(max(dot(normal, halfVector), 0.0), 30.0) * specular;
                mixedDay += vec3(specInt) * intensity;

                vec3 finalRGB = mix(nightColor.rgb * (1.0 - clouds.a), mixedDay * intensity, terminator);
                finalColor = vec4(finalRGB, 1.0);
            } 
            else if(mode == 3) { // NIGHT LIGHTS MODE
                finalColor = nightColor;
            }
            else { // OTHER MODES (Terrain, Political)
                finalColor = dayColor;
            }

            gl_FragColor = finalColor;
        }
    `
};
