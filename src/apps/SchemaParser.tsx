import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { SCHEMA_MOCK } from '../comp/schemaParser/mock';
import { buildTree, treeToComponent } from '../comp/schemaParser/util';
import { Grid, JsonInput } from '@mantine/core';

export const SchemaParserApp = (props: RouteComponentProps) => {
  const [schemas, setSchemas] = useState(JSON.stringify(SCHEMA_MOCK.schemas));
  const [fields, setFields] = useState(JSON.stringify(SCHEMA_MOCK.fields));

  const [tree, setTree] = useState(buildTree(JSON.parse(schemas), JSON.parse(fields)));

  return (
    <Grid grow>
      <Grid.Col span={6}>
        <JsonInput value={schemas} onChange={setSchemas} formatOnBlur autosize minRows={4} maxRows={20} />
      </Grid.Col>
      <Grid.Col span={6}>
        <JsonInput value={fields} onChange={setFields} formatOnBlur autosize minRows={4} maxRows={20} />
      </Grid.Col>
      <Grid.Col span={12}>
        <JsonInput value={JSON.stringify(tree)} autosize minRows={4} />
      </Grid.Col>
      <Grid.Col span={12}>
        <div>{treeToComponent(tree, {})}</div>
      </Grid.Col>
    </Grid>
  );
};
