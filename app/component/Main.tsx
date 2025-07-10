'use client';
import { useEffect, useRef, useState } from 'react';
import Past    from '../component/Past';
import Present from '../component/Present';
import Future  from '../component/Future';
import styles  from '../page.module.css';

function FakePage() {
  return (
    <div className={styles.progress_wrap}>
      <div className={styles.progress}>100%</div>
    </div>
  )
}

export default function Main() {
  const [nowPage, setNowPage] = useState(0);
  const [initFinish, setInitFinish] = useState(false)
  const [shaking, setShaking] = useState(false);
  const fadeRef = useRef<HTMLTableSectionElement>(null);

  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 1000); // 애니메이션 끝나면 제거
  };

  useEffect(() => {
    for(let i = 2; i > -1; i--){
      setTimeout(() => {
        setNowPage(i)
        if(i == 0){
          setInitFinish(true)
        }
      }, 200*(2-i));
    }

    const shakeListener = () => triggerShake();
    window.addEventListener('trigger-shake', shakeListener);
    return () => window.removeEventListener('trigger-shake', shakeListener);
  },[])

const changePage = (page: number) => {
  if (fadeRef.current) {
    fadeRef.current.style.transition = 'background-color 0.5s ease-in-out';
    fadeRef.current.style.backgroundColor = 'rgba(0,0,0,1)';
  }

  setTimeout(() => {
    setNowPage(page);
    if (fadeRef.current) {
      fadeRef.current.style.backgroundColor = 'rgba(0,0,0,0)';
    }
  }, 500); // 페이지 변경 후에 배경 페이드아웃
};

  return (
    <div className={`${styles.page} ${shaking ? styles.shake : ''}`}>
      {!initFinish && <FakePage />}
      <header className={styles.header}>
        <div className={styles.menu_container}>
          {['my story', 'projects', 'skill'].map((t,i)=>(
            <div key={i}
                 className={`${styles.menu} ${nowPage===i?styles.selected:''}`}
                 onClick={()=> changePage(i)}>
              {t}
            </div>
          ))}
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.fade} ref={fadeRef}/>
        <section style={{display: nowPage===0?'block':'none'}}><Past    /></section>
        <section style={{display: nowPage===1?'block':'none'}}><Present /></section>
        <section style={{display: nowPage===2?'block':'none'}}><Future  /></section>
      </main>
    </div>
  );
}