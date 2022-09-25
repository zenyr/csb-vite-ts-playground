import { Global, MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const GLOBAL_STYLES = [
  {
    '@font-face': {
      fontFamily: 'Pretendard-Regular',
      src: "url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff')",
      fontWeight: 400,
      fontStyle: 'normal',
    },
    'html,body,#root': {
      height: '100%',
    },
  },
];

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Pretendard-Regular, sans-serif',
      }}
    >
      <Global styles={GLOBAL_STYLES} />
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
