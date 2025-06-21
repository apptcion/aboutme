import { atom, useAtom } from 'jotai';
import styles from '../page.module.css'
import { useEffect, useRef } from 'react';


export interface Image{
    name: string,
    x:number,
    y:number,
    width: number,
    height: number
}

export interface Page {
    front: {
        image: Array<Image> | null,
        lines: Array<Text> | null
    }, 
    back: {
        image: Array<Image> | null,
        lines: Array<Text> | null
    }
}

export interface Text{
    text: string;
    color: string;
    font: string;
    x: number,
    y: number;
    size: number;
    weight: number;
}

const frameLeftImg = {name: "frameLeft.svg", x: 1, y: 1, width: 98, height: 98}
const frameRightImg = {name: "frameRight.svg", x: 1, y: 1, width: 98, height: 98}
const horizenLine = "horizen.svg"
const verticalLine = "vertical.svg"

const timewave_logo = {name: "timewave_logo.svg", x: 10, y: 10, width: 40, height: 30}
const timewave_bg = {name: "timewave_bg.png", x: 0, y: 0, width: 100, height: 100}
const timewave_bg2 = {name: "timewave_bg2.png", x: 0, y: 0, width: 100, height: 100}
const timewave1 = {name: "timewave.png", x: 4, y: 3.5, width: 58, height: 30}
const timewave2 = {name: "timewave2.png", x: 42, y: 35, width: 58, height: 30}
const timewave3 = {name: "timewave3.png", x: 4, y: 66.5, width: 58, height: 30}

const daystar_logo = {name: "daystar_logo.png", x:42, y: 10, width: 40, height: 30}
const daystar_bg = {name: "daystar_bg.png", x: 0, y: 0, width: 100, height: 100}
const daystar_bg2 = {name: "daystar_bg2.png", x: 0, y: 0, width: 100, height: 100}
const daystar_head = {name: "daystar_head.png", x: 0, y: 0, width: 100, height: 10}
const daystar1 = {name: "daystar1.png", x:12, y: 16, width: 22, height: 33}
const daystar2 = {name: "daystar2.png", x:35, y: 16, width: 22, height: 33}
const daystar3 = {name: "daystar3.png", x: 75, y: 58, width: 22, height: 33}
const daystar4 = {name: "daystar4.png", x: 52, y: 58, width: 22, height: 33}

const dimifriend_logo = {name: "dimifriend_logo.png", x: 5, y: 20, width: 40, height: 30}
const dimifriend_bg = {name: "dimifriend_bg.png", x: 0, y: 0, width: 100, height: 100}
const dimifriend_bg2 = {name: "dimifriend_bg2.png", x: 0, y: 0, width: 100, height: 100}
const dimifriend1 = {name: "dimifriend1.png", x: 0, y: 0, width: 100, height: 100}

const chess_logo = {name: "chess_logo.png", x: 27, y: 11, width: 32, height: 24}
const chess_bg = {name: "3dchess_bg.png", x: 0, y: 0, width: 100, height: 100}
const chess_bg2 = {name: "3dchess_bg2.png", x: 0, y: 0, width: 100, height: 100}
const chess_head = {name: "chess_head.png", x: 0, y: 0, width: 100, height: 10}
const chess1 = {name: "chess1.png", x: 12, y: 14, width: 39, height: 18} //65 : 30
const chess2 = {name: "chess2.png", x: 58, y: 14, width: 39, height: 18}
const chess3 = {name: "chess3.png", x: 16, y: 36, width: 78, height: 36}
const chess4 = {name: "chess4.png", x: 12, y: 76, width: 39, height: 18}
const chess5 = {name: "chess5.png", x: 58, y: 76, width: 39, height: 18}
                // 전체   page  lines
export const Texts:Array<Array<Array<Text>>> = [
    [ // Book Cover
        [ // COVER
            {text: "PROJECTS", color: 'white',
            x: 10, y: 15,
            font: '', size: 170, weight: 500},
            {text: '2024 - 2025', color: 'gray',
            x: 80, y: 94,
            font: '', size: 40, weight: 500
            },
            {text: 'by APPTCION', color: 'gray',
            x: 10, y: 25,
            font: '', size: 40, weight: 300}
        ],
        [ /** PAGE 1 */
            {text: "PROJECT |", color: "black",
            x: 7, y: 45,
            font: '', size: 60, weight: 500
            },
            {text: "TIMEWAVE", color: "#1C3464",
            x: 31, y: 45,
            font: '', size: 60, weight: 500
            },
            {text: "Participate as a developer and PM", color: "#6cb6c6",
            x: 7, y: 50,
            font: '', size: 40, weight: 500
            },
            {text: `"어지러운 시간의 파도에서 편히 헤엄치도록"`, color: "#3198BC",
            x: 7, y: 57,
            font: '', size: 55, weight: 500 
            },
            {text: `시간표, 급식표 및 학교 일정 알리미가 포함된


고등학교 친구들과 함께 진행한 첫 프로젝트였습니다.
처음 주도적으로 진행하는 프로젝트라 많이 삐걱됐지만
열심히 참여해준 친구들 덕분에 잘 마무리되었습니다.
`,
            color: "black",
            x: 7, y: 64,
            font: '', size: 40, weight: 500
            },
            {text: `학생들을 위한 통합 알리미 서비스입니다.`,
            color: "black",
            x: 7, y: 67,
            font: '', size: 40, weight: 600
            },
        ]
    ],
    [
        [ // PAGE 2
            {text: "| MAIN PAGE", color: "#1C3464",
            x: 65, y: 5,
            font: '', size: 50, weight: 500
            },
            {text: `사용자와 가장 먼저 마주하는\n 메인 페이지입니다.\n 움직이는 파도와 함께\n간단한 소개가 적혀있습니다.`, color: "black",
            x: 65, y: 15,
            font: '', size: 30, weight: 600
            },
            {text: "CALENDAR |", color: "#1C3464",
            x: 17, y: 36,
            font: '', size: 50, weight: 500
            },
            {text: `학교 일정을 확인할 수 있는`, color: "black",
            x: 13, y: 45,
            font: '', size: 30, weight: 600
            },
            {text: `달력페이지 입니다.`, color: "black",
            x: 21, y: 47,
            font: '', size: 30, weight: 600
            },
            {text: `등록한 학교가 같으면 일정이`, color: "black",
            x: 11.3, y: 49,
            font: '', size: 30, weight: 600
            },
            {text: `공유되는 기능을 구상했습니다.`, color: "black",
            x: 9.7, y: 51,
            font: '', size: 30, weight: 600
            },
            {text: "| TODO LIST", color: "#1C3464",
            x: 65, y: 68,
            font: '', size: 50, weight: 500
            },
            {text: `TODO LIST를 추가하는\n페이지입니다.\n일정의 공유 여부를 선택할 수\n있도록 했습니다.`, color: "black",
            x: 65, y: 78,
            font: '', size: 30, weight: 600
            },
        ],
        [ // PAGE 3
            {text: `PROJECT |`, color: "black",
            x: 13, y: 14,
            font: '', size: 60, weight: 600
            },
            {text: `샛별`, color: "#FF9A00",
            x: 14.5, y: 21,
            font: '', size: 150, weight: 600
            },
            {text: `Participate as a`, color: "#ffa41c",
            x: 13, y: 32,
            font: '', size: 40, weight: 500
            },
            {text: `developer`, color: "#ffa41c",
            x: 20.4, y: 35,
            font: '', size: 40, weight: 500
            },
            {text: `일상 속에서 함께하는`, color: "black",
            x: 12, y: 45,
            font: '', size: 50, weight: 600
            },
            {text: `가치소비`, color: "#ff9900",
            x: 48, y: 43.7,
            font: '', size: 80, weight: 600
            },
            {text: `샛별은 가치소비 상품을 위한 이커머스 플랫폼입니다.`, color: "black",
            x: 12, y: 50,
            font: '', size: 40, weight: 700
            },
            {text: `동아리 LUNA에서 진행한 프로젝트로,\n디자인 기획 개발이 모두 갖춰진 첫 프로젝트였습니다.`, color: "black",
            x: 12, y: 59,
            font: '', size: 40, weight: 500
            },
            {text: `또한 저의 첫 Flutter 프로젝트였습니다.\n많이 어색하고, 역경도 많았지만\n덕분에 저의 역량이 많이 늘어났습니다.`, color: "black",
            x: 12, y: 66,
            font: '', size: 40, weight: 500
            },
            {text: `팀원 모두가 열심히 참여한 결과\nSmart teen App Challenge 2024에서\n최우수상을 수상했습니다.`, color: "black",
            x: 12, y: 76,
            font: '', size: 40, weight: 500
            },
        ]
    ],
    [
        [ // PAGE 4 
            {text: "SUMMARY", color: '#391009',
            x: 15, y: 3.5,
            font: '', size: 70, weight: 600
            },
            {text: `Main Page`, color: "#4b150c",
            x: 59, y: 16,
            font: '', size: 50, weight: 600
            },
            {
                text: `메인 화면에는\n환경브랜드와 일반 브랜드 탭이 있습니다\n이를 통해 보다 쉬운 가치소비를\n할 수 있도록 했습니다.\n\n일반 브랜드의 수수료 중 일부를\n기부하는 정책을 통해 가치소비를\n할 수 있도록 했습니다.`, color: 'black',
                x: 59, y: 20,
                font: '', size: 30, weight: 500
            },
             {text: `My Page`, color: "#4b150c",
            x: 16, y: 58.5,
            font: '', size: 50, weight: 600
            },
            {
                text: `자신의 기본적인 정보를 볼 수 있는\nMy Page입니다.`, color: 'black',
                x: 16, y: 63.5,
                font: '', size: 30, weight: 500
            },
            {
                text: `사용자의 활동에 따라\n가치소비 Lv를 표시해주는\n기능이 있습니다.`, color: 'black',
                x: 16, y: 68,
                font: '', size: 30, weight: 500
            },
        ],
        [ // PAGE 5 (DIMI FRIEND)
            {text:"Project - DIMI FRIEND", color: "#fa548c",
            x: 5, y: 10,
            font: '', size: 80, weight: 600
            },
            {text: "Participate as a developer", color: "#540e25",
            x: 5, y: 16,
            font: '', size: 40, weight: 500
            },
            {text: `하루 1시간`, color: "#540e25",
            x: 50, y: 28,
            font: '', size: 80, weight: 600
            },
            {text: `새로운`, color: "#E83C77",
            x: 50, y: 34,
            font: '', size: 80, weight: 600
            },
            {text: `친구를!`, color: "#540e25",
            x: 68, y: 34,
            font: '', size: 80, weight: 600
            },
            {text: `디미프렌즈는 재학 중인 학교의 기숙사 일정에 맞춰\n남는 시간동안`, color: "black",
            x: 7, y: 53,
            font: '', size: 40, weight: 500
            },
            {
            text: `새로운 친구를 만날 수 있도록 구상한 앱입니다.`, color: "black",
            x: 26, y: 55.9,
            font: '', size: 40, weight: 700
            //26, 55.9 23.5 55.45
            },
            {text: `React-native와 socket.io를 사용했는데,\n가벼운 프로젝트에서의 React-native의 장점이 잘 느껴졌습니다.`, color: "black",
            x: 7, y: 60.5,
            font: '', size: 40, weight: 500
            },
            {text: `그리고 앱 스토어 출시를 준비하면서\n개인정보처리 동의서 작성 등 법률과, 구글/애플의 개발자 정책에\n대해 공부했는데, 매우 재미있는 경험이었습니다.`, color: "black",
            x: 7, y: 68,
            font: '', size: 40, weight: 500
            },
            {text: `동아리 인원 두 명이서 진행한 작은 프로젝트였지만,\n학교 특성에 맞춘 재밌는 기획 덕분에\n교내 창업동아리 연합 대회에서 은상을 수상했습니다.`,color: "black",
            x: 7, y: 78,
            font: '', size: 40, weight: 500
            }
        ]
    ],
    [
        [ // PAGE 6 (DIMI FRIEND)
            {
                text: '단순한 랜덤채팅이 아닌,\n학교 네트워킹을 위한 프로젝트인 만큼\n다양한 기능을 준비했습니다.', color: '#540e25',
                x: 37, y: 70,
                font: '', size: 45, weight: 500
            },
            {
                text: '최대한 자유로우면서,\n학교 규정을 준수 할 수 있도록 했습니다.', color: '#540e25',
                x: 37, y: 81,
                font: '', size: 45, weight: 500
            }
        ],
        [ // PAGE 7 (3d Chess)
            {
                text: 'PROJECT', color: '#230133',
                x: 13, y: 35,
                font: '', size: 80, weight: 600
            },
            {
                text: 'personal project', color: '#797979',
                x: 9.5, y: 40,
                font: '', size: 50, weight: 500
            },
            {
                text: '3D Chess', color: '#5a2c6f',
                x: 44, y: 35.45,
                font: '', size: 120, weight: 600
            },
            {
                text: `3d chess는 역량 상승을 위해\n개인적으로 진행했던 프로젝트로,`, color: 'black',
                x: 9.5, y: 48,
                font: '', size: 45, weight: 500
            },
            {
                text: `우주를 배경으로 진행되는 온라인 3차원 체스입니다.`, color: 'black',
                x: 9.5, y: 57,
                font: '', size: 45, weight: 600
            },
            {
                text: `스타트랙의 우주체스에서 영감을 받아\n우주를 배경으로하여 두 가지 버전의 3d 체스를\n구현하였습니다.`, color: 'black',
                x: 9.5, y: 62,
                font: '', size: 40, weight: 500
            },
            {
                text: `웹 상에서 3D를 구현하기 위해\nThree.js를 사용하고, socket.io를 사용해\n온라인으로 플레이 가능하도록 했습니다.`, color: 'black',
                x: 9.5, y: 73,
                font: '', size: 40, weight: 500
            },
            {
                text: `개인 프로젝트를 진행하면서 기획과 디자인 분야에 대한\n견해도 넓힐 수 있었고, Three.js라는 새로운 도구를 익히며\n개발역량도 기를 수 있어서 가치있는 경험이었습니다.`, color: 'black',
                x: 9.5, y: 84,
                font: '', size: 40, weight: 500
            },
        ]
    ],
    [
        [ // PAGE 8
            {text: "PAGES", color: '#391009',
            x: 15, y: 3.5,
            font: '', size: 70, weight: 600
            },
        ]
    ]
]
export const pageAtom = atom(0)

export const pages: Array<Page> = [
    {
        front : { // COVER
            image: [{name: 'book-cover.png', x:0, y: 0, width: 100, height: 100}],
            lines: Texts[0][0]
        },
        back : { // 1 PAGE
            image: [timewave_bg, timewave_logo],
            lines: Texts[0][1]
        }
    },
    {
        front: { // 2 PAGE
            image: [timewave_bg2, frameRightImg,
                timewave1, timewave2, timewave3],
            lines: Texts[1][0],
        },
        back : { // 3 PAGE
            image: [daystar_bg, daystar_logo, frameLeftImg],
            lines: Texts[1][1]
        }
    },
    {
        front: { // 4 PAGE
            image: [daystar_bg2, daystar_head, {name: horizenLine, x: 0, y: 10, width: 100, height: 0.3}, daystar1, daystar2, daystar3, daystar4],
            lines: Texts[2][0],
        },
        back : { // 5 PAGE
            image: [dimifriend_bg, dimifriend_logo],
            lines: Texts[2][1]
        }
    },
    {
        front: { // 6 PAGE
            image: [dimifriend_bg2, dimifriend1],
            lines: Texts[3][0],
        },
        back : { // 7 PAGE (3d chess)
            image: [chess_bg, chess_logo, {name: verticalLine, x: 42, y: 35, width: 0.5, height: 8.3}],
            lines: Texts[3][1]
        }
    },
    {
        front: { // 
            image: [chess_bg2, chess_head, {name: horizenLine, x: 0, y: 10, width: 100, height: 0.3}, chess1, chess2, chess3, chess4, chess5],
            lines: Texts[4][0],
        },
        back: { // BACK COVER
            image: [{name: 'book-cover.png', x: 0, y: 0, width: 100, height: 100}],
            lines: null
        }
    }
]
const pageName = ['TIMEWAVE', 'DAY STAR', 'DIMI FRIEND', '3D CHESS']
export default function UI(){

    const [page, setPage] = useAtom(pageAtom);


    return (
        <div className={styles.UI}>
            <div className={styles.menu_wrap}>
                {pages.map((_, index) => (
                    <div key={index} className={ `${styles.page_num} ${page === index ? styles.selected : ''}`}
                    onClick={() => { setPage(index) }}>
                        {index === 0 ? 'Cover' : `${pageName[index-1]}`}
                    </div>
                ))}
                <div className={`${styles.page_num} ${page === pages.length ? styles.selected : ''}`}
                    onClick={() => { setPage(pages.length) }}>
                        BACK COVER
                </div>
            </div>

        </div>
    )
}