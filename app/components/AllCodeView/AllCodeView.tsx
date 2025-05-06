import ClassNames from 'classnames';
import styles from './AllCodeView.module.scss';

interface AllCodeViewProps {
  fontSize?: 14 | 16 | 18 | 20;
  text?: string;
}

const AllCodeView: React.FC<AllCodeViewProps> = ({
  fontSize = 14,
  text,
}) => {
  const classNamesFontSize = ClassNames({
    [styles[`AllCodeView--fontSize${fontSize}`]]: fontSize,
  });

  return (
    <>
      <p className={classNamesFontSize}>{text}</p>
      <div className={styles.AllCodeView}>
        <iframe src="/next.pdf" width="100%" height="100%"></iframe>
      </div>
    </>
  );
};

export default AllCodeView;