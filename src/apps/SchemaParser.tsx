import { Grid, JsonInput, Tabs } from '@mantine/core';
import { RouteComponentProps } from '@reach/router';
import React, { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { AddSchemaModal as AddEditSchemaModal } from '../comp/schemaParser/AddSchemaModal';
import { DelSchemaModal } from '../comp/schemaParser/DelSchemaModal';
import { SCHEMA_MOCK } from '../comp/schemaParser/mock';
import { Field, Schema } from '../comp/schemaParser/model';
import { SchemaBox } from '../comp/schemaParser/SchemaBox';
import { buildTree } from '../comp/schemaParser/util';

export const SchemaParserApp = (props: RouteComponentProps) => {
  const [schemas, setSchemas] = useState(JSON.stringify(SCHEMA_MOCK.schemas, null, 1));
  const [fields, setFields] = useState(JSON.stringify(SCHEMA_MOCK.fields, null, 1));

  const aSchemas: Schema[] = useMemo(() => JSON.parse(schemas), [schemas]);
  const aFields: Field[] = useMemo(() => JSON.parse(fields), [fields]);
  const boxTypeId = aFields.find(f => f.type === 'box')?.id;
  const fBoxSchemas: Schema[] = useMemo(
    () => aSchemas.filter(s => s.field_type_id === boxTypeId),
    [aSchemas],
  );
  const fFieldSchemas: Schema[] = useMemo(
    () => aSchemas.filter(s => s.field_type_id !== boxTypeId),
    [aSchemas],
  );

  const [addSId, setAddSId] = useState<string | null>(null);
  const [delSId, setDelSId] = useState<string | null>(null);
  const [editSId, setEditSId] = useState<string | null>(null);

  const handleASModalClick = useCallback((e: MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.getAttribute('data-id');
    if (!id) return;
    setAddSId(id);
  }, []);
  const handleRSModalClick = useCallback((e: MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.getAttribute('data-id');
    if (!id) return;
    setDelSId(id);
  }, []);
  const handleESModalClick = useCallback((e: MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.getAttribute('data-id');
    if (!id) return;
    setEditSId(id);
  }, []);

  const addSchema = useCallback(
    (schema: Schema) => setSchemas(schemas => JSON.stringify([...JSON.parse(schemas), schema], null, 1)),
    [],
  );
  const editSchema = useCallback(
    (sId: string, schema: Schema) => {
      const idx = aSchemas.findIndex(schema => schema.id === sId);
      if (idx === -1) return; // ??
      const result = aSchemas.slice();
      result.splice(idx, 1, schema);
      setSchemas(JSON.stringify(result, null, 1));
    },
    [aSchemas],
  );
  const delSchema = useCallback(
    (sId: string) => {
      const delSIds = new Set([sId]);
      aSchemas.forEach(schema => {
        // scan children
        if (schema.parent_id && delSIds.has(schema.parent_id)) delSIds.add(schema.id);
      });
      const result = aSchemas.filter(schema => !delSIds.has(schema.id));

      setSchemas(JSON.stringify(result, null, 1));
    },
    [aSchemas],
  );
  const moveSchema = useCallback(
    (sId: string, moveDown: boolean) => {
      // get instigator and target
      const instigator = aSchemas.find(schema => schema.id === sId);
      if (!instigator) return;
      const siblings = aSchemas.filter(schema => schema.parent_id === instigator.parent_id);
      if (siblings.length === 0) return;
      const currIdx = siblings.indexOf(instigator);
      if (currIdx === -1) return; // ??
      const targetIdx = Math.max(0, Math.min(siblings.length - 1, currIdx + (moveDown ? +1 : -1)));
      if (currIdx === targetIdx) return console.log('OOB', { currIdx, targetIdx, moveDown }); // OOB check
      const target = siblings[targetIdx];

      const result = [...aSchemas];
      const currAIdx = result.indexOf(instigator);
      const targetAIdx = result.indexOf(target);
      if (currAIdx === -1 || targetAIdx === -1) return; // ????
      // swap
      result[currAIdx] = target;
      result[targetAIdx] = instigator;

      setSchemas(JSON.stringify(result, null, 1));
    },
    [aSchemas],
  );
  const handleMoveSchema = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const id = e.currentTarget.getAttribute('data-id');
      const moveDown = Boolean(e.currentTarget.getAttribute('data-down'));
      if (!id) return;
      moveSchema(id, moveDown);
    },
    [moveSchema],
  );

  const editingSchema = useMemo(() => aSchemas.find(s => s.id === editSId), [aSchemas, editSId]);

  const [tree, setTree] = useState(buildTree(aSchemas, aFields));

  useEffect(() => setTree(buildTree(aSchemas, JSON.parse(fields))), [schemas, fields]);

  return (
    <>
      <AddEditSchemaModal
        key={editSId}
        isEdit={!!editSId}
        initialSchema={editingSchema}
        opened={!!addSId || !!editSId}
        onClose={() => (setAddSId(null), setEditSId(null))}
        sId={addSId || editSId}
        onCreate={addSchema}
        onEdit={editSchema}
        fields={aFields}
      />
      <DelSchemaModal opened={!!delSId} onClose={() => setDelSId(null)} onDelete={delSchema} sId={delSId} />

      <Tabs defaultValue="component">
        <Tabs.List>
          <Tabs.Tab value="values">Values</Tabs.Tab>
          <Tabs.Tab value="parsed">Parsed</Tabs.Tab>
          <Tabs.Tab value="component">Result</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="values" pt="xs">
          <Grid grow>
            <Grid.Col span={6}>
              <JsonInput
                label="Schemas"
                value={schemas}
                onChange={setSchemas}
                formatOnBlur
                autosize
                minRows={4}
                maxRows={40}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <JsonInput
                label="Fields"
                value={fields}
                onChange={setFields}
                formatOnBlur
                autosize
                minRows={4}
                maxRows={40}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <JsonInput
                label="Schemas(Boxes)"
                value={JSON.stringify(fBoxSchemas, null, 1)}
                readOnly
                formatOnBlur
                autosize
                minRows={4}
                maxRows={40}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <JsonInput
                label="Schemas(Fields)"
                value={JSON.stringify(fFieldSchemas, null, 1)}
                readOnly
                formatOnBlur
                autosize
                minRows={4}
                maxRows={40}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
        <Tabs.Panel value="parsed" pt="xs">
          <JsonInput
            label="Parsed tree"
            value={JSON.stringify(tree, null, 1)}
            autosize
            minRows={4}
            maxRows={40}
          />
        </Tabs.Panel>

        <Tabs.Panel value="component" pt="xs">
          <SchemaBox
            s={tree}
            flatState={{}}
            showAddSchemaModal={handleASModalClick}
            showRemoveSchemaModal={handleRSModalClick}
            showEditSchemaModal={handleESModalClick}
            moveSchema={handleMoveSchema}
            canMoveUp={false}
            canMoveDown={false}
          />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
