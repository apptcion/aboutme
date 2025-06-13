'use client';

import styles from "./page.module.css";
import { use, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function Paper() {
  const { scene } = useThree();
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const paperGeometry = new THREE.PlaneGeometry(0.5, 0.7);
    const paperMaterial = new THREE.MeshBasicMaterial({
      map: textureLoader.load('/imgs/paper.avif'),
      side: THREE.DoubleSide
    });
    const paperMesh = new THREE.Mesh(paperGeometry, paperMaterial);
    scene.add(paperMesh);
  }, []);
  return null;
}


  const config = {
    wall: {
      width: 5,
      height: 5,
      depth: 1,
      color: 'purple'
    },
    floor: {
      width: 5,
      height: 1,
      depth: 5
    },
    mobileStarSize: 300
  };

function Frame({position, imgUrl}:{position: Array<number>, imgUrl: string}) {
  const { scene } = useThree();

  useEffect(() => {
    const modelLoader = new GLTFLoader();
    modelLoader.load('/models/frame.glb', (gltf) => {
      const frame = gltf.scene;
      frame.scale.set(10, 10, 10); // 일단 1로
      frame.position.set(...position as [number, number, number]);
      frame.rotateX(Math.PI / 2); // X축으로 90도 회전
      scene.add(frame);
    });

    // PlaneGeometry 부분은 잠시 주석 처리
    // const frameGeometry = new THREE.PlaneGeometry(0.5, 0.7);
    // const frameMaterial = new THREE.MeshBasicMaterial({
    //   map: new THREE.TextureLoader().load(imgUrl),
    //   side: THREE.DoubleSide
    // });
    // const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    // frameMesh.position.set(...position as [number, number, number]);
    // scene.add(frameMesh);
  }, [scene, position]);

  return null;
}

// 정규분포 함수
function gaussianRandom(mean = 0, stdev = 1) {
  let u = 1 - Math.random();
  let v = Math.random();
  let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdev + mean;
}

function Walls() {
  const { scene } = useThree();
  const starGroupRef = useRef<THREE.Group>(new THREE.Group());

  useEffect(() => {
    const textLoader = new THREE.TextureLoader();

    // 벽 설정
    const wallGeometry = new THREE.BoxGeometry(config.wall.width, config.wall.height, config.wall.depth);
    const wallMaterial = new THREE.MeshBasicMaterial({ color: config.wall.color });

    const wall_south = new THREE.Mesh(wallGeometry, wallMaterial);
    wall_south.position.set(0, 0, (config.wall.width + config.wall.depth) / 2);

    const wall_north = new THREE.Mesh(wallGeometry, wallMaterial);
    wall_north.position.set(0, 0, -(config.wall.width + config.wall.depth) / 2);

    const wall_east = new THREE.Mesh(wallGeometry, wallMaterial);
    wall_east.position.set((config.wall.width + config.wall.depth) / 2, 0, 0);
    wall_east.rotation.y = Math.PI / 2;

    const wall_west = new THREE.Mesh(wallGeometry, wallMaterial);
    wall_west.position.set(-(config.wall.width + config.wall.depth) / 2, 0, 0);
    wall_west.rotation.y = Math.PI / 2;

    // 바닥 설정
    const floorGeometry = new THREE.BoxGeometry(config.floor.width, config.floor.height, config.floor.depth);
    const floorTexture = textLoader.load("/imgs/floor.avif");
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(0, -(config.wall.height / 2), 0);

    // 별 설정
    const starGroup = starGroupRef.current;
    const ceilingY = config.wall.height / 2 + 0.5;

    const starColors = [
      0xffffff, 0xfff7cc, 0xccf2ff, 0xf0e6ff, 0xffccff, 0xccffcc,
      0xffff99, 0x99ccff, 0xffff00, 0xffd700, 0xffc107, 0xffb300,
      0xffa500, 0xf6e05e, 0xffeb3b
    ];

    for (let i = 0; i < config.mobileStarSize; i++) {
      // 가운데에 더 많이 생성되도록 정규분포 사용
      const x = gaussianRandom(0, config.wall.width * 0.5);
      const y = ceilingY + Math.random() * 3;
      const z = gaussianRandom(0, config.wall.depth * 2);

      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const starGeometry = new THREE.SphereGeometry(0.01, 8, 8);
      const starMaterial = new THREE.MeshBasicMaterial({
        color,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(x, y, z);

      // 각 별의 고유 회전 속도 설정 (0.0005 ~ 0.003 사이 랜덤)
      star.userData.rotationSpeed = 0.0005 + Math.random() * 0.0025;

      starGroup.add(star);
    }

    scene.background = new THREE.Color(0x000000);
    scene.add(starGroup, wall_south, wall_north, wall_east, wall_west, floor);
  }, []);

  // 매 프레임 별마다 개별 회전
  useFrame(() => {
    const starGroup = starGroupRef.current;
    starGroup.children.forEach((star: any) => {
      // SphereGeometry Mesh는 rotation이 정상 동작함
      star.rotation.y += star.userData.rotationSpeed ?? 0.001;
    });
  });

  return null;
}



function Room() {

  useEffect(() => {
  }, []);

  return (
    <Canvas className={styles.canvas} camera={{ position: [0, 0, 3], fov: 50 }}>
      <OrbitControls />
      <axesHelper />
      <Walls />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <Frame position={[0.5, 0, 0]} imgUrl="/imgs/project/test.png" />
    </Canvas>
  );
}

export default function RoomPage() {
  return (
    <div className={styles.page}>
      <Room />
    </div>
  );
}