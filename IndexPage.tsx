import React from 'react';
import Reference from './Reference';

const IndexPage: React.FC = () => {
  return (
    <>
      <Reference
        fontSize={16}
        text="テキスト"
        href="https://test.com"
        target="_blank"
        onClickHandler={(e) => {
          e.preventDefault();
          window.location.href = 'https://testtest.com';
          }
        }
        isDisabled={true}
      />
    </>
      
  )
}

export default IndexPage;
