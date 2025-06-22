'use client';
import './component/preLoadBookAssets'
import {useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import Main from './component/Main';

function GlobalLoader() {
  const { progress } = useProgress();
  return (
    <div>{progress.toFixed(0)}%</div>
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