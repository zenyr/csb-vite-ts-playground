import {
  Card,
  Group,
  Badge,
  Chip,
  Box,
  Menu,
  ActionIcon,
  Text,
  Button,
  Grid,
  Indicator,
  Tooltip,
} from '@mantine/core';
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

const STYLES_INDICATOR = { indicator: { lineHeight: '18px' } };
const STYLES_BUTTON = { inner: { justifyContent: 'flex-start' } };

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
      <Card.Section withBorder inheritPadding pb={1}>
        <Grid align="center">
          <Grid.Col span={1}>
            <Tooltip
              label={[s.field.type, s.field.options?.join(', ')].filter(Boolean).join(' / ')}
              withinPortal
            >
              <Badge fullWidth color={isBox ? 'gray' : 'green'}>
                {s.field.type}
              </Badge>
            </Tooltip>
          </Grid.Col>
          <Grid.Col span={7}>
            <Group grow align="center">
              <Button
                variant="white"
                onClick={isBox ? toggle : void 0}
                data-id={s.id}
                color={isBox ? 'gray' : 'dark'}
                size="sm"
                leftIcon={isBox && (open ? <IconCaretUp /> : <IconCaretDown />)}
                styles={STYLES_BUTTON}
                fullWidth
              >
                <Box pr="lg">
                  <Indicator
                    label={childCount}
                    size={20}
                    showZero={false}
                    dot={false}
                    styles={STYLES_INDICATOR}
                    color="gray"
                    offset={7}
                  >
                    {s.name}
                    {'\u2000\u2000\u2000'}
                  </Indicator>
                </Box>
              </Button>

              {s.asCopiable && (
                <Chip readOnly checked={false} size="xs" color="blue" variant="filled">
                  Children Copiable
                </Chip>
              )}
              {s.copiable && (
                <Chip readOnly checked={false} size="xs" color="teal" variant="filled">
                  Copiable
                </Chip>
              )}
              {s.nullable && (
                <Chip readOnly checked={false} size="xs" color="dark" variant="filled">
                  Nullable
                </Chip>
              )}
            </Group>
          </Grid.Col>
          <Grid.Col span={4}>
            <Group ml="auto" noWrap>
              <Tooltip label="Move Up" withinPortal>
                <ActionIcon
                  data-id={s.id}
                  data-down=""
                  onClick={moveSchema}
                  variant="transparent"
                  disabled={!canMoveUp}
                >
                  <IconArrowUp />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Move Down" withinPortal>
                <ActionIcon
                  data-id={s.id}
                  data-down="1"
                  onClick={moveSchema}
                  variant="transparent"
                  disabled={!canMoveDown}
                >
                  <IconArrowDown />
                </ActionIcon>
              </Tooltip>
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
