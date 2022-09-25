import {
  AppShell,
  Burger,
  Button,
  Header,
  MediaQuery,
  Navbar,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Router } from '@reach/router';
import React, { useCallback, useState } from 'react';
import { IndexApp } from './apps/Index';
import { LeftNav } from './comp/Nav';
import styled from '@emotion/styled';
import { SchemaParserApp } from './apps/SchemaParser';
import { ROUTES } from './routes';

const SDiv = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const toggleMenu = useCallback(() => setOpened(o => !o), []);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 150, lg: 200 }}>
          <LeftNav onClick={toggleMenu} />
        </Navbar>
      }
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }

      header={
        <Header height={40} px="sm">
          <SDiv>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger opened={opened} onClick={toggleMenu} size="sm" color={theme.colors.gray[6]} mr="xs" />
            </MediaQuery>

            <Title size="h4">CSB Typescript Vite playground</Title>
          </SDiv>
        </Header>
      }
    >
      <Router>
        {ROUTES.map(route => (
          <route.app key={route.to || ''} path={route.to} default={!route.to} />
        ))}
      </Router>
    </AppShell>
  );
}

export default App;
