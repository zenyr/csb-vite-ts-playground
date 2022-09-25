import { ActionIcon, Badge, Box, Button, Card, Chip, Group, Menu } from '@mantine/core';
import { IconEye, IconFileZip, IconTrash } from '@tabler/icons';
import React from 'react';
import { Field, ParsedSchema, Schema } from './model';

export const buildTree = (schemas: Schema[], fields: Field[]) => {
  // fId to field, sId to Schema
  const flatFields = fields.reduce(
    (acc, value) => ((acc[value.id] = value), acc),
    {} as Record<string, Field>,
  );
  const flatSchemas = schemas.reduce(
    (acc, value) => ((acc[value.id] = value), acc),
    {} as Record<string, Schema>,
  );
  const parentToChildren = schemas.reduce((acc, value) => {
    if (!value.parent_id) return acc;
    acc[value.parent_id] = acc[value.parent_id] || ([] as string[]);
    acc[value.parent_id].push(value.id);
    return acc;
  }, {} as Record<string, string[]>);
  const touchedSchema = new Set<string>();

  const traverse = (schema: Schema, breadcrumbs: number[]): ParsedSchema => {
    const { id, field_id } = schema;
    if (touchedSchema.has(id)) throw new Error('buildtree failed: possible double reference ' + id);
    touchedSchema.add(id);
    const rawChildren = parentToChildren[id]?.map(id => flatSchemas[id]);
    const asCopiable = rawChildren?.some(child => child.copiable);
    const children =
      rawChildren?.map((child, idx) => traverse(child, [...breadcrumbs, ...(asCopiable ? [idx] : [])])) ||
      void 0;
    const field = flatFields[field_id];
    const stableId = `${id}|${breadcrumbs.join('|') || 0}`;
    if (!field) throw new Error('buildtree failed: invalid field_id ' + field_id);
    return { stableId, ...schema, field, asCopiable, children };
  };

  const rootSchema = schemas.find(item => !item.parent_id);
  if (!rootSchema) throw new Error('buildtree failed: No root schema found!');

  const result = traverse(rootSchema, []);

  // check unvisited schema
  if (touchedSchema.size !== schemas.length) {
    const orphaned = schemas.find(schema => !touchedSchema.has(schema.id));
    throw new Error('buildtree failed: Possible orphaned schema found: ' + (orphaned?.id || 'Unknown'));
  }
  return result;
};

export const treeToComponent = (
  parsedSchema: ParsedSchema,
  // todo read flatState to observable component values
  flatState: Record<string, { value: unknown; confirmed: boolean }>,
) => {
  const traverse = (s: ParsedSchema) => {
    const isBox = s.field.type === 'box';
    return (
      <Card withBorder={isBox} shadow={isBox ? 'sm' : void 0} radius="md" key={s.stableId} my="xs">
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Badge color={isBox ? 'gray' : 'green'}>{s.field.type}</Badge>
            <Badge>{s.name}</Badge>
            {s.asCopiable && (
              <Chip readOnly checked>
                Copiable
              </Chip>
            )}
            <Box ml="auto">
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <Button variant="subtle" size="xs">
                    {s.stableId}
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item icon={<IconFileZip size={14} />}>Download zip</Menu.Item>
                  <Menu.Item icon={<IconEye size={14} />}>Preview all</Menu.Item>
                  <Menu.Item icon={<IconTrash size={14} />} color="red">
                    Delete all
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
          </Group>
        </Card.Section>
        <Card.Section pl="sm" pr="xs">
          {s.children?.map(child => traverse(child))}
        </Card.Section>
      </Card>
    );
  };

  return traverse(parsedSchema);
};