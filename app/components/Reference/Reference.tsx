import ClassNames from 'classnames';
import Link from 'next/link'; // Link=<a>タグになる / Next.jsのLinkコンポーネント
import BusinessHoursStatus, { BusinessHoursStatusCode } from '../BusinessHoursStatus/BusinessHoursStatus';
import styles from './Reference.module.scss';

interface ReferenceProps {
  fontSize?: 14 | 18 | 28;
  text: string;
  /* リンク先のURL */
  href?: string;
  /* リンク先のURLが外部かどうか */
  target?: '_blank' | '_self';
  /* クリック時の処理 */
  onClickHandler?: () => void; // このように書くと、onClickHandlerがundefinedの時にエラーになるので、?をつけてオプショナルにする
  /* disabledかどうか */
  isDisabled?: boolean;
  businessHoursStatusCode: BusinessHoursStatusCode;
  businessHoursStatusText: string;
}

const Reference: React.FC<ReferenceProps> = ({
  /* fontSizeは指定しないと18pxになる */
  fontSize = 18,
  text,
  href,
  target = '_blank',
  onClickHandler,
  isDisabled = false,
  businessHoursStatusCode,
  businessHoursStatusText
  }) => {
  const classNames = ClassNames({
    [styles.Reference]: true,
    [styles['Reference--disabled']]: isDisabled,
  });

  const classNamesFontSize = ClassNames({
    [styles[`Reference--fontSize${fontSize}`]]: fontSize,
  });

  const WrapperTag = href ? Link : 'div';

  return (
    <>
      <WrapperTag
        className={classNames}
        href={href as string}
        target={href ? (target === '_blank' ? '_blank' : '_self') : undefined}
        rel={href && target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={onClickHandler}
      >
        <h1 className={styles.Reference__title}>@mixinで設定：コンポネントに直で記述</h1>
        <div className={styles.Reference__textPrimary}>mixinsとvariables.scssで設定 | primary：{text}</div>
        <div className={styles.Reference__textSecondary}>mixinsとvariables.scssで設定 | secondary：{text}</div>
        <p className={classNamesFontSize}>module.scssで設定：{text}</p>

        <BusinessHoursStatus
          statusCode={businessHoursStatusCode}
          statusText={businessHoursStatusText}
          fontSize={20}
        />

        <p className={classNamesFontSize}>共通化が望ましい場合：component化<br />違う場合：モジュール化 moulde</p>

        <span className={styles.Reference__boxShadow2}>boxShadow2（@each $i in (1, 2, 3, 4, 5)使用）</span>
        <span className={styles.Reference__boxShadow5}>boxShadow5（@each $i in (1, 2, 3, 4, 5)使用）</span>
      </WrapperTag>
    </>
  );
};

export default Reference;
