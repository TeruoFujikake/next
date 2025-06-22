import "../app/globals_variables.scss";
import Reference from '../app/components/Reference/Reference';
import UlLiData from '../app/components/UlLiData/UlLiData';
import LiMore from '../app/components/LiMore/LiMore';
import Button from '../app/components/Button/Button';
import UseEffectUseRef from '../app/components/UseEffectUseRef/UseEffectUseRef';
import TooltipWrapper from '../app/components/TooltipWrapper/TooltipWrapper';
import { DEVICE } from '../app/components/device';
import AllCodeView from '../app/components/AllCodeView/AllCodeView';

import { TEXT, ARRAY, URL } from '../app/pageCommonData';

export default function Home() {
  return (
    <>
      <Reference
        fontSize={18}
        text="テキスト"
        href="https://test.com"
        target="_blank"
        // onClickHandler={() => {}}
        isDisabled={true}
        businessHoursStatusCode={1}
        businessHoursStatusText="営業中ですよー"
      />
      <UlLiData
        liData={TEXT.ULLI_DATA.LI_DATA._01}
        changeNote="※表示、非表示の切り替え確認要素 / changeNote"
      />
      <LiMore
        listData={ARRAY.LIST.TEXT._01}
        totalCount={5}
      />
      <Button
        text="ボタン"
        height={50}
        onClickHandler={() => (window.location.href = URL.EXAMPLE)}
        target="_blank"
        iconLeft="heart"
      />
      <UseEffectUseRef
        id={1}
        title="UseEffectUseRefのタイトル"
        shouldShowOverview={true}
        discription="useEffectとuseRefを使用して特定の要素にスクロールする機能を持つ"
        registerDate="2025-06-08"
        updateDate="2025-06-30"
        device={DEVICE.PC}
        name="UseEffectUseRefExample"
      />
      <TooltipWrapper/>
      <AllCodeView
        fontSize={20}
        text="▼▼▼ここから下はAllCodeViewコンポーネントです▼▼▼"
      />
    </>
  );
}
