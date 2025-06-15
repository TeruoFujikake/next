'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { DEVICE } from '../device';
import { TAB_NAV_ID, HEADER_HEIGHT } from '../sizeId';
import { UseEffectUseRefData } from '../types';
import styles from './UseEffectUseRef.module.scss';

export interface UseEffectUseRefProps extends UseEffectUseRefData {
  device: DEVICE;
  name: string;
}

const UseEffectUseRef: React.FC<UseEffectUseRefProps> = (props) => {
  const params = useSearchParams();
  const id = params?.get('id') ?? ''; // ← null 対応済み params? の ? を付けることで null の場合は空文字列を返すようにする
  const idNum = Number(id); // id を数値に変換

  const UseEffectUseRefRef = useRef<HTMLDivElement>(null);

  const shouldShowUpdateData = props.updateDate !== undefined;
  const dateValue = shouldShowUpdateData ? props.updateDate : props.registerDate;

  /** 指定された位置へスクロール 処理内容 未確認 */
  useEffect(() => {
    if (!UseEffectUseRefRef.current || props.id !== idNum) {
      return;
    }

    setTimeout(() => {
      const tabOffsetHeight = document.getElementById(TAB_NAV_ID)?.offsetHeight ?? 0;
      const elementTop = UseEffectUseRefRef.current?.getBoundingClientRect().top ?? 0;
      window.scrollTo({ top: Math.ceil(window.scrollY + elementTop - tabOffsetHeight - HEADER_HEIGHT), behavior: 'smooth' });
    });
  }, [props.id, idNum]);

  return (
    <div className={styles.UseEffectUseRef} ref={UseEffectUseRefRef}>
      <p className={styles.UseEffectUseRef__title}>{props.title}</p>
      <p className={styles.UseEffectUseRef__date}>
        {shouldShowUpdateData ? '更新日' : '登録日'}: {dateValue}
      </p>
    </div>
  );
}

export default UseEffectUseRef;
