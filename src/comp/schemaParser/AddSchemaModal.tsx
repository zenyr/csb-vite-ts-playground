import React, { FC, useCallback, useMemo } from 'react';
import { Field, Schema, schemaValidator } from './model';
import { useForm, zodResolver } from '@mantine/form';
import {
  Alert,
  Button,
  Group,
  Modal,
  SegmentedControl,
  Select,
  Stack,
  Switch,
  TextInput,
} from '@mantine/core';
import { Uuid4 } from 'id128';
import { IconPlus } from '@tabler/icons';

type Props = {
  isEdit: boolean;
  opened: boolean;
  onClose(): void;
  sId: string | null;
  fields: Field[];
  initialSchema?: Schema;
  onCreate(schema: Schema): void;
  onEdit(sId: string, schema: Omit<Schema, 'id' | 'parent_id'>): void;
};

export const AddSchemaModal = ({
  fields,
  isEdit,
  onClose,
  initialSchema,
  onCreate,
  onEdit,
  opened,
  sId,
}: Props) => {
  const form = useForm({
    validate: zodResolver(schemaValidator.omit({ id: true, parent_id: true })),
    initialValues: {
      field_type_id: '',
      name: '',
      hint: '',
      placeholder: '',
      copiable: false,
      nullable: false,
      keep: false,
      ...initialSchema,
    },
  });

  const handleSubmit = useCallback(
    ({ copiable, nullable, keep, ...values }: typeof form.values) => {
      const id = (isEdit && sId) || Uuid4.generate().toRaw().toLowerCase();
      if (isEdit) {
        const schema = {
          copiable: copiable || void 0,
          nullable: nullable || void 0,
          ...values,
        };
        onEdit(id, schema);
      } else {
        const schema = {
          id,
          parent_id: sId,
          copiable: copiable || void 0,
          nullable: nullable || void 0,
          ...values,
        };
        onCreate(schema);
      }
      if (!keep) onClose();
    },
    [isEdit, onEdit, onCreate, sId],
  );

  const fieldItems = useMemo(
    () => fields.map(item => ({ value: item.id, label: `${item.type} ${item.options?.join(',') || ''}` })),
    [fields],
  );

  return (
    <Modal opened={opened} onClose={onClose} title={'Add a schema to ' + sId}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Select
            label="Field type"
            placeholder="Pick one"
            data={fieldItems}
            {...form.getInputProps('field_type_id')}
          />
          <TextInput label="Field Name" placeholder="name" {...form.getInputProps('name')} withAsterisk />
          <TextInput label="Hint" placeholder="hint" {...form.getInputProps('hint')} />
          <TextInput label="Placeholder" placeholder="placeholder" {...form.getInputProps('placeholder')} />
          <Switch
            color="cyan"
            onLabel="Yes"
            offLabel="No"
            label="Copiable"
            {...form.getInputProps('copiable', { type: 'checkbox' })}
          />
          <Switch
            color="orange"
            onLabel="Yes"
            offLabel="No"
            label="Nullable"
            {...form.getInputProps('nullable', { type: 'checkbox' })}
          />
          {!form.isValid && (
            <Alert>
              <pre>{JSON.stringify(form.errors)}</pre>
            </Alert>
          )}
          <Group position="apart">
            <Button onClick={onClose}>Close</Button>
            <Switch
              color="red"
              onLabel="Yes"
              offLabel="No"
              label="KEEP OPENED"
              {...form.getInputProps('keep', { type: 'checkbox' })}
            />
            <Button type="submit" leftIcon={<IconPlus />}>
              {isEdit ? 'Edit' : 'Add'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
