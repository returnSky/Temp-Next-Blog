module.exports = {
  env: {
    HOSTNAME: process.env.HOSTNAME,
    CUSTOM_KEY: 'my-value',
  },
  publicRuntimeConfig: {
    mySecret: 'secret',
  }
};
