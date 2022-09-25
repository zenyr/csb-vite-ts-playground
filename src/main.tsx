import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MantineProvider, Text } from '@mantine/core';
import { Global, Button } from '@mantine/core';

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles withNormalizeCSS
      theme={{
        fontFamily: 'Pretendard-Regular, sans-serif',
      }}
    >
      <Global styles={[
        {
          '@font-face': {
            fontFamily: 'Pretendard-Regular',
            src: "url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff')",
            fontWeight: 400,
            fontStyle: 'normal',
          },
          'html,body,#root': {
            height: '100%'
          }
        }
      ]} />
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
