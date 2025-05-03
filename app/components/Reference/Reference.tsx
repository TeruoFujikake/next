import ClassNames from 'classnames';
import Link from 'next/link'; // Link=<a>タグになる / Next.jsのLinkコンポーネント
import styles from './Reference.module.scss';

interface ReferenceProps {
  fontSize?: 12 | 14 | 28;
  text: string;
  /* リンク先のURL */
  href?: string;
  /* リンク先のURLが外部かどうか */
  target?: '_blank' | '_self';
  /* クリック時の処理 */
  onClickHandler?: () => void; // このように書くと、onClickHandlerがundefinedの時にエラーになるので、?をつけてオプショナルにする
  /* disabledかどうか */
  isDisabled?: boolean;
}

const Reference: React.FC<ReferenceProps> = ({
  /* fontSizeは指定しないと14pxになる */
  fontSize = 14,
  text,
  href,
  target = '_blank',
  onClickHandler,
  isDisabled = false,
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
      </WrapperTag>
    </>
  );
};

export default Reference;
