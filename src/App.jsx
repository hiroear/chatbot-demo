import {useState, useCallback, useEffect} from 'react';
import './assets/styles/style.css';
import defaultDataset from './dataset';
import {AnswersList, Chats} from "./components"
import FormDialog from './components/Forms/FormDialog';

const App = () => {
  const [answers, setAnswers] = useState([]);          //回答コンポーネントに表示するデータ
  const [chats, setChats] = useState([]);              //チャットコンポーネントに表示するデータ {text:値, type:値}
  const [currentId, setCurrentId] = useState('init');  //現在の質問ID
  const [dataset, setDataset] = useState(defaultDataset);  //質問と回答のデータセット
  const [open, setOpen] = useState(false);                 //問い合わせフォーム用モーダルの開閉管理

  // お問い合わせフォーム用モーダルを開く Callback関数
  const handleOpen = useCallback(() => {
    setOpen(true);
  },[setOpen]);

  // お問い合わせフォーム用モーダルを閉じる Callback関数
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);


  // 次の質問をチャットエリアに表示する関数
  const displayNextQuestion = (nextQuestionId) => {
    const currentChats = chats;  // currentChats = this.state.chats
    currentChats.push({
      text: dataset[nextQuestionId].question,
      type: 'question'
    })
    setChats(currentChats);
    setAnswers(dataset[nextQuestionId].answers);
    setCurrentId(nextQuestionId);
  };

  // 回答が選択された時に呼ばれる関数
  const selectAnswer = useCallback((selectedAnswer, nextQuestionId) => {
    switch(true) {
      // 最初のチャットを表示(useEffect から)
      case (nextQuestionId === 'init'):
        displayNextQuestion(nextQuestionId);
        break;

      // お問い合わせが選択された時
      case (nextQuestionId === 'contact'):
        handleOpen();
        break;

      // リンクが選択された時(youtube)
      case (/^https:*/.test(nextQuestionId)):   // 正規表現 /^https:*/ 先頭がhttps:から始まる何か。 test()メソッド: 正規表現と引数に指定した文字列の一致を調べる。戻り値はboolean
        const a = document.createElement('a');  // <a>タグのDOM要素を新規作成
        a.href = nextQuestionId;                // 上で作成した<a>タグのリンク先に nextQuestionIdに入っているURLを指定
        a.target = '_blank';                    // <a>タグの targetプロパティに _blankを設定するとクリックした時その URLを別タブで開く
        a.click();                              // こうすることで上で作成した<a>タグが実際にリンクになる
        break;

      default:
        const currentChats = chats;  // currentChats = this.state.chats
        currentChats.push({
          text: selectedAnswer,
          type: 'answer'
        })
        setChats(currentChats);
        displayNextQuestion(nextQuestionId);
        break;
    }
  },[setAnswers]);  //answers(useState)が更新されたら selectAnswer関数も再度実行


  // 最初の質問をチャットエリアに表示する
  useEffect(() => {
    const initAnswer = "";
    selectAnswer(initAnswer, currentId);  // selectAnswer("", 'init');
  },[]);  // useEffectの第二引数に空の配列を渡すと最初の1回(マウント時)のみ実行される


  // 最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area');  // Chatsコンポの<List>エリアを取得
    if (scrollArea) {                                           // scrollAreaが存在している場合
      scrollArea.scrollTop = scrollArea.scrollHeight;           // <List>エリアの頂点をscrollHeightに合わせる
    }                                          // scrollHeightとは: 見ている画面には見えていない本来のページのTOP
  });


  return (
    <section className='c-section'>
      <div className='c-box'>
        <Chats chats={chats} />
        <AnswersList answers={answers} selectAnswer={selectAnswer} />
        <FormDialog open={open} handleOpen={handleOpen} handleClose={handleClose} />
      </div>
    </section>
  );
};

export default App;
