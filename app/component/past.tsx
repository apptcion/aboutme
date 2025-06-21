import styles from '../page.module.css'

function Page({floor}:{floor: number}){
  return (
    <div style={{zIndex: floor}}>

    </div>
  )
}

const pages = [
  {}
]

export default function Present(){
  return(
    <div className={`${styles.past} ${styles.content}`}>
        <div className={styles.bg}/>
        <div className={styles.book_wrap}>
          {pages.map((_, index) => (
            <Page key={index} floor={index}/>
          ))}
        </div>
    </div>
  )
}
