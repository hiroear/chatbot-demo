import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';

const Answer = (props) => {
  return(
    <Button
      sx={{
        borderColor: '#FFB549',
        color: '#FFB549',
        fontWeight: 600,
        mb: '8px',                  // marginBottom
        ':hover': {                 // "&:hover"
          bgcolor: '#FFB549',       // backgroundColor
          color: '#fff',
          borderColor: '#FFB549'
        }
      }}
      variant="outlined" onClick={() => props.selectAnswer(props.content, props.nextId)}
    >
      {props.content}
    </Button>
  );
};

export default Answer;