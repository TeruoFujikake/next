import ClassNames from 'classnames';
import Link from 'next/link';

import Icon, { IconColors, IconSize } from '../Icon/Icon';
import { IconType } from '../Icon/IconType'; 
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  height: 30 | 40 | 50;
  onClickHandler?: () => void;
  href?: string;
  target?: '_blank' | '_self';
  /** ボタンの強さ **/
  pattern?: ButtonPattern;
  isDisabled?: boolean;
  /** 上のアイコン  **/
  iconTop?: IconType;
  /** 左のアイコン  **/
  iconLeft?: IconType;
  /** 右のアイコン  **/
  iconRight?: IconType;
}

export const buttonPattern = ['default', 'primary', 'secondary'] as const;
type ButtonPattern = (typeof buttonPattern)[number];

const Button: React.FC<ButtonProps> = ({
    text,
    height,
    onClickHandler,
    href,
    target = '_blank',
    pattern = 'default',
    isDisabled = false,
    iconTop,
    iconLeft,
    iconRight,
  }) => {
  const WrapperTag = href ? Link : 'button';

  const getIconColor = (buttonPattern: ButtonPattern, isDisabled: boolean): IconColors => {
    if (isDisabled) {
      return 'Disabled';
    }
    switch (buttonPattern) {
      case 'default':
        return 'Default';  
      case 'primary':
        return 'Primary';
      case 'secondary':
        return 'Secondary';
    }
  };

  const getIconHeight = (buttonHeight: number): IconSize => {
    switch (buttonHeight) {
      case 30:
        return 14;
      case 40:
        return 16;
      default:
        return 18;
    }
  };

  const classNames = ClassNames({
    [styles.Button]: true,
    [styles[`Button--${pattern}`]]: pattern,
    [styles[`Button--height${height}`]]: height && !iconTop,
    [styles['Button--disabled']]: isDisabled,
  });

  return (
    <WrapperTag
      href={href as string}
      target={href ? (target === '_blank' ? '_blank' : '_self') : undefined}
      // onClick={onClickHandler} // クリックイベントを処理する場合はこの行のコメントを解除します
      className={classNames}
    >
      {iconTop && (
        <div className={styles.Button__iconTop}>
          <Icon
            type={iconTop}
            color={getIconColor(pattern, isDisabled)}
            size={getIconHeight(height)}
          />
        </div>
      )}

      {iconLeft && (
        <div className={styles.Button__iconLeft}>
          <Icon
            type={iconLeft}
            color={getIconColor(pattern, isDisabled)}
            size={getIconHeight(height)}
          />
        </div>
      )}

      <span className={styles.Button__text}>{text}</span>

      {iconRight && (
        <div className={styles.Button__iconRight}>
          <Icon
            type={iconRight}
            color={getIconColor(pattern, isDisabled)}
            size={getIconHeight(height)}
          />
        </div>
      )}
    </WrapperTag>
  );
};

export default Button;
