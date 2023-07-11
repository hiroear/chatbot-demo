import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState, useCallback} from 'react';
import {TextInput} from "../index"

const FormDialog = (props) => {
  const [name, setName] = useState('');                // 入力フォームに入力された名前
  const [email, setEmail] = useState('');              // 入力フォームに入力されたメールアドレス
  const [description, setDescription] = useState('');  // 入力フォームに入力された問い合わせ内容

  // Functions triggered by inputting text value
  const inputName = useCallback((e) => {
    setName(e.target.value);
  }, [setName]);

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [setEmail]);

  const inputDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, [setDescription]);


  // 入力フォームの emailの書式をチェックするバリデーション
  const validateEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
  };
  // 入力フォームが空のままかどうかをチェックするバリデーション
  const validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i=(i+1)|0) {
      if (args[i] === ""){
        isBlank = true;
      }
    }
    return isBlank
  };


  // Slackに問い合わせがあった事を通知する関数
  const submitForm = () => {
    // const currentName = name;    ↓ この3行あってもなくてもOK
    // const currentEmail = email;
    // const currentDescription = description;
    const isBlank = validateRequiredInput(name, email, description)
    const isValidEmail = validateEmailFormat(email)

    if (isBlank) {
      alert('必須入力欄が空白です。')
      return false
    } else if (!isValidEmail) {
      alert('メールアドレスの書式が異なります。')
      return false
    } else {
        const payload = {  // slackに送られる通知内容
          text: 'お問い合わせがありました\n' +
                'お名前：' + name + '\n' +
                'Email：' + email + '\n' +
                '問い合わせ内容：\n' + description
        };
        const url = 'https://hooks.slack.com/services/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'
        // ↓fetchメソッドでフォームの内容を Slackの Incoming Webhook URLに送信
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(payload) //JSON.stringify(): 引数に指定した JavaScriptオブジェクトや値を JSON文字列に変換
        }).then(() => {
          alert('送信が完了しました。追ってご連絡します🙌');
          setName('')                   //useStateを更新して入力フォームを空にする
          setEmail('')
          setDescription('')
          return (props.handleClose())   //FormDialogを閉じる
        })
    }
  };


  return (
    <Dialog
      open={props.open}  //open=true/false ← 恐らく 変数openが materialUIと紐づいていて true/false値によってモーダルの開閉を管理してる
      onClose={props.handleClose}  //onClose=handleClose関数
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{fontWeight: 'bold'}}>
        {"お問い合わせフォーム"}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextInput
            label={'名前 (必須)'} multiline={false} rows={1} value={name} type={'text'} onChange={inputName}
          />
          <TextInput
            label={'メールアドレス (必須)'} multiline={false} rows={1} value={email} type={'email'} onChange={inputEmail}
          />
          <TextInput
            label={'お問い合わせ内容 (必須)'} multiline={true} rows={5} value={description} type={'text'} onChange={inputDescription}
          />
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose}>キャンセル</Button>
        <Button onClick={submitForm} autoFocus>
          送信する
        </Button>
      </DialogActions>

    </Dialog>
  )
};

export default FormDialog;