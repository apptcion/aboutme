import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { pageAtom, pages, Text, Image } from "./UI";
import * as THREE from 'three'
import { useAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils.js";
import { easing } from "maath";
import createTexture from "../util/createTexture";
import { useBookTextures } from "./bookTextures";

const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.05;
const turningCurveStrength = 0.09;

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeometry = new THREE.BoxGeometry(
    PAGE_WIDTH,
    PAGE_HEIGHT,
    PAGE_DEPTH,
    PAGE_SEGMENTS,
    2
);

pageGeometry.translate(PAGE_WIDTH /2, 0, 0);

const position = pageGeometry.attributes.position;
const vertex = new THREE.Vector3();
const skinIndexes: number[] = [];
const skinWeights: number[] = [];

for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i)
    const x = vertex.x;

    const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
    let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

    skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute(
    'skinIndex',
    new THREE.Uint16BufferAttribute(skinIndexes, 4)
);

pageGeometry.setAttribute(
    'skinWeight',
    new THREE.Float32BufferAttribute(skinWeights, 4)
);

const whiteColor = new THREE.Color("white");
const pageMaterials = [
    new THREE.MeshStandardMaterial({
        color: whiteColor
    }),
    new THREE.MeshStandardMaterial({
        color: '#111',
    }),
    new THREE.MeshStandardMaterial({
        color: whiteColor,
    }),
    new THREE.MeshStandardMaterial({
        color: whiteColor,
    })
];

type PageProps = {
  number: number;
  front: {
          image: Array<Image> | null,
          lines: Array<Text> | null
      };
  back: {
          image: Array<Image> | null,
          lines: Array<Text> | null
      };
  [key: string]: any;
};

interface ImageData {
    source: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number
}

const Page = ({number, front, back, page, opened, bookClosed}: PageProps) => {
    // ① URL 배열 분리
    const frontUrls = front.image?.map(img => `/books/${img.name}`);
    const backUrls  = back.image?.map(img  => `/books/${img.name}`);

    // ② 각각 useTexture
    let frontTextures = null;
    let backTextures = null;
    if(frontUrls){
       frontTextures = useTexture(frontUrls);
    }
    if(backUrls){
        backTextures  = useTexture(backUrls);
    }

    frontTextures?.map((value: THREE.Texture) => {
        value.colorSpace = THREE.SRGBColorSpace
    })
    backTextures?.map((value: THREE.Texture) => {
        value.colorSpace = THREE.SRGBColorSpace
    })
    const group = useRef<THREE.Group>(null);
    const turnedAt = useRef(0);
    const lastOpened = useRef(opened);
    // 타입 명시
    const skinnedMeshRef = useRef<THREE.SkinnedMesh | null>(null);

    const manualSkinnedMesh = useMemo(() => {
        const bones: THREE.Bone[] = [];
        for(let i = 0; i <= PAGE_SEGMENTS; i++) {
            let bone = new THREE.Bone();
            bones.push(bone);
            if( i === 0){
                bone.position.x = 0;
            }else{
                bone.position.x = SEGMENT_WIDTH;
            }
            if(i > 0){
                bones[i-1].add(bone);
            }
        }

        const frontImages: ImageData[] = []
        const backImages: ImageData[] = [];
        if(front.image && frontTextures){
            for(let i = 0; i < front.image.length; i++){
                frontImages.push({
                    source: frontTextures[i].image as CanvasImageSource,
                    x: front.image[i].x / 100,
                    y: front.image[i].y / 100,
                    width: front.image[i].width / 100,
                    height: front.image[i].height / 100
                })
            }
        }
        if(back.image && backTextures){
            for(let i = 0; i< back.image.length; i++){
                backImages.push({
                    source: backTextures[i].image as CanvasImageSource,
                    x: back.image[i].x / 100,
                    y: back.image[i].y / 100,
                    width: back.image[i].width / 100,
                    height: back.image[i].height / 100
                })
            }
        }

        const picture = createTexture(front.lines, frontImages);
        const picture2 = createTexture(back.lines, backImages);
        const skeleton = new THREE.Skeleton(bones);
        const materials = [...pageMaterials, 
            new THREE.MeshStandardMaterial({
                color: whiteColor,
                map: picture,
                roughness: 1
            }),
            new THREE.MeshStandardMaterial({
                color: whiteColor,
                map: picture2,
                roughness: 1
            })
        ];
        const mesh = new THREE.SkinnedMesh(pageGeometry, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
        mesh.add(skeleton.bones[0]);
        mesh.bind(skeleton);
        return mesh;

    }, [
        frontTextures, backTextures,
        front.image, back.image]);

    useFrame((_, delta) => {
        if (skinnedMeshRef.current) {

            if(lastOpened.current !== opened){
                turnedAt.current = +new Date();
                lastOpened.current = opened;
            }

            let turningTime = Math.min(400, new Date().getTime() - turnedAt.current) / 400;
            turningTime = Math.sin(turningTime * Math.PI);

            let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
            targetRotation += degToRad(number * 0.8);
            if(!bookClosed){
                targetRotation += degToRad(number * 0.8);
            }

            const bones = skinnedMeshRef.current.skeleton.bones;
            for(let i = 0; i < bones.length; i++){
                const target = i === 0? group.current : bones[i];

                const insideCurveIntensity =  i < 8 ? Math.sin(i * 0.18 + 0.25) : 0;
                const outsideCurveIntensity = i>= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
                const turningIntensity = Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;

                let rotationAngle = 
                    insideCurveStrength * insideCurveIntensity * targetRotation -
                    outsideCurveStrength * outsideCurveIntensity * targetRotation + 
                    turningCurveStrength * turningIntensity * targetRotation;
                let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);
                if (bookClosed){
                    if(i === 0){
                        rotationAngle = targetRotation;
                        foldRotationAngle = 0;
                    }else{
                        rotationAngle = 0;
                        foldRotationAngle = 0;
                    }
                }

                easing.dampAngle(
                    (target as THREE.Bone || THREE.Group).rotation,
                    "y",
                    rotationAngle,
                    easingFactor,
                    delta);

                const foldIntensity = 
                    i > 8 
                        ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
                        : 0;
                easing.dampAngle(
                    (target as THREE.Bone || THREE.Group).rotation,
                    "x",
                    foldRotationAngle * foldIntensity,
                    easingFactorFold,
                    delta
                );
            }
        }
    });

    const [_, setPage] = useAtom(pageAtom);

    return (
        <group ref={group}
            onClick={(e) => {
                e.stopPropagation()
                setPage(opened ? number : number +1);
            }} >
            <primitive
                object={manualSkinnedMesh}
                position-z={-number * PAGE_DEPTH + page* PAGE_DEPTH}
                ref={skinnedMeshRef}
            />
        </group>
    )
}

function Book(){
    const [page] = useAtom(pageAtom)
    const [delayedPage, setDelayedPage] = useState(page);
    const texures = useBookTextures(pages);

    useEffect(() => {
        if(page === delayedPage) return;
        const timeout = setTimeout(() => {
            setDelayedPage(prev => 
                page > prev ? prev + 1 : prev-1
            )
        }, Math.abs(page - delayedPage) > 2 ? 50: 150)

        return () => {
            clearTimeout(timeout)
        }
    }, [page, delayedPage])


    return (
        <group rotation-y={-Math.PI / 2}>
            {pages.map((pageData, index) => (
                <Page 
                    key={index}
                    page={delayedPage}
                    number={index}
                    opened={delayedPage > index}
                    bookClosed={delayedPage === 0 || delayedPage === pages.length}
                    {...pageData}
                />
            ))}
        </group>
    );
}

export default function BookPage() {
    return (
        <>
            <Book />
            <OrbitControls />
            <directionalLight
                position={[0, 1, 1]}
                intensity={5}
            />
            
            <directionalLight
                position={[0, 1, -1]}
                intensity={2.5}
            />
            <directionalLight
                position={[2, 5, 2]}
                intensity={2.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
            />
            <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <shadowMaterial transparent opacity={0.2} />
            </mesh>
        </>
    )
}