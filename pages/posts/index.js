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

function Post({ name }) {
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
      // type: 'success',
      // message: '',
    });
  }
  
  console.log('ggg', name);

  return (
    <Box>
      <p>{publicRuntimeConfig.mySecret}</p>
      <p>{process.env.HOSTNAME}</p>
      <p>{process.env.NEXT_PUBLIC_ANALYTICS_ID}</p>
      <p>{process.env.CUSTOM_KEY}</p>
      <Button variant="outlined" onClick={handleClick}>
        Test
      </Button>
      <Message {...msgInfo} handleCloseMessage={handleCloseMessage} />
    </Box>
  );
}

export async function getServerSideProps(context) {
  
  return {
    props: {
      name: process.env.HOSTNAME
    }, // will be passed to the page component as props
  }
}

export default Post;
