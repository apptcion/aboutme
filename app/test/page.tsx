'use client';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const SoftPageBook: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pagesRef = useRef<THREE.Mesh[]>([]);
  const flipTargetsRef = useRef<number[]>([]); // ✅ flipProgress 목표값

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pages: THREE.Mesh[] = [];
    const totalPages = 5;

    for (let i = 0; i < totalPages; i++) {
      const uniforms: { [uniform: string]: THREE.IUniform } = {
        time: { value: 0.0 },
        bendAmount: { value: 0.5 },
        flipProgress: { value: i === 0 ? 1.0 : 0.0 },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          uniform float bendAmount;
          uniform float flipProgress;
          varying vec2 vUv;

          void main() {
            vUv = uv;
            vec3 transformed = position;

            float angle = flipProgress * 3.1415;
            float radius = 5.0;
            float theta = uv.x * angle;

            transformed.x = radius * sin(theta);
            transformed.z = radius * (1.0 - cos(theta));

            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          void main() {
            gl_FragColor = vec4(vec3(vUv.x, vUv.y, 1.0), 1.0);
          }
        `,
        side: THREE.DoubleSide,
      });

      const geometry = new THREE.PlaneGeometry(5, 8, 128, 128);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = i * 0.01;
      scene.add(mesh);
      pages.push(mesh);
    }

    pagesRef.current = pages;
    flipTargetsRef.current = pages.map((_, index) =>
      index <= currentPage ? 1.0 : 0.0
    );

    const animate = () => {
      requestAnimationFrame(animate);
      pagesRef.current.forEach((page, index) => {
        const uniforms = (page.material as THREE.ShaderMaterial).uniforms;
        uniforms.time.value += 0.01;

        const target = flipTargetsRef.current[index] ?? 0.0;
        const current = uniforms.flipProgress.value;
        uniforms.flipProgress.value = THREE.MathUtils.lerp(current, target, 0.1);
      });
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    flipTargetsRef.current = pagesRef.current.map((_, index) =>
      index <= currentPage ? 1.0 : 0.0
    );
  }, [currentPage]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        <button onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}>Previous</button>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 4))}>Next</button>
      </div>
    </div>
  );
};

export default SoftPageBook;
