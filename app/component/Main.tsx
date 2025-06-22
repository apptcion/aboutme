'use client';
import { useState } from 'react';
import Past    from '../component/Past';
import Present from '../component/Present';
import Future  from '../component/Future';
import styles  from '../page.module.css';

export default function Main() {
  const [nowPage, setNowPage] = useState(0);

  return (
    <div className={styles.page}>
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