'use client';
import './component/preLoadBookAssets'
import {useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import Main from './component/Main';
import styles from './page.module.css'

function GlobalLoader() {
  const { progress } = useProgress();
  return (
    <div className={styles.progress_wrap}>
      <div className={styles.progress_track}>
        <div className={styles.progress_bar} />
      </div>
      <div className={styles.progress}>{progress.toFixed(0)}%</div>
    </div>
  )
}

export default function Page(){
  const { progress } = useProgress();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      const id = setTimeout(() => setReady(true), 300);
      return () => clearTimeout(id);
    }
  }, [progress]);

  return (
    <div>
      {!ready && <GlobalLoader />}
      {ready && <Main />}
    </div>
  )
}