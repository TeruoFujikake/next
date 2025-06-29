'use client'; // Next.js App Routerでクライアントコンポーネントとして明示的に指定

import React, { useState } from 'react';
import ClassNames from 'classnames';
import Tooltip from '../Tooltip/Tooltip';

import styles from './TooltipWrapper.module.scss';

const TooltipWrapper: React.FC = () => {
  const [isVisibleTooltip, setIsVisibleTooltip] = useState<boolean>(false);

  const handleButtonClick = () => {
    /** ★ setTimeoutを使用している理由 ★
     * <p>ポップアップをクリックしたときに、ポップアップが閉じるのを防ぐために、setTimeoutを使用している。 
     * 
     * Tooltipが開く直前・開いた瞬間に、useClickOutsideが実行されてしまっている。
     * onMouseDown は確かに早いタイミングで走りますが、それでも Tooltip の描画が完了するより前に useClickOutside の mousedown が発火すると、「外側クリックされた」と誤判定されます。
     * 
     * --- 解決策：setTimeout を使って「開いた直後の外側クリックを無視」する ---
     * この setTimeout(..., 0) によって、Reactの再レンダリング後に実行されるため、
     * ・TooltipがDOMに追加されたあとで
     * ・useClickOutside のイベント判定が働くため、
     * ・外側クリックと誤判定されることがなくなります
     * */
    setTimeout(() => {
      setIsVisibleTooltip(() => !isVisibleTooltip);
    }, 0);
  };

  const classNames = ClassNames({
    [styles.TooltipWrapper]: true,
  });

  /** この id={TOOLTIP_ELEMENT_ID} が基準になる */
  const TOOLTIP_ELEMENT_ID = 'tooltip_element_id';

  return (
    <>
      <div className={classNames}>
        <p
          id={TOOLTIP_ELEMENT_ID}
          onMouseDown={handleButtonClick}
          className={styles.TooltipWrapper__button}
        >
          {isVisibleTooltip ? 'ポップアップ非表示' : 'ポップアップ表示'}
        </p>

        {isVisibleTooltip && (
          <>
            <Tooltip
              text="上のポップアップ"
              tipPosition='bottom'
              triggerElementId={TOOLTIP_ELEMENT_ID}
              onClickHandlerForClosing={() => handleButtonClick()}
            />
            <Tooltip
              text="右のポップアップ"
              tipPosition='left'
              triggerElementId={TOOLTIP_ELEMENT_ID}
              onClickHandlerForClosing={() => handleButtonClick()}
            />
            <Tooltip
              text="下のポップアップ"
              tipPosition='top'
              triggerElementId={TOOLTIP_ELEMENT_ID}
              onClickHandlerForClosing={() => handleButtonClick()}
            />
            <Tooltip
              text="左のポップアップ"
              tipPosition='right'
              triggerElementId={TOOLTIP_ELEMENT_ID}
              onClickHandlerForClosing={() => handleButtonClick()}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TooltipWrapper;
