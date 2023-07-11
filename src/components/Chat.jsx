// import * as React from 'react';
// import '../assets/styles/style.css';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import NoProfile from '../assets/img/no-profile.png';
import Araki from '../assets/img/araki.png';  // Araki という名前でモジュールとして使えるようになる


const Chat = (props) => {
  const isQuestion = (props.type === 'question'); // ()内は式とみなされ isQuestion には true が入る
  const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';

  return(
    <ListItem className={classes}>
      <ListItemAvatar>
        {isQuestion ? (<Avatar alt="icon" src={Araki} />)
                    : (<Avatar alt="icon" src={NoProfile} />)}
      </ListItemAvatar>

      <div className='p-chat__bubble'>{props.text}</div>
    </ListItem>
  )
};

export default Chat;