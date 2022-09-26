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
          <Button onClick={onClose}>Close</Button>

          <Button onClick={() => sId && onDelete(sId)} leftIcon={<IconTrash />}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
