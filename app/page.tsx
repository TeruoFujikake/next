import "./globals_variables.scss";
import Reference from './components/Reference/Reference';
import AllCodeView from './components/AllCodeView/AllCodeView'

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
      <AllCodeView
        fontSize={20}
        text="▼▼▼ここから下はAllCodeViewコンポーネントです▼▼▼"
      />
    </>
  );
}
