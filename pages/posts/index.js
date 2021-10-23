import React, { useState } from 'react';
import getConfig from 'next/config'
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

function Post({ hostname, customKey }) {
  const [msgInfo, setMsgInfo] = useState({
    open: false,
    type: 'success',
    message: '',
  });
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

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
    });
  }
  
  return (
    <Box>
      <p>{publicRuntimeConfig.mySecret}</p>
      <p>{hostname}</p>
      <p>{process.env.NEXT_PUBLIC_ANALYTICS_ID}</p>
      <p>{customKey}</p>
      <Button variant="outlined" onClick={handleClick}>
        Test
      </Button>
      <Message {...msgInfo} handleCloseMessage={handleCloseMessage} />
    </Box>
  );
}

export async function getStaticProps(context) {
  
  console.log('gg node key:', process.env.CUSTOM_KEY);
  console.log('gg node host name:', process.env.HOST_NAME);
  return {
    props: {
      hostname: process.env.HOST_NAME,
      customKey: process.env.CUSTOM_KEY
    }, // will be passed to the page component as props
  }
}

export default Post;
