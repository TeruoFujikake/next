import "./globals_variables.scss";
import Reference from './components/Reference/Reference';
import AllCodeView from './components/AllCodeView/AllCodeView';
import UlLiData from './components/UlLiData/UlLiData';
import LiMore from './components/LiMore/LiMore';

import { TEXT, ARRAY } from './pageCommonData';

export default function Home() {
  return (
    <>
      <Reference
        fontSize={28}
        text="テキスト"
        href="https://test.com"
        target="_blank"
        // onClickHandler={() => {}}
        isDisabled={true}
      />
      <UlLiData
        liData={TEXT.ULLI_DATA.LI_DATA._01}
        changeNote="※表示、非表示の切り替え確認要素 / changeNote"
      />
      <LiMore
        listData={ARRAY.LIST.TEXT._01}
        totalCount={5}
      />
      <AllCodeView
        fontSize={20}
        text="▼▼▼ここから下はAllCodeViewコンポーネントです▼▼▼"
      />
    </>
  );
}
