import ClassNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

// import useClickOutside from '../../../libs/hooks/useClickOutside';
import Icon from '../Icon/Icon';
import styles from './Tooltip.module.scss';

interface TooltipProps {
  /** CustomLoggerのパラメータ */
  clParams?: string;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  onClickHandlerForClosing?: () => void;
  text: string;
  tipPosition: 'top' | 'bottom' | 'left' | 'right';
  /** Tooltipが生える基準となるトリガーのエレメントID */
  triggerElementId: string;
}

const MAXIMUM_CONTENT_WIDTH = 768;

const Tooltip: React.FC<TooltipProps> = ({
  clParams,
  elevation,
  onClickHandlerForClosing,
  text,
  tipPosition = 'bottom',
  triggerElementId,
}) => {
  const [bodyX, setBodyX] = useState(0);
  const [bodyY, setBodyY] = useState(0);
  const [bodyAlignment, setBodyAlignment] = useState<'Left' | 'Right'>('Left');
  const [tipX, setTipX] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tipArrowRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  /** 
   * 自分の位置を取得
   * 本来は以下のコードでやりたいのだが、レンダリングのタイミングでtriggerElementIdが取得できていない
   * */
  useEffect(() => {
    triggerRef.current = document.getElementById(triggerElementId);

    if (!triggerRef.current) {
      return;
    }

    const triggerWidth = triggerRef.current.clientWidth;
    const triggerHeight = triggerRef.current.clientHeight;
    const triggerLeft = triggerRef.current.offsetLeft;
    const triggerTop = triggerRef.current.offsetTop;

    setBodyX(tipPosition === 'right' ? triggerLeft : triggerLeft + triggerWidth);
    setBodyY(tipPosition === 'top' ? triggerTop + triggerHeight : triggerTop);
    setTipX(triggerLeft + triggerWidth / 2);
    setBodyAlignment(triggerLeft + triggerWidth / 2 > MAXIMUM_CONTENT_WIDTH / 2 ? 'Right' : 'Left');
    setIsReady(true);
  }, [triggerElementId]);

  /** 外側をclickしたら閉じる */
  // useClickOutside(tooltipRef, onClickHandlerForClosing);

  const inlineStylesForTooltip = tipPosition === 'top' || tipPosition === 'bottom'
    ? { top: `${bodyY}px` } : tipPosition === 'right'
      ? { width: `${bodyX}px` } : tipPosition === 'left'
        ? { left: `${bodyX}px`, width: `calc(100% - ${bodyX}px)`} : undefined;

  const inlineStylesForTooltipTip = tipPosition === 'top' || tipPosition === 'bottom'
    ? { left: triggerRef.current ? `${tipX}px` : '50%' } : undefined;

  const classNamesForTooltip = ClassNames({
    [styles.Tooltip]: true,
    [styles['Tooltip--visible']]: isReady,
    [styles[`Tooltip--${tipPosition}Tip`]]: tipPosition,
    [styles[`Tooltip--align${bodyAlignment}`]]: bodyAlignment,
    [styles[`Tooltip--elevation${elevation}`]]: elevation,
  });

  const classNamesForTooltipBody = ClassNames({
    [styles.Tooltip__body]: true,
    [styles[`Tooltip__body--align${bodyAlignment}`]]: bodyAlignment,
  });

  return (
    <div className={classNamesForTooltip} ref={tooltipRef} style={inlineStylesForTooltip}>
      <div className={classNamesForTooltipBody}>
        <p className={styles.Tooltip__bodyText}>{text}</p>
        <button
          type="button"
          onClick={onClickHandlerForClosing}
          className={styles.Tooltip__bodyClose}
          aria-label="閉じる"
          data-cl-params={clParams}
        >
          <Icon type="star" size={16} color="Default" />
        </button>
      </div>
      <div ref={tipArrowRef} style={inlineStylesForTooltipTip} className={styles.Tooltip__arrow} />
    </div>
  );
};

export default Tooltip;
