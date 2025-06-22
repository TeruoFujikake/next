import { useCallback, useEffect, useRef, useState } from 'react';

/** 
 * コンポーネントの幅と高さを取得するカスタムフック
 * リサイズ時にも更新される
 * 
 * @returns width: コンポーネントの幅, height: コンポーネントの高さ, ref: コンポーネントのref
 */

const useDimensions = <T extends HTMLElement>(): {
  width: number;
  height: number;
  ref: (node: T | null) => void
} => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const nodeRef = useRef<T | null>(null);

  /** 
   * 指定された要素の寸法を取得し、stateを更新する
   * 
   * @param node 寸法を取得する要素
  */
  const measureDimensions = useCallback((node: T) => {
    const {width, height} = node.getBoundingClientRect();
    setDimensions({ width, height});
  }, []);

  /** 
   * コンポーネントの幅と高さを更新する
  */
  const updateDimensions = useCallback(() => {
    if (nodeRef.current) {
      measureDimensions(nodeRef.current);
    }
  }, [measureDimensions]);

  /** 
   * コンポーネントのrefを取得する
  */
  const ref = useCallback(
    (node: T | null) => {
      if (node) {
        nodeRef.current = node;
        measureDimensions(node);
      }
    }, [measureDimensions]
  );

  /** 
   * リサイズ時にコンポーネントの幅と高さを更新する
  */
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions]);

  return { ...dimensions, ref };
};

export default useDimensions;
