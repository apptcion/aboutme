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
