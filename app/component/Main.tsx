'use client';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    for(let i = 2; i > -1; i--){
      setTimeout(() => {
        setNowPage(i)
        if(i == 0){
          setInitFinish(true)
        }
      }, 200*(2-i));
    }
  },[])

  return (
    <div className={styles.page}>
      {!initFinish && <FakePage />}
      <header className={styles.header}>
        <div className={styles.menu_container}>
          {['my story', 'projects', 'skill'].map((t,i)=>(
            <div key={i}
                 className={`${styles.menu} ${nowPage===i?styles.selected:''}`}
                 onClick={()=>setNowPage(i)}>
              {t}
            </div>
          ))}
        </div>
      </header>
      <main className={styles.main}>
        <section style={{display: nowPage===0?'block':'none'}}><Past    /></section>
        <section style={{display: nowPage===1?'block':'none'}}><Present /></section>
        <section style={{display: nowPage===2?'block':'none'}}><Future  /></section>
      </main>
    </div>
  );
}