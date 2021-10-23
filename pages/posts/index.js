import React, { useState } from 'react';
import { Box, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Message({ open, type, message, handleCloseMessage }) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseMessage}>
      <Alert severity={type} onClose={handleCloseMessage}>
        {message}
      </Alert>
    </Snackbar>
  );
}

function Post() {
  const [msgInfo, setMsgInfo] = useState({
    open: false,
    type: 'success',
    message: '',
  });
  const [open, setOpen] = useState(false);

  function handleClick() {
    // setOpen(true);
    setMsgInfo({
      open: true,
      type: 'error',
      message: 'This is a error message!',
    });
  }

  function handleCloseMessage(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setMsgInfo({
      ...msgInfo,
      open: false,
      // type: 'success',
      // message: '',
    });
  }

  return (
    <Box>
      <Button variant="outlined" onClick={handleClick}>
        Test
      </Button>
      <Message {...msgInfo} handleCloseMessage={handleCloseMessage} />
    </Box>
  );
}

export default Post;
