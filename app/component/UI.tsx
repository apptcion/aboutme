import { atom, useAtom } from 'jotai';
import styles from '../page.module.css'


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

const timewave_logo = {name: "timewave_logo.svg", x: 10, y: 10, width: 40, height: 30}
const timewave_bg = {name: "timewave_bg.png", x: 0, y: 0, width: 100, height: 100}
const timewave_bg2 = {name: "timewave_bg2.png", x: 0, y: 0, width: 100, height: 100}
const timewave1 = {name: "timewave.png", x: 4, y: 3.5, width: 58, height: 30}
const timewave2 = {name: "timewave2.png", x: 42, y: 35, width: 58, height: 30}
const timewave3 = {name: "timewave3.png", x: 4, y: 66.5, width: 58, height: 30}

const daystar_logo = {name: "daystar_logo.png", x:42, y: 10, width: 40, height: 30}
const daystar_bg = {name: "daystar_bg.png", x: 0, y: 0, width: 100, height: 100}
const daystar_bg2 = {name: "daystar_bg2.png", x: 0, y: 0, width: 100, height: 100}


const daystar1 = {name: "daystar1.png", x:15, y: 5, width: 40, height: 60}
const daystar2 = {name: "daystar2.png", x: 57, y: 35, width: 40, height: 60}


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
            x: 7, y: 55,
            font: '', size: 55, weight: 500 
            },
            {text: `시간표, 급식표 및 학교 일정 알리미가 포함된
학생들을 위한 통합 알리미 서비스입니다.

고등학교 친구들과 함께 진행한 첫 프로젝트였습니다.
처음 주도적으로 진행하는 프로젝트라 많이 삐걱됐지만
열심히 참여해준 친구들이 있어서 고마웠습니다.
`,
            color: "black",
            x: 7, y: 60,
            font: '', size: 40, weight: 500
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
            x: 15, y: 45,
            font: '', size: 80, weight: 600
            },
            {text: `"가치소비"`, color: "#ff9900",
            x: 26, y: 51,
            font: '', size: 80, weight: 600
            },
            {text: `샛별은 가치소비 상품을 위한 이커머스 플랫폼입니다.`, color: "black",
            x: 10, y: 58,
            font: '', size: 40, weight: 700
            },
            {text: `동아리 LUNA에서 진행한 프로젝트로,\n디자인 기획 개발이 모두 갖춰진 첫 프로젝트였습니다.`, color: "black",
            x: 10, y: 63,
            font: '', size: 40, weight: 500
            },
            {text: `또한 저의 첫 Flutter 프로젝트였습니다.\n많이 어색하고, 역경도 많았지만\n덕분에 저의 역량이 많이 늘어났습니다.`, color: "black",
            x: 10, y: 70,
            font: '', size: 40, weight: 500
            },
            {text: `팀원 모두가 열심히 참여한 결과\nSmart teen App Challenge 2024에서\n최우수상을 수상했습니다.`, color: "black",
            x: 10, y: 80,
            font: '', size: 40, weight: 500
            },
        ]
    ],
    [
        [ // PAGE 4 
            {text: `Main Page`, color: "#af7217",
            x: 60, y: 8,
            font: '', size: 50, weight: 600
            },
            {
                text: `메인 화면에는\n환경브랜드와 일반 브랜드 탭이 있습니다.\n이를 통해 보다 쉬운 가치소비를\n할 수 있도록 했습니다.\n\n일반 브랜드의 수수료 중 일부를\n기부하는 정책을 통해 가치소비를\n할 수 있도록 했습니다.`, color: 'black',
                x: 60, y: 12,
                font: '', size: 30, weight: 600
            },
             {text: `My Page`, color: "#af7217",
            x: 20, y: 68,
            font: '', size: 50, weight: 600
            },
            {
                text: `자신의 기본적인 정보를 볼 수 있는\nMy Page입니다.`, color: 'black',
                x: 20, y: 73,
                font: '', size: 30, weight: 600
            },
            {
                text: `사용자의 활동에 따라\n가치소비 Lv를 표시해주는\n기능이 있습니다.`, color: 'black',
                x: 20, y: 77.5,
                font: '', size: 30, weight: 600
            },
        ],
        [ // PAGE 5 (DIMI FRIEND)

        ]
    ],
    [
        [ // PAGE 6 (DIMI FRIEND)

        ],
        [ // PAGE 7 (3d Chess)

        ]
    ]
]
export const pageAtom = atom(2)

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
            image: [daystar_bg, daystar_logo],
            lines: Texts[1][1]
        }
    },
    {
        front: { // 4 PAGE
            image: [daystar_bg2, daystar1, daystar2],
            lines: Texts[2][0],
        },
        back : { // 5 PAGE
            image: null,
            lines: null
        }
    },
    {
        front: { // 
            image: null,
            lines: null,
        },
        back: { // BACK COVER
            image: [{name: 'book-cover.png', x: 0, y: 0, width: 100, height: 100}],
            lines: null
        }
    }
]

export default function UI(){

    const [page, setPage] = useAtom(pageAtom);

    return (
        <div className={styles.UI}>
            {pages.map((_, index) => (
                <div key={index} className={
                    `${styles.page_num} ${page === index ? styles.selected : ''}`}
                onClick={() => {
                    setPage(index)
                }}>
                    {index === 0 ? 'Cover' : `PAGE ${index}`}
                </div>
            ))}
            <div className={`${styles.page_num} ${page === pages.length ? styles.selected : ''}`}
            onClick={() => {
                setPage(pages.length)
            }}>
                BACK COVER
            </div>
        </div>
    )
}