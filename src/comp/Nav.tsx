import { NavLink } from '@mantine/core';
import { Link, Match } from '@reach/router';
import React, { ReactNode } from 'react';
import { ROUTES } from '../routes';

type ItemProps = { to?: string; label?: string; icon?: ReactNode; onClick?(): void };

const Item = ({ to = '', ...props }: ItemProps) => (
  <Match path={to}>
    {({ match }) => <NavLink to={to} component={Link} {...props} active={!!match} />}
  </Match>
);

type Props = { onClick(): void };
export const LeftNav = ({ onClick }: Props) => {
  return (
    <>
      {ROUTES.filter(route => !route.hidden && !!route.to).map(
        ({ app: _, hidden: __, ...item }) => (
          <Item {...item} onClick={onClick} />
        ),
      )}
    </>
  );
};
