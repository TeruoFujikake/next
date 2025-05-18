import ClassNames from 'classnames';
import styles from './LiMore.module.scss';

interface LiMoreProps {
  listData: string[];
  totalCount: number;
}

const LiMore: React.FC<LiMoreProps> = ({ listData, totalCount }) => {
  const classNames = ClassNames({
    [styles.LiMore]: true,
  });

  const classNamesList = ClassNames({
    [styles.LiMore__list]: true,
    [styles['LiMore__list--noMore']]: totalCount <= 3,
  });
  return (
    <>
      <div className={classNames}>
        <ul className={classNamesList}>
          {listData.slice(0, 3).map((list, index) => (
            <li key={index} className={styles.LiMore__listItem}>
              {list}
            </li>
          ))}
        </ul>
        {totalCount > 3 && 
          <p className={styles.LiMore__total}>その他{totalCount - 3}件あり。<br/>件数が3以下だったらここは消える</p>
        }
      </div>
    </>
  )
}

export default LiMore;
