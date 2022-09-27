import React, { ReactNode } from 'react';
import { IconCode, IconHome2 } from '@tabler/icons';
import { IndexApp } from './apps/Index';
import { SchemaParserApp } from './apps/SchemaParser';
import { NotFoundApp } from './apps/NotFoundApp';

export const ROUTES = [
  { to: '/', label: 'Home', icon: <IconHome2 size={16} stroke={1.5} />, app: IndexApp },
  {
    to: '/schema-parser',
    label: 'Schema Parser',
    icon: <IconCode size={16} stroke={1.5} />,
    app: SchemaParserApp,
  },
  {
    hidden: true,
    app: NotFoundApp,
  },
];
