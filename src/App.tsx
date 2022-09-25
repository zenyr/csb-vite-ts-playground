import React, { useState } from 'react';
import { MantineProvider, Text } from '@mantine/core';
import { Global } from '@mantine/core';

function App() {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider>
      <Global />
      <div className="App">
        <Text>Welcome to Mantine!</Text>
      </div>
    </MantineProvider>
  );
}

export default App;
