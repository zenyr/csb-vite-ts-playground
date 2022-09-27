import styled from '@emotion/styled';
import { Button, Container, createStyles, Group, Text, Title } from '@mantine/core';
import { Link, RouteComponentProps } from '@reach/router';
import { IconHome } from '@tabler/icons';
import React from 'react';

const SContainer = styled(Container)`
  color: ${({ theme }) =>
    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]};
`;
const SNumber = styled(Title)`
  font-size: 220px;
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.xl * 1.5};
`;

const useSyles = createStyles(theme => ({
  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export const NotFoundApp = (props: RouteComponentProps) => {
  return (
    <SContainer py="lg">
      <SNumber align="center" weight="bold">
        404
      </SNumber>
      <Title size="h2" weight="bold" align="center" mb="lg">
        You have found a secret place.
      </Title>
      <Text color="dimmed" size="lg" align="center">
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="md">
          <IconHome stroke={1.5} />
        </Button>
      </Group>
    </SContainer>
  );
};
