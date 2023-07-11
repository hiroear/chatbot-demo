// import * as React from 'react';
import {Chat} from "./index"
import List from '@mui/material/List';

const Chats = (props) => {
  return (
    <List
      sx={{
        height: 400,
        p:'0',           // padding
        overflow: 'auto' // height: 400 を超えた時自動でスクロールバーが右にできる
      }}
      id={'scroll-area'}
    >
      {props.chats.map((val, index) => {
        return <Chat text={val.text} type={val.type} key={index.toString()} />
      })}
    </List>
  );
};

export default Chats;