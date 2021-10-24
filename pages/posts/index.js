import React, { useState } from 'react';
import getConfig from 'next/config'
import { Box, Button, Typography, Snackbar } from '@material-ui/core';
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

function Post({ hostname }) {
  const [msgInfo, setMsgInfo] = useState({
    open: false,
    type: 'success',
    message: '',
  });
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

  function handleClick() {
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
      <Typography>Public Runtime Config(MY_SECRET): {publicRuntimeConfig.MY_SECRET}</Typography>
      <Typography>process.env(HOST_NAME): {hostname}</Typography>
      <Typography>Public process.env(NEXT_PUBLIC_ANALYTICS_ID): {process.env.NEXT_PUBLIC_ANALYTICS_ID}</Typography>
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
  console.log('gg node env', process.env.NODE_ENV);
  console.log('gg node customKey', process.env.customKey);
  return {
    props: {
      hostname: process.env.HOST_NAME,
    }, // will be passed to the page component as props
  }
}

export default Post;
