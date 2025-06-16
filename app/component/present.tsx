import { useEffect, useRef } from "react";
import styles from '../page.module.css'

export default function Present(){
  interface Identity {
    name: string;
    color: string;
  }
  const identities: Identity[] = [
    { name: 'a student', color: 'white' },
    { name: 'a developer', color: 'gold' },
    { name: 'a creator', color: 'aquamarine' },
  ];
  
  const identityRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!identityRef.current) return;
    identityRef.current.innerHTML = '';

    const list = document.createElement('div');
    list.classList.add(styles.identity_list);

    const loopData = [...identities, identities[0]];

    loopData.forEach(({ name, color }) => {
      const item = document.createElement('div');
      item.classList.add(styles.identity_item);
      item.style.color = color;
      item.textContent = name.toUpperCase();
      list.appendChild(item);
    });

    identityRef.current.appendChild(list);

  }, []);

  return(
    <div className={`${styles.present} ${styles.content}`}>
      <div className={styles.aboutme}>
          <div className={styles.identity_container}>
            <p>I'm&nbsp;</p>
            <div ref={identityRef} className={styles.identity_display} />
          </div>
          <p className={styles.explain}>
            Hello.
          </p>
        </div>
    </div>
  )
}
