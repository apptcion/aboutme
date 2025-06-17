'use client';
import { Canvas } from 'react-three-fiber';
import styles from './page.module.css';
import {Suspense, useState } from 'react';
import Present from './component/present';
import BookPage from './component/BookSpace'
import UI from './component/UI';
import { Loader } from '@react-three/drei';

function Past() {
  return (
    <div className={`${styles.past} ${styles.content}`}>
      <div className={styles.bg } />
      <UI />
      <Loader />
      <Canvas shadows className={styles.canvas} camera={{ position: [0, 0, 3], fov: 45 }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <BookPage />
          </Suspense> 
        </group>
      </Canvas>
    </div>
  )
}

function Future() {
  return (
    <div className={`${styles.future} ${styles.content}`}>
      <p>future</p>
    </div>
  )
}

export default function Page() {

  const [nowPage, setNowPage] = useState(0);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.menu_container}>
          {['Past', 'Present', 'Future'].map((title, index) => (
            <div className={styles.menu} key={index} onClick={() => {
              setNowPage(index);
            }}>{title}</div>
          ))}
        </div>
      </header>
      <main className={styles.main}>
        {nowPage === 0 && <Past />}
        {nowPage === 1 && <Present />}
        {nowPage === 2 && <Future />}
      </main>
    </div>
  );
}
