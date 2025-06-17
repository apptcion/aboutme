import { atom, useAtom } from 'jotai';
import styles from '../page.module.css'

export const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069"
];


                // 전체   page  lines
export const Texts:Array<Array<Array<Text>>> = [
    [ // 1page
        [ // 앞면
            {
            text: "앞면", color: 'black',
            x: 0.2, y: 0.2,
            font: '', size: 80
            }
        ],
        [ // 뒷면
            {
                text: "뒷면", color: 'black',
                x: 0.1, y: 0.2,
                font: '', size: 80
            }
        ]
    ],
]

for (let i = 0; i <= pictures.length /2; i++){
    Texts.push(
        [ // 1page
            [ // 앞면
                {
                    text: "앞면", color: 'black',
                    x: 0.1, y: 0.2,
                    font: '', size: 80
                }
            ],
            [ // 뒷면
                {
                    text: "뒷면", color: 'black',
                    x: 0.1, y: 0.2,
                    font: '', size: 80
                }
            ]
        ]);
}

export class Text{
    text: string;
    color: string;
    font: string;
    x: number;
    y: number;
    size: number;
    constructor(
        text: string,
        color: string,
        font: string,
        x: number,
        y: number,
        size: number
    ){
        this.text = text;
        this.color = color;
        this.font = font;
        this.x = x
        this.y = y
        this.size = size
    }
}

export interface Image{
    name: string,
    x:number,
    y:number,
    width: number,
    height: number
}

export interface Page {
    front: {
        image: Array<Image>,
        lines: Array<Text> | null
    }, 
    back: {
        image: Array<Image>
        lines: Array<Text> | null
    }
}

export const pageAtom = atom(0)

export const pages: Array<Page> = [{
    front : {
        image: [{name: 'book-cover', x:0, y: 0, width: 100, height: 100}],
        lines: null
    },
    back : {
        image: [{name: pictures[0], x: 0, y: 0, width: 100, height: 100}],
        lines: Texts[0][1]
    }
}]

for(let i = 1; i< pictures.length -1; i+=2){
    pages.push({
        front: {
            image: [{name: pictures[i % pictures.length], x: 0, y: 0, width: 100, height: 100}],
            lines: Texts[(i+1)%2][0]
        },
        back: {
            image: [{name: pictures[(i + 1) % pictures.length], x: 0, y: 0, width: 100, height: 100}],
            lines: Texts[(i+1)%2][1]
        },
    })
}

pages.push({
    front: {
        image: [{name: pictures[pictures.length-1], x: 0, y: 0, width: 100, height: 100}],
        lines: Texts[0][1]
    },
    back: {
        image: [{name: 'book-back', x: 0, y: 0, width: 100, height: 100}],
        lines: null
    }
})

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
            <div className={`${styles.page_num} ${page === pages.length ? styles.selected : ''}`}>
                BACK COVER
            </div>
        </div>
    )
}