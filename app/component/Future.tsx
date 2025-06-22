import Image from 'next/image'
import styles from '../page.module.css'

import { Ref, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom';
import { converter} from 'culori'
const toLch = converter('lch')

export const hueOrInfinity = (hex: string):number => {
  const lch = toLch(hex);            // { l, c, h, … } | undefined
  if (!lch || isNaN(lch.h as number)) return 9999; // 파싱 실패
  if (lch.c < 5)        return 9999;     // 채도 ≈ 무채색
  return lch.h as number;  // 0‑360
};

function UI({size, page, setPage, order, setOrder} : 
  {size:number, page: number, setPage: React.Dispatch<number>, order: number, setOrder: React.Dispatch<number>}){

  const timerRef = useRef<number | null>(null);   // 브라우저라면 number, Node라면 NodeJS.Timeout
  const rangeRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);         // 값만 복사해 두기
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  
    timerRef.current = window.setTimeout(() => {
      setPage(value - 1);
    }, 100);
  };

  return (
    <div className={styles.UI}>
      <div className={styles.setting_order}>
        <div className={`${styles.order_wrap} ${order === 0 ? styles.selected : ''}`} onClick={() => {setOrder(0)}}>by Type</div>
        <div className={`${styles.order_wrap} ${order === 1 ? styles.selected : ''}`} onClick={() => {setOrder(1)}}>by Color</div>
        <div className={`${styles.order_wrap} ${order === 2 ? styles.selected : ''}`} onClick={() => {setOrder(2)}}>by Skill</div>
      </div>
    </div>
  )
}

function Card({ info, isDragging, index, page, setPage, overlap }: {
  info: Skill, isDragging:RefObject<boolean> ,index: number,
  page: number, setPage: React.Dispatch<number>,
  overlap: number
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!cardRef.current || !cardContainerRef.current) return;

    const cardContainer = cardContainerRef.current;
    const card = cardRef.current;

    let refl = cardContainer.querySelector<HTMLElement>(`.${styles.reflection}`);
    if (!refl) {
      refl = card.cloneNode(true) as HTMLDivElement;
      refl.classList.add(styles.reflection);
      refl.style.background = `linear-gradient(to bottom right, black 45%, ${info.theme})`;
      const reflPercent = refl.querySelector(`.${styles.percent}`) as HTMLElement | null;
      if (reflPercent) {
        reflPercent.style.transform = `translateX(${info.proficiency}%)`;
      }
      cardContainer.appendChild(refl);
    }

    [styles.selected, styles.at_left, styles.at_right].forEach(cls => {
      refl!.classList.toggle(cls, card.classList.contains(cls));
    });
  }, [page, overlap]);

  useEffect(() => {
    percentRef.current!.style.transform = `translateX(${info.proficiency}%)`;
  }, [info.proficiency]);

  return (
    <div className={styles.card_container}
      ref={cardContainerRef}
      style={{ position: 'absolute', transform: `translateX(${(52 * index)}vw)` }}>
      <div
        className={`${styles.card}
          ${page === index ? styles.selected : ''}
          ${page - 1 === index  && overlap === 0 ? styles.at_left : ''}
          ${page + 1 === index  && overlap === 0 ? styles.at_right : ''}`}
        ref={cardRef}
        style={{ background: `linear-gradient(to bottom right, black 50%, ${info.theme})`,
                 boxShadow: `0px 0px 20px ${info.theme}`}}
        onClick={() => {
          if(isDragging.current) return;
          setPage(index)
        }} >
        {/* 왼쪽 */}
        <div className={styles.left}>
          <Image className={styles.card_img}
                 style={{filter: `drop-shadow(0 0 12px ${info.theme})`}}
                 src={`/skills/${info.url}`} alt="" fill
                 draggable={false} />
          <p className={styles.name} style={{color: `${info.theme}`}}>{info.name}</p>
        </div>

        {/* 오른쪽 */}
        <div className={styles.right}>
          <div className={styles.text_wrap}>
            <div className={styles.text_head}>Inform</div>
            <p className={styles.card_text}>{info.description}</p>
          </div>
          {/* 그래프 영역 */}
          <div className={styles.graph_wrap}>
            <div className={styles.graph_head}>Skilled</div>
            <div className={styles.graph_body}>
              <div className={styles.graph}>
                <div
                  className={styles.bar}
                  style={{
                    width: `${info.proficiency}%`,
                    filter: `drop-shadow(0px 0px 3px ${info.theme})`,  
                    background: info.graphColor,
                  }}
                />
              </div>

              <p className={styles.percent} ref={percentRef}>
                {info.proficiency}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UnitCard({ info, isDragging, index, page, setPage, overlap }: {
  info: Unit, isDragging:RefObject<boolean> ,index: number,
  page: number, setPage: React.Dispatch<number>,
  overlap: number
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !cardContainerRef.current) return;

    const cardContainer = cardContainerRef.current;
    const card = cardRef.current;

    let refl = cardContainer.querySelector<HTMLElement>(`.${styles.reflection}`);
    if (!refl) {
      refl = card.cloneNode(true) as HTMLDivElement;
      refl.classList.add(styles.reflection);
      refl.style.background = `linear-gradient(to bottom right, black 45%, ${info.theme})`;
      cardContainer.appendChild(refl);
    }

    [styles.selected, styles.at_left, styles.at_right].forEach(cls => {
      refl!.classList.toggle(cls, card.classList.contains(cls));
    });
  }, [page, overlap]);

  return (
    <div className={styles.card_container}
      ref={cardContainerRef}
      style={{ position: 'absolute', transform: `translateX(${(52 * index)}vw)` }}>
      <div
        className={`${styles.card}
          ${page === index ? styles.selected : ''}
          ${page - 1 === index  && overlap === 0? styles.at_left : ''}
          ${page + 1 === index  && overlap === 0? styles.at_right : ''}`}
        ref={cardRef}
        style={{ background: `linear-gradient(to bottom right, black 50%, ${info.theme})`,
                 boxShadow: `0px 0px 20px ${info.theme}` }}
        onClick={() => {
          if(isDragging.current) return;
          setPage(index)
        }} >
        <div className={styles.content_wrap}>
          <p className={styles.unit_title} style={{color: `${info.theme}`, margin: 0}}>{info.title}</p>
          <div className={styles.unit_content}>
            {info.content}</div>
        </div>
      </div>
    </div>
  );
}

interface Unit {
  title: string,
  theme: string,
  content: string,
  url: string
}

interface Skill {
    name: string,
    url: string,
    description: string,
    proficiency: number,
    theme: string,
    graphColor: string
}

const LangUnitCard: Unit = {
  title: 'Programming languages',
  content: '프로그래머의 교양',
  theme: '#a1ffe1',
  url: ''
}

const FrameworkUnitCard: Unit = {
  title: 'Framework/libraries',
  content: `진짜 개발의 시작`,
  theme: '#de8cff',
  url: ''
}

const etcUnitCard: Unit = {
  title: "Other Skills",
  content: "더 큰 프로젝트",
  theme: "#ffee8c",
  url: ''
}

const Languages: Array<Skill> = [
    //C
    {name: "C language", url: "C.svg",
    description: 
      "C언어는 가장 유명한 프로그래밍 언어 중에 하나입니다.\n"+
      "제가 초등학교 5학년 때 처음으로 배웠던 언어도\nC언어였습니다.",
    proficiency: 30, theme: '#1c6ee2', graphColor: ' #1e7cff'},
    //JAVA
    {name: "Java", url: "Java.svg",
    description: `Java 역시 C언어와 함께 대표적 프로그래밍 언어입니다.\n `+
    "국내 대기업들이 가장 많이 사용하는 언어입니다.\n"+
    "객체지향을 훌륭하게 구현하여, 안정성이 매우 높습니다.",
    proficiency: 40, theme: '#ff2e2e', graphColor: ' #f00000'},
    //#e11f21;
    //Python
    {name: "Python", url: "Python.png",
    description: "Python은 C, Java와 함께 가장 대표적인 프로그래밍 언어입니다. "+
    "최근 입문자에게 추천되고 있으며\n"+
    "데이터 분석과 인공지능은 대부분 Python을 사용합니다.",
    proficiency: 45, theme: '#f1b51d', graphColor: '#f1b51d'},
    //JS
    {name: "JavaScript", url: "JavaScript.svg",
    description: "제가 가장 많이 사용하는 언어로, 처음에는 웹사이트를 만들기 위해 사용하는 언어였지만, "+
    "그 기능이 확장되어 현재\n모바일 앱, 데스크톱 앱, 서버 구축 등 광범위하게 사용되며\n"+
    "거의 모든 스타트업들이 사용하는 언어입니다.",
    proficiency: 87, theme: '#ffef6c', graphColor: '#d4b700'},
    //TS
    {name: "TypeScript", url: "TypeScript.svg",
    description: "TypeScript는 JavaScript의 Type개념을 추가한 버전으로" + 
    "큰 규모의 프로젝트와 협업을 진행할 때 매우 유용한 도구입니다.",
    proficiency: 83, theme: '#2890ff', graphColor: '#3178c6'},
    //HTML
    {name: "HTML", url: "HTML.png",
    description: "HTML은 웹의 기본 뼈대를 만들기 위한 마크 업 언어로,\n"+
    "프론트 엔드 개발자라면 기본적으로 익히는 스킬 중 하나입니다.",
    proficiency: 70, theme: '#F25D27', graphColor: '#F25D27'},
    //CSS
    {name: "CSS", url: "CSS.svg",
    description: "CSS는 HTML과 함께 웹 사이트를 제작하는\n"+
    "기본 요소로 사이트를 구성하는 StyleSheet입니다. ",
    proficiency: 80, theme: '#3030ff', graphColor: '#0066ff'},
]

const Frameworks: Array<Skill> = [
    //React
    {name: "React", url: "React.svg",
    description: "React는 페이스북에서 개발한 JavaScript 프레임워크로\n"+
    "현재 웹 개발에서 가장 많이 사용되는 도구 중 하나입니다.\n"+
    "JavaScript의 사용률을 급격히 끌어올린 주역 중 하나입니다.",
    proficiency: 90, theme: '#4eadc8', graphColor: '#2aabcf'},
    //Next.js
    {name: "Next.js", url: "Next.js.png",
    description: "Next는 SSR과 페이지 Route 등의 기능을 추가하여"+
    "기존 React의 단점을 해결한 프론트엔드 프레임워크입니다.\n"+
    "제가 개발할 때 가장 많이 사용하는 프레임워크 중 하나입니다.",
    proficiency: 92, theme: '#FFFFFF', graphColor: '#FFFFFF'},
    //Flutter
    {name: "Flutter", url: "Flutter.png",
    description: "Flutter는 구글에서 만든 모바일 앱 개발을 위한 도구입니다.\n"+
    "가장 잘 알려진 모바일 개발 프레임워크 중 하나입니다.\n"+
    "Callback Hell 문제에도 불구하고,\n많은 퍼스트 파티 라이브러리를 제공해 인기가 많습니다.",
    proficiency: 60, theme: '#0568A6', graphColor: '#52A8F2'},
    //React-native
    {name: "React Native", url: "ReactNative.png",
    description: "React Native는 React를 만든 페이스북에서\n"+
    "모바일 앱 개발을 위해 React의 문법을 기반으로\n만든 프레임워크입니다.\n"+
    "웹에서 사용한 문법을 그대로 사용할 수 있어, 웹 개발자 인력이\n앱 개발을 쉽게 시작할 수 있다는 장점이 있습니다.",
    proficiency: 35, theme: '#04B2D9', graphColor: '#04B2D9'},
    //Nest.js
    {name: "Nest.js", url: "Nest.js.svg",
    description: "Nest.js는 JavaScript를 사용하는 백엔드 프레임워크입니다.\n"+
    "Spring과 비슷한 구조를 가지고 있으며 코드를\n모듈화하기 좋습니다."+
    "구조가 안정적이어서\n대규모 또는 팀 프로젝트에 적합합니다",
    proficiency: 38, theme: '#e0234e', graphColor: '#e0234e'},
    //Three.js
    {name: "Three.js", url: "Three.js.svg",
    description: "Three.js는 웹 상에서 3d를 보여줄 수 있도록 도와주는\n"+
    "라이브러리입니다. 3d를 웹에 적용함으로써 기존에는 없던\n"+
    "새로운 경험을 사용자에게 줄 수 있다는 점이 매력적입니다.\n",
    proficiency: 64, theme: '#FFFFFF', graphColor: '#FFFFFF'},
    //Spring
    {name: "Spring", url: "Spring.svg",
    description: "Spring은 Java를 기반으로 만들어진 백엔드 프레임워크로\n"+
    "매우 안정되어 있어 국내 대기업과 정부에서 많이 사용합니다.\n"+
    "제가 가장 먼저 배운 프레임워크로, 웹의 동작원리에 대한 개념을 잡기 적합합니다.",
    proficiency: 35, theme: '#77bc1f', graphColor: '#77bc1f'},
    //Flask
    {name: "Flask", url: "Flask.png",
    description: "Spring은 Java를 기반으로 만들어진 백엔드 프레임워크로\n"+
    "매우 안정되어 있어 국내 대기업과 정부에서 많이 사용합니다.\n"+
    "제가 가장 먼저 배운 프레임워크로, 웹의 동작원리에 대한 개념을 익히기 적합합니다.",
    proficiency: 48, theme: '#FFFFFF', graphColor: '#FFFFFF'},
    //Express
    {name: "Express", url: "Express.svg",
    description: "Express는 JavaScript로 백엔드를 구축할 수 있는\n"+
    "가장 기본적인 프레임워크이며, 대부분 JavaScript 프레임워크의 코어로 작동합니다."+
    " 높은 자유도를 가져 작은 개인 프로젝트에서 적합합니다.",
    proficiency: 43, theme: '#1e76a1', graphColor: '#1e76a1'},
]

const Other: Array<Skill> = [
    //mongoDB
    {name: "mongoDB", url: "mongoDB.svg",
    description: "mongoDB는 대표적인 NoSQL 데이터베이스입니다.\n"+
    "저장할 수 있는 데이터 타입이 유연하다는 장점과,\n다른 편리한 기능 덕분에"+
    " 다양한 곳에 많이 사용됩니다.",
    proficiency: 47, theme: '#0DF205', graphColor: '#04BF33'},
    //oracle
    {name: "Oracle DB", url: "OracleDB.png",
    description: "미국 Oracle사에서 제공하는 Oracle DB는\n"+
    "점유율 32%로 전세계에서 가장 많이 사용되는 DB 시스템입니다."+
    "무겁지만, 매우 안정되어 있으며, 또 강력한 성능을 자랑합니다.",
    proficiency: 44, theme: '#F20505', graphColor: '#F20505'},
    //oracle
    {name: "MySQL", url: "MySQL.png",
    description: "MySQL은 가벼우면서도 훌륭한 성능을 자랑합니다.\n"+
    "Oracle DB이 엄격하다면, MySQL은 비교적 유연하여\n"+
    "보다 작은 규모의 프로젝트에 적합합니다.",
    proficiency: 70, theme: '#03658C', graphColor: '#D97904'},
    //oracle
    {name: "Nginx", url: "Nginx.png",
    description: "Nginx는 웹 서버를 구동시키기 위해 필요한 프로그램입니다.\n"+
    "개발자가 작성한 코드를 실제로 사용자에게 보여주기 위해서는\n"+
    "NGINX 등 WAS프로그램의 설정이 반드시 필요합니다.",
    proficiency:67, theme: '#17A649', graphColor: '#17A649'},
    //Figma
    {name: "Figma", url: "figma.png",
    description: "Figma는 디자인을 위한 도구 중 하나입니다.\n"+
    "다른 팀원과의 실시간 협업을 지원하고, 개발자에게 친화적이어서\n"+
    "대부분의 IT 프로젝트에서 사용합니다.\n",
    proficiency:50, theme: '#9857F2', graphColor: '#F26B5E'},
    // , #1DB6F2, #07D977, #F2441D, #F26B5E
    //Linux
    {name: "Linux", url: "Linux.png",
    description: "Linux는 대부분의 서버에서 사용하는 운영체제입니다.\n"+
    "오픈소스로 가격이 무료이며, 여러 유저가 동시에\n접속 할 수 있기 때문에 "+
    "서버로 매우 적합합니다.",
    proficiency:67, theme: '#F29F05', graphColor: '#F28705'},
]

export default function Future() {
  const cardWrapRef = useRef(null)
  const firstLoad = useRef(true)
  const [page, setPage] = useState(0)
  const isDragging = useRef(false)
  const [overlap, setOverlap] = useState(0);   

  const [skills, setSkills] = useState<Array<Skill | Unit>>([
    LangUnitCard, ...Languages,
    FrameworkUnitCard, ...Frameworks,
    etcUnitCard, ...Other
  ])
  const skillsLen = useRef(skills.length)
  const [order, setOrder] = useState(0);

const sortAnimation = (newList: Array<Skill | Unit>) => {
  const wrap = cardWrapRef.current as HTMLDivElement | null;
  if (!wrap) return;

  const containers = Array.from(wrap.children) as HTMLElement[];
  setOverlap(52); 

  containers.forEach(container => {
    const card = container.querySelector<HTMLElement>(`.${styles.card}`);
    const refl = container.querySelector<HTMLElement>(`.${styles.reflection}`);

    [card, refl].forEach(el => {
      if (!el) return;
      el.classList.remove(styles.at_left, styles.at_right);
    });

    container.style.transition = 'transform .9s';
    container.style.transform  = 'translateX(0vw)';
  });

  setTimeout(() => {
    setSkills(newList);
    skillsLen.current = newList.length;
    const newContainers = Array.from(wrap.children) as HTMLElement[];

    newContainers.forEach((container, i) => {
      container.style.transition = 'transform .9s';
      container.style.transform  = `translateX(${52 * i}vw)`;
    });
    setOverlap(0);
  }, 1000);
};

  useEffect(() => {
    if(cardWrapRef.current){
      const cardWrap = cardWrapRef.current as HTMLDivElement;
      cardWrap.style.transform = `translateX(-${(page* 52)}vw)`
    }

  }, [page, overlap])

  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    const wrap = cardWrapRef.current;
    if (!wrap) return;

    const down = (e: PointerEvent) => {
      dragStart.current = e.clientX;
      isDragging.current = false;
    };

    const move = (e: PointerEvent) => {
      if (dragStart.current === null) return;
      if (Math.abs(e.clientX - dragStart.current) > 5) isDragging.current = true;
    };

const up = (e: PointerEvent) => {
  if (dragStart.current === null) return;

  const diff = e.clientX - dragStart.current;
  const threshold = 200;

  if (Math.abs(diff) > threshold) {
    const step = Math.floor(Math.abs(diff) / threshold);

    setPage(prev => {
      if (diff < 0) {                                      
        return Math.min(prev + step, skillsLen.current - 1);
      } else {                                             
        return Math.max(prev - step, 0);
      }
    });
  }
  dragStart.current = null;
};
    (wrap as HTMLDivElement).addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup',   up,   { passive: true });

    return () => {
      (wrap as HTMLDivElement).removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup',   up);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {

      e.preventDefault();
      setPage((prev) => {
        if (e.deltaY > 0 && prev < skillsLen.current - 1) {
          return prev + 1;
        } else if (e.deltaY < 0 && prev > 0) {
          return prev - 1;
        }
        return prev;
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    if(!cardWrapRef.current) return;
    setPage(0)
    
    const children = Array.from((cardWrapRef.current as HTMLDivElement).children) as HTMLElement[];
    children[1].classList.remove(styles.at_right)
    if(firstLoad.current){
      firstLoad.current = false;
      return;
    }
    if(order === 0){ //sort by Type
      const newList = [
        LangUnitCard, ...Languages,
        FrameworkUnitCard, ...Frameworks,
        etcUnitCard, ...Other
      ]
      sortAnimation(newList)
    }else if(order === 1){
      const newList = [...Languages, ...Frameworks, ...Other].sort((a, b) => {
        const hueA = hueOrInfinity(a.theme);
        const hueB = hueOrInfinity(b.theme);
        return hueA - hueB;
      });
      sortAnimation(newList);
    }else if(order === 2){
      const newList = [...Languages, ...Frameworks, ...Other].sort((a,b) => a.proficiency - b.proficiency)
      sortAnimation(newList)
    }
    
  }, [order]) 

  const isSkill = (obj: any) => 
    'proficiency' in obj

  return (
    <div className={`${styles.future} ${styles.content}`}>
      <div className={styles.display}>
        <div className={styles.card_wrap} ref={cardWrapRef} style={{width: `${skills.length * 52}vw`}}>
          {skills.map((info, index) => {
            if(isSkill(info)){
              return <Card 
                        key={(info as Skill).name} isDragging={isDragging}
                        info={info as Skill} index={index}
                        page={page} setPage={setPage}
                        overlap={overlap}/>
            }else{
              return <UnitCard
                        key={(info as Unit).title} isDragging={isDragging}
                        info={info as Unit} index={index}
                        page={page} setPage={setPage}
                        overlap={overlap}/>
            }
          })}
        </div>
        <UI size={skills.length} page={page} setPage={setPage} order={order} setOrder={setOrder}/>
      </div>
    </div>
  )
}