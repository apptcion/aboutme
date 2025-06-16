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


export const pageAtom = atom(0)

export const pages = [{
    front : 'book-cover',
    back: pictures[0]
}]

for(let i = 1; i< pictures.length -1; i+=2){
    pages.push({
        front: pictures[i % pictures.length],
        back: pictures[(i + 1) % pictures.length],
    })
}

pages.push({
    front: pictures[pictures.length-1],
    back: 'book-back'
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