import { Canvas } from "@react-three/fiber";
import UI, { pages } from "./UI";
import styles from '../page.module.css'
import { Suspense } from "react";
import BookPage from "./BookSpace";
import { Preload } from "@react-three/drei";
import { useBookTextures } from "./bookTextures";

export default function Present() {

  return (
    <div className={`${styles.present} ${styles.content}`}>
      <div className={styles.bg } />
      <UI />
      <Canvas shadows
        className={styles.canvas} camera={{ position: [0, 0, 3], fov: 45 }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <BookPage />
            <Preload all/>  
          </Suspense> 
        </group>
      </Canvas>
    </div>
  )
}
