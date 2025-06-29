'use client'; // Next.js App Routerでクライアントコンポーネントとして明示的に指定

import React, { useState } from 'react';
import ClassNames from 'classnames';
import Tooltip from '../Tooltip/Tooltip';

import styles from './TooltipWrapper.module.scss';

const TooltipWrapper: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  const classNames = ClassNames({
    [styles.TooltipWrapper]: true,
  });

  /** この id={TOOLTIP_ELEMENT_ID} が基準になる */
  const TOOLTIP_ELEMENT_ID = 'tooltip_element_id';

  const handleButtonClick = () => {
    
  };

  return (
    <>
      <div className={classNames}>
        <p id={TOOLTIP_ELEMENT_ID} onClick={handleToggle} className={styles.TooltipWrapper__button}>
          {isVisible ? 'ポップアップ非表示' : 'ポップアップ表示'}
        </p>

        {isVisible && (
          <>
            <Tooltip
              text="上のポップアップ"
              tipPosition='bottom'
              triggerElementId={TOOLTIP_ELEMENT_ID}
              onClickHandlerForClosing={() => handleButtonClick(false)}
            />
            <Tooltip
              text="右のポップアップ"
              tipPosition='left'
              triggerElementId={TOOLTIP_ELEMENT_ID}
              onClickHandlerForClosing={hideTooltip}
            />
            <Tooltip
              text="下のポップアップ"
              tipPosition='top'
              triggerElementId={TOOLTIP_ELEMENT_ID}
              onClickHandlerForClosing={hideTooltip}
            />
            <Tooltip
              text="左のポップアップ"
              tipPosition='right'
              triggerElementId={TOOLTIP_ELEMENT_ID}
              onClickHandlerForClosing={hideTooltip}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TooltipWrapper;
