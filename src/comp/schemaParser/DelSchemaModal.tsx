import { Button, Group, Modal, Stack } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import React from 'react';

type Props = {
  opened: boolean;
  onClose(): void;
  sId: string | null;
  onDelete(sId: string): void;
};

export const DelSchemaModal = ({ onClose, onDelete, opened, sId }: Props) => {
  return (
    <Modal opened={opened} onClose={onClose} title={'Delete a schema'}>
      <Stack>
        <Group position="apart">
          <Button onClick={onClose}>Cancel</Button>

          <Button onClick={() => (sId && onDelete(sId), onClose())} leftIcon={<IconTrash />} color="red">
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
