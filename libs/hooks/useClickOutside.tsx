/** 
 * 特定の要素の外側をクリックしたときに何か処理を実行する」ためのカスタムフック
 * このカスタムフックは、**ある要素の外側がクリックされたときに何かをしたいとき（例: モーダルを閉じる）**に便利です。
 * 
 * 現時点では「ポップアップ」を閉じるために使われているが、他の用途にも使える。
 * */

import { useEffect } from 'react';

const useClickOutside = (ref: React.MutableRefObject<any>, handler: () => void) => { // () => void は「引数なし」「返り値なし」の関数型。何を実行するかは、使う側が自由に定義できます。
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {  // クリックされたのがrefの外なら
      handler(); // ← ここで "閉じて" とは言ってない！
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

export default useClickOutside;

/**
 * ・handlerとは？：	呼び出すだけの「関数」。中身は知らない。
 * ・実際の「モーダルを閉じる処理」はどこ？：	フックを使う側のコンポーネントで書いている
 * ・handler()がモーダルを閉じる理由：	中でモーダルの状態（isOpen）をfalseにしているから。
 * ・フックの役割：	「外側がクリックされたことを検知し、渡された関数を実行するだけ」
 */
