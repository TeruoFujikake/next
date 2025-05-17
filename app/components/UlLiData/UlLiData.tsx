import styles from './UlLiData.module.scss';

interface LiData {
  title: string;
  content: { text?: string; price?: string }[];
  subContent?: string;
}

interface UlLiDataProps {
  liData: LiData[];
  changeNote?: string;
}

const UlLiData: React.FC<UlLiDataProps> = ({ liData, changeNote }) => {
  return (
    <>
      <div className={styles.UlLiData}>
        <ul className={styles.UlLiData__list}>
          {liData.map((data, index) => (
            <li key={index} className={styles.UlLiData__listItem}>
              <p className={styles.UlLiData__listItemTitle}>{data.title}</p>
              
              {data.content.map((content, index) => (
                <div key={index} className={styles.UlLiData__listItemContent}>
                  <p>{content.text}</p>
                  <p>
                    {!isNaN(Number(content.price)) ? Number(content.price).toLocaleString() : content.price }円
                  </p>
                </div>
              ))}

              {/* subContentがある場合のみ表示 */}
              {data.subContent && (
                <p className={styles.UlLiData__listItemSubContent}>{data.subContent}</p>
              )}
            </li>
          ))}
        </ul>

        {changeNote && (
          <div className={styles.UlLiData__changeNote}>{changeNote}</div>
        )}
      </div>
    </>
  )
}

export default UlLiData;
