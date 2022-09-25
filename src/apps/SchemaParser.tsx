import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { SCHEMA_MOCK } from '../comp/schemaParser/mock';
import { buildTree, treeToComponent } from '../comp/schemaParser/util';
import { JsonInput } from '@mantine/core';

export const SchemaParserApp = (props: RouteComponentProps) => {
  const [tree] = useState(buildTree(SCHEMA_MOCK.schemas, SCHEMA_MOCK.fields));

  return (
    <>
      <JsonInput value={JSON.stringify(tree)} />
      <div>{treeToComponent(tree, {})}</div>
    </>
  );
};
