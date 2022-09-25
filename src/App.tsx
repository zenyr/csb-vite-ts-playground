import { Button, Text } from '@mantine/core';
import React, { useState } from 'react';
import { AppShell, Navbar, Header } from '@mantine/core';

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
      header={<Header height={60} p="xs">{/* Header content */}</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Text>Welcome to Mantine! {count}</Text>
      <Button onClick={() => setCount((v) => v + 1)}>Add</Button>
    </AppShell>

  );
}

export default App;
