'use client';
import { Canvas } from 'react-three-fiber';
import styles from './page.module.css';
import {Suspense, useState } from 'react';
import Past from './component/past';
import BookPage from './component/BookSpace'
import UI from './component/UI';
import { Loader } from '@react-three/drei';
import Image from 'next/image';
import Future from './component/future';

function Present() {
  return (
    <div className={`${styles.present} ${styles.content}`}>
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


export default function Page() {

  const [nowPage, setNowPage] = useState(0);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.menu_container}>
          {['My Store', 'Projects', 'Skill'].map((title, index) => (
            <div className={`${styles.menu} ${nowPage == index ? styles.selected : ''}`} key={index} onClick={() => {
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
