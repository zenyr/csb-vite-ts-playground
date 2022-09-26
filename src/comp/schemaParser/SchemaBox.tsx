import { Card, Group, Badge, Chip, Box, Menu, ActionIcon, Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowDown, IconArrowUp, IconCaretDown, IconCaretUp, IconPlus, IconTrash } from '@tabler/icons';
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
    <Card withBorder={isBox} shadow={isBox ? 'sm' : void 0} radius="md" mb="xs" p="xs">
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Button
            variant="white"
            onClick={isBox ? toggle : showEditSchemaModal}
            data-id={s.id}
            color={isBox ? 'gray' : 'blue'}
            size={isBox ? 'md' : 'sm'}
            leftIcon={isBox && (open ? <IconCaretUp /> : <IconCaretDown />)}
          >
            {s.name}
          </Button>

          <Badge color={isBox ? 'gray' : 'green'}>{s.field.type}</Badge>
          {s.asCopiable && (
            <Chip readOnly checked>
              Copiable
            </Chip>
          )}
          {s.nullable && (
            <Chip readOnly checked>
              Nullable
            </Chip>
          )}
          <Group ml="auto">
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
        </Group>
      </Card.Section>
      {isBox && (
        <Card.Section p="xs" pl="sm" hidden={!open}>
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
        <Card.Section withBorder p="xs" hidden={!open}>
          <ActionIcon data-id={s.id} onClick={showAddSchemaModal}>
            <IconPlus />
          </ActionIcon>
        </Card.Section>
      )}
    </Card>
  );
};
