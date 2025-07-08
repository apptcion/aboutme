import React, { useRef, useEffect, useMemo } from "react";
import styles from "../css/past.module.css";

type DivLike = React.ReactElement<React.HTMLAttributes<HTMLElement>>;

const Page = React.memo(function Page({
  front,
  back,
  index,
}: {
  front: DivLike;
  back: DivLike;
  index: number;
}) {
  const paperRef = useRef<HTMLDivElement>(null);

  const toNext = () => {
    const paper = paperRef.current!;
    paper.classList.add(styles.read);
  };

  const toPrev = () => {
    const paper = paperRef.current!;
    paper.style.zIndex = String(pages.length - index);
    paper.classList.remove(styles.read);
  };

  useEffect(() => {
    const paper = paperRef.current!;
    const handleEnd = () => {
      if (paper.classList.contains(styles.read)) {
        paper.style.zIndex = String(index);
      }
    };
    paper.addEventListener("transitionend", handleEnd);
    return () => paper.removeEventListener("transitionend", handleEnd);
  }, [index]);

  /* 버튼이 포함된 front/back 요소 복제 */
  const editedFront = React.cloneElement(front, {
    className: `${front.props.className ?? ""} ${styles.front} ${styles.side}`,
    children: (
      <>
        {front.props.children}
        <div className={styles.next_btn} onClick={toNext}>
          ❯
        </div>
      </>
    ),
  });

  const editedBack = React.cloneElement(back, {
    className: `${back.props.className ?? ""} ${styles.back} ${styles.side}`,
    children: (
      <>
        {back.props.children}
        <div className={styles.prev_btn} onClick={toPrev}>
          ❮
        </div>
      </>
    ),
  });

  return (
    <div
      className={styles.paper}
      ref={paperRef}
      style={{ zIndex: pages.length - index }}
    >
      {editedFront}
      {editedBack}
    </div>
  );
});

/* ---------- 페이지 데이터 ---------- */
interface PageStruct {
  front: DivLike;
  back: DivLike;
}

const pages: PageStruct[] = [
  {
    front: (
      <div className={styles.cover}>
        <div className={styles.title_wrap}>
          <div className={styles.title}>TITLE</div>
        </div>
      </div>
    ),
    back: <div className={`${styles.page}`}>
      <div className={`${styles.line_to_right}`} />
      <div className={`${styles.dot} ${styles.center}`}/>
      <div className={`${styles.center}`} style={{top: '54%'}}>
        2019, 초등학교 5학년</div>
    </div>,
  },
  {
    front: <div className={`${styles.page}`}>
      <div className={`${styles.line_to_left}`} />
      <div className={`${styles.dot} ${styles.center}`}/>
      <div className={`${styles.center}`} style={{top: '54%'}}>
        2020, 초등학교 6학년</div>
    </div>,
    back: <div className={styles.back_cover} />,
  },
];

/* ---------- Present ---------- */
export default function Present() {
  /* ③ pages 배열 고정 → 불필요한 재생성 차단 */
  const memoPages = useMemo(() => pages, []);

  return (
    <div className={`${styles.past} ${styles.content}`}>
      <div className={styles.bg} />
      <div className={styles.book_wrap}>
        {memoPages.map(({ front, back }, idx) => (
          <Page key={idx} front={front} back={back} index={idx} />
        ))}
      </div>
    </div>
  );
}
/**
 * 
 *
.past .bg {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -1;
  background: radial-gradient(white, #ffeeb9);
}

.book_wrap {
  position: relative;
  top: calc((100vh - 70vh) / 2);
  left: calc((100vw - 103vh) / 2);
  width: 103vh;
  height: 70vh;
  perspective: 2000px;
}

.paper {
  position: absolute;
  left: 50%;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 50%;
  transition: transform 1s ease;
  transform-origin: left center;
  transform-style: preserve-3d;
  will-change: transform;

  transform: rotateY(0deg) translateZ(0);
  contain: paint;
}

.read {
  transform: rotateY(-180deg) translateZ(0);
}

.side {
  position: absolute;
  width: 100%;
  height: 100%;

  transform: rotateY(0deg) translateZ(0);
  contain: paint;
}

.front,
.back {
  backface-visibility: hidden;
}

.paper.read .front {
  pointer-events: none;
}

.front{
    background: linear-gradient(to left, white, 90%, rgb(179, 179, 179))
}

.back {
  background: linear-gradient(to right, white, 90%, rgb(179, 179, 179));
  transform: rotateY(180deg);
}

.next_btn,
.prev_btn {
  position: absolute;
  font-weight: bold;
  font-size: 2vh;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 100;
  cursor: pointer;
  width: 4vh;
  height: 4vh;
  border: solid 3px rgb(255, 183, 58);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(255, 174, 24);
}

.prev_btn {
  right: 80%;
}

.next_btn {
  left: 93%;
}

.next_btn::after,
.prev_btn::after {
  position: absolute;
  font-size: 2vh;
  font-weight: bold;
  transition: transform 0.35s;
  border: solid 3px rgb(255, 210, 31);
  border-radius: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 205, 41, 0.5);
  box-shadow: 0 0 0 1px rgba(255, 210, 31, 0.5);
  left: -7.4%;
}

.next_btn::after {
  content: "❯";
}

.prev_btn::after {
  content: "❮";
}

.next_btn:hover::after {
  transform: translateX(-30%) scale(1.05);
}

.prev_btn:hover::after {
  transform: translateX(30%) scale(1.05);
}

.cover {
  background: #ffe7a5;
}

.title_wrap {
  position: relative;
  width: 100%;
  height: 63%;
  background-image: url("/tale/cover.png");
  background-size: cover;
}

.title {
  position: relative;
  color: rgb(168, 146, 60);
  font-size: 4vh;
  font-weight: bold;
  top: 55%;
  left: 0.5%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  background-color: white;
}

.back_cover {
  background: #ffe7a5;
}

.dot{
  position: absolute;
  background-color: black;
  border-radius: 100%;
  width: 2vh;
  height: 2vh;
}

.center{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%)
}

.line_to_right, .line_to_left{
  position: absolute;
  width: 50%;
  height: 0.7vh;
  background-color: black;
  top: 50%;
  transform: translateY(-50%);
}

.line_to_right{
  left: 50%;
}
 */