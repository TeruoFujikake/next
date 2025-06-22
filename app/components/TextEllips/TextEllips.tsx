'use client'
import ClassNames from 'classnames';
import { useCallback, useEffect } from 'react';

import useDimensions from '../../../libs/hooks/useDimensions';
import useTextEllips from '../../../libs/hooks/useTextEllips';
import styles from './TextEllips.module.scss';

interface TextEllipsProps {
  fontSize?: 14 | 16 | 18 | 20 | 24 | 28;
  /** 初期表示時の最大行数 */
  initialNumberOfLines: number;
  text: string;
  textTrigger: string;
  clParams?: string;
  ultLogSection?: string;
  /** 省略時も改行を保持する */
  keepLineBreak?: boolean;
}

const TextEllips: React.FC<TextEllipsProps> = ({
  fontSize = 18,
  initialNumberOfLines,
  text: originalText,
  textTrigger,
  clParams,
  ultLogSection,
  keepLineBreak = false,
}) => {
  const { width, ref } = useDimensions();

  const {
    text: textShaped,
    isEllipsis: hasEllipsis,
    setEllipsis: setContentEllipsis,
  } = useTextEllips({ width, text: originalText, textSize: fontSize, maxLine: initialNumberOfLines, keepLineBreak});

  const showFullText = useCallback(() => {
    setContentEllipsis(false);
  }, [setContentEllipsis]);

  useEffect(() => {
    customLoggerWrapper.refreshModule(ultLogSection as PageSecId);
  }, [hasEllipsis]);

  const classNames = ClassNames({
    [styles.TextEllips]: true,
  });

  const classNamesForText = ClassNames({
    [styles.textEllips__bodyText]: true,
    [styles[`textEllips__bodyText--fontSize${fontSize}`]]: fontSize,
  });

  const classNamesForTrigger = ClassNames({
    [styles.TextEllips__bodyExpandTrigger]: true,
    [styles[`TextEllips__bodyExpandTrigger--fontSize${fontSize}`]]: fontSize,
  });

  return (
    <div className={classNames}>
      <p
        className={styles.TextEllipssis__body}
        ref={ref}
        style={{
          whiteSpace: !keepLineBreak && hasEllipsis ? 'normal' : 'pre-wrap',
          wordBreak: !keepLineBreak && hasEllipsis ? 'normal' : 'break-all',
          overflowWrap: !keepLineBreak && hasEllipsis ? 'normal' : 'anywhere',
        }}
      >
        <span className={classNamesForText}>{textShaped}</span>
        {hasEllipsis && (
          <button type="button" className={classNamesForTrigger} onClick={showFullText} data-cl-params={clParams}>
            {textTrigger}
          </button>
        )}
      </p>
    </div>
  );
};

export default TextEllips;
