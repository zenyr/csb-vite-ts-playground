import { Card, Group, Badge, Chip, Box, Menu, ActionIcon, Text, Button, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArrowDown,
  IconArrowUp,
  IconCaretDown,
  IconCaretUp,
  IconPencil,
  IconPlus,
  IconTrash,
} from '@tabler/icons';
import React, { FC, MouseEvent } from 'react';
import { ParsedSchema } from './model';

type Props = {
  s: ParsedSchema;
  flatState: Record<string, { value: unknown; confirmed: boolean }>;
  showAddSchemaModal(e: MouseEvent<HTMLElement>): void;
  showRemoveSchemaModal(e: MouseEvent<HTMLElement>): void;
  moveSchema(e: MouseEvent<HTMLElement>): void;
  showEditSchemaModal(e: MouseEvent<HTMLElement>): void;
  canMoveUp: boolean;
  canMoveDown: boolean;
};
export const SchemaBox = ({ s, ...props }: Props) => {
  const {
    flatState,
    showAddSchemaModal,
    showRemoveSchemaModal,
    moveSchema,
    showEditSchemaModal,
    canMoveUp,
    canMoveDown,
  } = props;
  const isBox = s.field.type === 'box';
  const [open, { toggle }] = useDisclosure(true);
  const childCount = s.children?.length || 0;

  return (
    <Card withBorder={isBox} shadow={isBox ? 'sm' : void 0} radius={isBox ? 'md' : 0} my="xs" p={0} px="xs">
      <Card.Section withBorder inheritPadding>
        <Grid align="center">
          <Grid.Col span={1}>
            <Badge fullWidth color={isBox ? 'gray' : 'green'}>
              {s.field.type}
            </Badge>
          </Grid.Col>
          <Grid.Col span={7}>
            <Group grow align="center">
              <Button
                variant="white"
                onClick={isBox ? toggle : showEditSchemaModal}
                data-id={s.id}
                color={isBox ? 'gray' : 'blue'}
                size="sm"
                leftIcon={isBox && (open ? <IconCaretUp /> : <IconCaretDown />)}
                styles={{ inner: { justifyContent: 'flex-start' } }}
                fullWidth
              >
                {s.name}
              </Button>

              {s.asCopiable && (
                <Chip readOnly checked size="xs">
                  Children Copiable
                </Chip>
              )}
              {s.nullable && (
                <Chip readOnly checked>
                  Nullable
                </Chip>
              )}
            </Group>
          </Grid.Col>
          <Grid.Col span={4}>
            <Group ml="auto" noWrap>
              <ActionIcon
                data-id={s.id}
                data-down=""
                onClick={moveSchema}
                variant="transparent"
                disabled={!canMoveUp}
              >
                <IconArrowUp />
              </ActionIcon>
              <ActionIcon
                data-id={s.id}
                data-down="1"
                onClick={moveSchema}
                variant="transparent"
                disabled={!canMoveDown}
              >
                <IconArrowDown />
              </ActionIcon>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <Badge color="dark" variant="dot">
                    {s.stableId}
                  </Badge>
                </Menu.Target>
                <Menu.Dropdown>
                  {isBox && (
                    <Menu.Item data-id={s.id} onClick={showAddSchemaModal} icon={<IconPlus size={14} />}>
                      Add
                    </Menu.Item>
                  )}
                  <Menu.Item data-id={s.id} onClick={showEditSchemaModal} icon={<IconPencil size={14} />}>
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    data-id={s.id}
                    onClick={showRemoveSchemaModal}
                    icon={<IconTrash size={14} />}
                    color="red"
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Grid.Col>
        </Grid>
      </Card.Section>
      {isBox && (
        <Card.Section inheritPadding pl="sm" hidden={!open}>
          {s.children?.map((child, childIdx) => (
            <SchemaBox
              s={child}
              key={child.stableId}
              {...props}
              canMoveUp={childIdx - 1 >= 0}
              canMoveDown={childIdx + 1 < childCount}
            />
          )) ?? <Text>No children</Text>}
        </Card.Section>
      )}
      {isBox && (
        <Card.Section withBorder inheritPadding hidden={!open}>
          <ActionIcon data-id={s.id} onClick={showAddSchemaModal}>
            <IconPlus />
          </ActionIcon>
        </Card.Section>
      )}
    </Card>
  );
};
