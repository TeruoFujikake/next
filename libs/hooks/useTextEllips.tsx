import { useEffect, useMemo, useState } from 'react';

interface Props {
  /** テキストを表示する領域の幅 */
  width: number;
  /** 表示するテキスト */
  text?: string;
  /** テキストのフォントサイズ */
  textSize: number;
  /** 最大行数 */
  maxLine: number;
  /** 「すべて表示」のテキストを表示するかどうか */
  showViewAllText?: boolean;
}

const BASE_WIDTH = 360;

const useTextEllips = ({ width, text, textSize, maxLine, showViewAllText = true}: Props) => {
  /** htmlタグを除去 */
  const refinedText = text?.replace(/(<([^>]+)>|&[^\s]*;)/gi, '\n') ?? '';

  /** 画面サイズから全体の幅を計算 */
  const refinedWidth = width > 0 ? width : BASE_WIDTH;

  /** 省略するかどうか（テキストの長さが表示可能文字数を超えているか or 改行コードがあり行数オーバー）と省略後のテキストを返す
   */
  const { shouldTextEllips, ellipsisText } = useMemo(() => {
    /** １行あたりの文字数 */
    const oneLineTextMaxLength = Math.floor(refinedWidth / textSize);

    /** 省略なしの文字列の行数が最大行数を上回っていた場合に省略対象の文字列として判定 */
    const lines = refinedText.split('\n');
    let lineCount = 0;

    for (const line of lines) {
      /**
       * 折り返しを含めた行数を計算
       * 空行は１行としてカウント
       */
      lineCount = lineCount + (line.length === 0 ? 1 : Math.ceil(line.length / oneLineTextMaxLength));
    }

    const shouldTextEllips = lineCount > maxLine;

    /** 省略対象の文字列は改行なしで最大行数に収まるようにする（「...」と表示する場合は「すべて見る」ボタンを含めて収まるようにする） */
    const ellipsisTextLength = showViewAllText ? oneLineTextMaxLength * maxLine - 10 : oneLineTextMaxLength * maxLine - 3;

    return {
      shouldTextEllips: shouldTextEllips,
      ellipsisText: refinedText.replace('\n', '').substring(0, ellipsisTextLength) + '...',
    };
  }, [maxLine, refinedText, refinedWidth, showViewAllText, textSize]);

  const [ isEllipsis, setEllipsis ] = useState(shouldTextEllips);

  const slicedText = shouldTextEllips ? ellipsisText : refinedText;

  useEffect(() => {
    setEllipsis(shouldTextEllips);
  }, [width, shouldTextEllips]);

  return {
    text: isEllipsis ? slicedText : refinedText, isEllipsis, setEllipsis
  };
};

export default useTextEllips;
