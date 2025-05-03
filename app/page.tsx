import Reference from './components/Reference/Reference';

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
    </>
  );
}
