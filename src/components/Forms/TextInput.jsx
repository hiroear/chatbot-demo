import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const TextInput = (props) => {
  return (
    <TextField
      variant="standard"
      fullWidth={true}             // フォームの横幅いっぱいにテキストフィールドを広げ改行させる
      label={props.label}
      margin={"dense"}             // テキストフィールド間を少し空ける
      multiline={props.multiline}  // 複数行入れたい場合 trueにする
      rows={props. rows}           // rows=5 などに設定すると 5行分のテキストフィールドになる
      value={props.value}
      type={props.type}            // text_field / email_field / number_field ...
      onChange={props.onChange}
    />
  );
};

export default TextInput;