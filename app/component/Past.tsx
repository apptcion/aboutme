import { useEffect, useRef, useState } from "react";
import styles from "../css/past.module.css";
import { clear } from "console";
import { main } from "framer-motion/client";

class Text{
  constructor(
    public info: {
      x: number,y: number,
      content: string, size: string,
      anime?: number, maintain?: number,
      fontWeight?: string, font?: string,
      appearDelay?: number,
      line? : Array<boolean> | number
      }
  ){}
}

class Diagram{
  constructor(
    public info: {x: number, y: number,
      color: string, type: string,
      size: Array<number> | number, 
      needSupport?: boolean,
      maintain?: number,
      appearDelay?: number;
    },
  ){}
}

class Img{
  constructor(
    public info: {x: number, y: number,
      url: string, size: Array<number>,
      needSupport?: boolean, maintain?: number,
      anime?: number,
      appearDelay?: number
    }
  ){}
}

const pages: Array<Array<Text | Diagram | Img>> = [
  //26
  [new Text({x: 40, y: 50, content: 'Ch 1. 시작', 
    size: '5vh', anime: 1, fontWeight: 'bold'})],
  [new Img({x: 35, y: 58, url: '/elementSchool.png', size: [30,30], needSupport: false}),
   new Text({x:5, y:57, content: '<div>2019, 초등학교 5학년</div>\
    <div style="font-size: 2.5vh">처음으로 <strong>C언어</strong> 라는걸 배웠습니다.</div>', size: '2vh',anime: 0}),
   new Text({x: 60,y: 38, content: '<div style="font-size: 2vh">2020, 초등학교 6학년</div>\
     <strong style="display: inline-block">Java</strong>라는 언어가 재밌어보여서<br /> \
      책을 사서 <strong>혼자 공부했었습니다.</strong><br />', size: '2.5vh', anime: 0}),
  ],
  [new Img({x:-10, y: 25, url: 'coding.png', size: [70,70]}),
   new Text({x: 10, y: 40, content: '2021, 중학교 1학년', size: '2vh', anime: 0}),
   new Text({x: 50, y: 48, content: 
    '중학생 때는 <strong>주말마다 코딩을 배웠습니다.</strong><br /> \
    힘들기도 했지만 <strong>새로운걸 배우는게<br />너무 즐거웠습니다.</strong>',
      size: '2.5vh', anime: 4})
  ],[
   new Text({x: 17, y: 30, content: '★', size: '3vh', anime: 1, line: 1, appearDelay: 200}),
   new Text({x: 28, y: 42, content: '★', size: '3vh', anime: 1, line: 1, appearDelay: 300}),
   new Text({x: 35, y: 37, content: '★', size: '3vh', anime: 1, line: 1, appearDelay: 350}),
   new Text({x: 44, y: 53, content: '★', size: '3vh', anime: 1, line: 1, appearDelay: 500}),
   new Text({x: 50, y: 30, content: '★', size: '3vh', anime: 1, line: 1, appearDelay: 300}),
   new Text({x: 60, y: 25, content: '★', size: '3vh', anime: 1, line: 1, appearDelay: 400}),
   new Text({x: 8, y: 65, content: 
    '어릴적에 저의 꿈은 타임머신을 만드는 것이었습니다.<br />\
    먼 시간이 지난 후에, <strong>어떤 미래가 펼쳐질지 너무 궁금했고</strong>, 그것을 보지 못한다는 것이 아쉬웠습니다.<br />\
    중학교 2학년, 제 꿈은 <strong>먼 미래에 존재할 기술을 직접 만드는 것이 되었습니다.</strong> <br />',
     size: '2vh', anime: 2, appearDelay: 1000}),
    new Img({x: 45, y: 5, url: 'moon.jpg', size: [50,50]}),
  ],[
    new Text({x: 10, y: 33, content: 
    '<strong>프로그래머의 꿈을 가지고</strong>, 여러 기술을 배우던 중<br/>\
    <strong style="color: #FF0090">디미고</strong>에 대해 들었습니다.',
     size: '2.5vh', anime: 0}),
    new Img({x: 50, y: 40, url: 'dimigo.png', size: [40,40]})
  ],[
    new Text({x: 22, y: 50, content: 'Ch 2. 직업계고 선택 동기', 
    size: '5vh', anime: 1, fontWeight: 'bold'})],
  [
    new Text({x: 7, y: 40, content:'조금 진부한 표현일 수 있지만<br />\
      그것을 가장 잘 나타내는 단어는 <strong>갈림길</strong>인 것 같습니다.', size: '3vh'}),
    new Img({x: 75, y: 42, url: 'arrow1.png', size: [15, 20], maintain: 2}),
    new Img({x: 60, y: 55, url: 'arrow2.png', size: [28, 20]}),
  ],[
    new Text({x: 12, y: 42, content: '일반적인 길을 선택한다면...', size: '3vh', fontWeight: 'bold'}),
    new Text({x: 12, y: 45, content: 
          '고등학교 3년, 대학교 4년과 군대 1년<br/>\
          <strong>총 8년 동안</strong> 제가 하고싶은 일에 집중할 수 없었습니다.<br/>\
          다른 사람들을 보면 <strong>10대에 이미 자신만의 생각을 다가갔는데,</strong><br>\
          저는 제 <strong>고등학교 3년을 공부만하며 보내고 싶지 않았습니다.</strong>', size: '2vh', line: [false, true]}),
  ],[
    new Img({x: 60, y: 55, url: 'arrow2.png', size: [28, 20]}),
    new Text({x: 7, y: 42, content: '새로운 길을 선택한다면...', size: '3vh', fontWeight: 'bold'}),
    new Text({x: 7, y: 47, content: 
          '고등학교 3년간 <strong>원하는 일을 할 수 있을 것이고,</strong><br/>\
          같은 방향을 바라보는 친구들과 함께할 수 있을 것이라고 생각했습니다.<br/>\
          평범한 길보다는 <strong>저의 꿈에 더 가까워지는 길이라고 느껴졌습니다.</strong>'
          , size: '2vh', line: [false, true]}),
  ],[
    // new Img({x: 50, y: 45, url: 'trip.png', size: [40,40]}),ㄴ
    new Text({x: 5,y: 20, content: '<div style="font-size: 2vh">2024, 중학교 3학년</div>\
      디미고에 진학하기로 한 뒤,<br/>\
      포트폴리오 제출을 위한 <strong>저의 첫 프로젝트</strong>를<br/>\
      구상하기 시작했습니다.', size: '2.5vh', anime: 0}),
    new Text({x: 5,y: 45, content: 'Spring을 사용하여, 약 6개월의 기간동안 진행하였습니다.\
      HTML, CSS, JS처럼 기본적인 웹 기술과 API, 비동기처리와 같은 \
      단순한 프로그래밍에서 진짜 개발로 넘어가는 계기가 되었습니다.', size: '2.5vh', anime: 0, line: [false, true]}),
  ]]

export default function Present() {
  const [page, setPage] = useState(0)
  const [opened, setOpened] = useState(false);
  const bookWrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const forward = useRef<boolean>(true);
  const onStage = useRef<Array<HTMLDivElement | HTMLParagraphElement>>([]);
  const animeList = useRef<Array<NodeJS.Timeout>>([]);

  const toNext = () => {
    forward.current = true;
    setPage(prev => Math.min(prev+1, pages.length))
    if(page === pages.length) return;
    clearStage(1);
  }
  const toPrev = () => {
    forward.current = false;
    setPage(prev => Math.max(0, prev-1))
    if(page === 0) return;
    clearStage(0);
  }

const clearStage = (type: number) => {
  const maintainList: Array<HTMLDivElement | HTMLParagraphElement> = [];
  animeList.current.forEach((anime) => {
    clearTimeout(anime);
  });
  onStage.current.forEach((element) => {
    const maintainStr = element.getAttribute('data-maintain');
    let maintain = Number(maintainStr);
    if(isNaN(maintain)) maintain = 0;
    const appear = Number(element.getAttribute('appear'));

    if ((type === 1 && page+1 > appear + maintain) || (type === 0 && page-1 < appear)) {
      element.style.transition = 'transform 0.8s';
      if (element instanceof HTMLParagraphElement) {
        element.style.transition = 'transform 0.5s';
        element.style.transform = `translateY(-50vh)`;
      } else {
        if(Number(element.getAttribute('anime')) === 1){
          element.classList.add(styles.removeAnime1_box);
          const img = element.querySelector('img');
          if (img) {
            img.classList.add(styles.removeAnime1_img); // img에만 애니메이션 클래스 적용
            // setTimeout(() => {
            //   stageRef.current?.removeChild(element);
            // }, 1000);
            return;
          }
          return;
        }else{
          element.style.transform = `rotateX(110deg)`;
          element.style.transformOrigin = 'bottom';
        }
      }

      setTimeout(() => {
        stageRef.current?.removeChild(element);
      }, 500);
    } else {
      maintainList.push(element);
    }
  });

  onStage.current = [...maintainList];
};

  const drawStage = () => {
    const screenRatio = 10/7;
    const data = pages[page-1];
    data.forEach((object) => {
      if(!forward.current){
        if(object.info.maintain !== undefined && object.info.maintain > 0){
           return;
        } // 유지되는 오브젝트는 그리기 안함
      }
      if(object instanceof Text){
        const newParagraph = document.createElement('p');
        newParagraph.setAttribute('appear', String(page));
        if(object.info.line){
          if(object.info.line instanceof Array){
            if(object.info.line[0] && object.info.line[1]) newParagraph.classList.add(styles.text);
            else if(object.info.line[0]) newParagraph.classList.add(styles.left_support);
            else if(object.info.line[1]) newParagraph.classList.add(styles.right_support);
          }else{
            newParagraph.classList.add(styles.center_support);
          }
        }else{
          newParagraph.classList.add(styles.text);
        }
        if(object.info.fontWeight) newParagraph.style.fontWeight = object.info.fontWeight;
        if(object.info.font) newParagraph.style.fontFamily = object.info.font;
        newParagraph.innerHTML = `<div>${object.info.content}</div>`;
        newParagraph.style.fontSize = object.info.size;
        newParagraph.style.position = 'absolute';
        newParagraph.style.top = `${object.info.y}%`;
        newParagraph.style.left = `${object.info.x}%`;
        if(object.info.maintain) newParagraph.setAttribute('data-maintain', String(object.info.maintain));
        animeList.current.push(
          setTimeout(() => {
            stageRef.current?.appendChild(newParagraph);
            onStage.current?.push(newParagraph);

            if(object.info.anime === 1){ // 위 아래로 흔들림
              newParagraph.style.transition = `transform 0.6s`;
              newParagraph.style.transform = `translateY(-${100 * (object.info.y)}%)`;
              setTimeout(() => {
                newParagraph.style.transform = `translateY(180%)`;
              },100)
              setTimeout(() => {
                newParagraph.style.transition = `transform 0.3s ease-out`;
                newParagraph.style.transform = `translateY(-95%)`;
              }, 700);
              setTimeout(() => {
                newParagraph.style.transition = `transform 0.2s ease-in`;
                newParagraph.style.transform = `translateY(40%)`;
              }, 1000);
            }else if(object.info.anime === 2){ // 쿵 떨어트림
              newParagraph.style.transform = `translateY(-${100 * (object.info.y)}%)`;
              newParagraph.style.transition = `transform 0.6s`;
              // setTimeout(() => {
              //   newParagraph.style.transform = `translateY(-${7*(object.info.y)}%)`;
              // },1000);
              // setTimeout(() => {
              //   newParagraph.style.transition = `transform 0.4s ease-out`;
              //   newParagraph.style.transform = `translateY(-100%)`;
              // }, 2800)
              setTimeout(() => {  
                newParagraph.style.transition = `transform 0.4s ease`;        
                newParagraph.style.transform = `translateY(500%)`;
                window.dispatchEvent(new Event('trigger-shake'));
              }, 1600); // 3600
              setTimeout(() => {    
                newParagraph.style.transition = `transform 2s`;      
                newParagraph.style.transform = `translateY(40%)`;
              }, 2500); // 4500
            }else if(object.info.anime === 3){ // 천천히 내려옴
              newParagraph.style.transform = `translateY(-${100 * (object.info.y)}%)`;
              newParagraph.style.transition = `transform 0.6s ease-out`;
              setTimeout(() => {          
                newParagraph.style.transform = `translateY(-200%)`;
              }, 100)
              setTimeout(() => {
                newParagraph.style.transform = `translateY(-50%)`;
              }, 1200);
              setTimeout(() => {
                newParagraph.style.transform = `translateY(40%)`;
              }, 2400);
            }else if(object.info.anime === 4){ // 천천히 내려오다가 떨어트림
              let intervalId: NodeJS.Timeout;
              newParagraph.style.transform = `translateY(-${100 * (object.info.y)}%)`;
              newParagraph.style.transition = `transform 0.6s ease-out`;
              setTimeout(() => {          
                newParagraph.style.transform = `translateY(-200%)`;
              }, 100)
              setTimeout(() => {
                newParagraph.style.transform = `translateY(-50%)`;
              }, 1200);
              setTimeout(() => {

                newParagraph.style.transform = `translateY(40%)`;
              }, 2400);
              setTimeout(() => {
                newParagraph.style.transition = `transform 0.5s ease`;
                newParagraph.style.transform = `translateY(380%)`;
              }, 3800);
              setTimeout(() => {
                let to = 0.05;
                intervalId = setInterval(() => {
                  newParagraph.style.left = `${object.info.x - to}%`;
                  to *= -1;
                },100)
              }, 4800)
              setTimeout(() => {
                newParagraph.style.transition = `transform 1.2s`;
                newParagraph.style.transform = `translateY(210%)`;
              }, 5000);
              setTimeout(() => {
                newParagraph.style.transform = `translateY(40%)`;
              }, 6400);
              setTimeout(() => {
                clearInterval(intervalId);
              }, 7500)
            }else{ // 그냥 내려옴
              newParagraph.style.transform = `translateY(-${100 * (object.info.y)}%)`;
              newParagraph.style.transition = `transform 0.6s ease-out`;
              setTimeout(() => {          
                newParagraph.style.transform = `translateY(40%)`;
              }, 100)
            }
          }, object.info.appearDelay)
        );

      }else if(object instanceof Diagram){
        const newDivBox = document.createElement('div');
        newDivBox.setAttribute('appear', String(page));
        newDivBox.style.position = 'absolute';
        newDivBox.style.height = `100%`;
        newDivBox.style.top = '0';
        newDivBox.style.left = `${object.info.x}%`;

        const newDiv = document.createElement('div');
        newDiv.style.position = `relative`
        newDiv.style.top = `${object.info.y}%`;
        newDiv.style.backgroundColor = object.info.color;
        newDiv.style.width = `100%`;

        if(object.info.needSupport !== false){
          const newSupport = document.createElement('div');
          newSupport.classList.add(styles.support);
          newSupport.style.width = `30%`;
          newSupport.style.left = `35%`;
          if(object.info.type === 'circle') newSupport.style.height = `${100 - object.info.y - (object.info.size as number)}%`;
          newDivBox.appendChild(newSupport);
        }

        if(object.info.type == 'circle'){
          newDivBox.style.width = `${object.info.size}%`;
          newDiv.style.height = `${object.info.size as number* screenRatio}%`;
          newDiv.style.borderRadius = '100%';
        }else if(object.info.type == 'rect'){
          newDivBox.style.width = `${(object.info.size as Array<number>)[1]}%`;
          newDiv.style.height = `${(object.info.size as Array<number>)[0]}%`;
          newDiv.style.width = `${(object.info.size as Array<number>)[1]}%`;
        }
        
        newDivBox.appendChild(newDiv);
        
        newDivBox.style.transformOrigin = 'bottom';
        newDivBox.style.transform = `rotateX(120deg)`;
        newDivBox.style.transition = `transform 0.3s ease-in`;
        if(object.info.maintain) newDivBox.setAttribute('data-maintain', String(object.info.maintain));
        animeList.current.push(
          setTimeout(() => {
            setTimeout(() => {          
              newDivBox.style.transform = `rotateX(0deg)`;
            },300);
            stageRef.current?.appendChild(newDivBox);
            onStage.current?.push(newDivBox)
          }, object.info.appearDelay)
        )
      }else if(object instanceof Img){
        const newDivBox = document.createElement('div');
        newDivBox.setAttribute('appear', String(page));
        newDivBox.style.position = 'absolute';
        newDivBox.style.height = `100%`;
        newDivBox.style.width = `${object.info.size[0]}%`
        newDivBox.style.top = '0';
        newDivBox.style.left = `${object.info.x}%`;
        if(object.info.anime === 1) newDivBox.setAttribute('anime', '1')

        const newImage = document.createElement('img');
        newImage.src = `/tale/${object.info.url}`;
        newImage.style.position = 'relative';
        newImage.style.top = `${object.info.y}%`;
        newImage.style.width = `100%`;
        newImage.style.objectFit = 'cover';
        newImage.style.filter = 'brightness(0)'

        if(object.info.needSupport){
          const newSupport = document.createElement('div');
          newSupport.classList.add(styles.support);
          newSupport.style.width = `30%`;
          newSupport.style.left = `35%`;
          newSupport.style.height = `${100 - object.info.y - object.info.size[1]}%`;
          
          newDivBox.appendChild(newSupport);
        }
        newDivBox.appendChild(newImage);

        newDivBox.style.transformOrigin = 'bottom';
        newDivBox.style.transform = `rotateX(120deg)`;
        newDivBox.style.transition = `transform 0.3s ease-in`;
        if(object.info.maintain) newDivBox.setAttribute('data-maintain', String(object.info.maintain));
        animeList.current.push(
          setTimeout(() => {
            setTimeout(() => {          
              newDivBox.style.transform = `rotateX(0deg)`;
            },300)
            stageRef.current?.appendChild(newDivBox);
            onStage.current?.push(newDivBox)
          }, object.info.appearDelay)
        )
      }
    })

  }

  useEffect(() => {
    if(!bookWrapRef.current) return;
    const bookWrap = bookWrapRef.current;

    if(page === 0){
      bookWrap.classList.remove(styles.lie_down);
      setOpened(false);
    }else{
      if(page === 1){
        bookWrap.classList.add(styles.lie_down);
        setOpened(true);
      }
      if(!stageRef.current) return;
      if (page - 1 >= pages.length) return;
      drawStage();
    }
  },[page])

  return (
    <div className={`${styles.past} ${styles.content}`}>
      <div className={styles.bg} />
      <div className={styles.next_btn} onClick={toNext}> ❯ </div>
      <div className={styles.prev_btn} onClick={toPrev}> ❮ </div>
      <div className={`${styles.stage}`} ref={stageRef} />

      <div className={styles.book_wrap} ref={bookWrapRef}>
        <div key={0} className={`${styles.cover} ${styles.paper}`}
          style={{
            transform: `${page != 0 ? `rotateY(-${180}deg)` : 'rotateY(0deg)'}`,
            zIndex: `${pages.length+1}`}}>
          <div className={styles.front}>
            <div className={`${styles.title_wrap}`}>
              <div className={`${styles.title}`}>TITLE</div>
            </div>
          </div>
          <div className={`${styles.back}`} />
        </div>
        {pages.map((_,index) => {
          let rotated = page > index+1 ? 180 - ((index+1)*1) : 1*(pages.length-index-1)
          if(!opened) rotated = 0
          return <div key={index+1} className={`${styles.paper}`}
              style={{
                transform: `rotateY(-${rotated}deg)`,
                zIndex: `${pages.length - index}`}} >
          </div>
        })}
        <div key={pages.length+1} className={`${styles.paper}`}
          style={{
            transform: `${page == pages.length+2 ? `rotateY(-${180 - (pages.length+1)*1}deg)` : ''}`,
            zIndex: `${0}`}} >
        </div>
      </div>
    </div>
  );
}
