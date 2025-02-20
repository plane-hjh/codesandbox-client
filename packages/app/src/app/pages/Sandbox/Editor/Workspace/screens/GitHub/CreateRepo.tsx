import track from '@codesandbox/common/lib/utils/analytics';
import {
  Button,
  Collapsible,
  Element,
  FormField,
  Input,
  Link,
  Stack,
  Text,
} from '@codesandbox/components';
import { useAppState, useActions } from 'app/overmind';
import React, { ChangeEvent } from 'react';

export const CreateRepo = () => {
  const {
    git: { createRepoClicked, repoTitleChanged },
    openCreateSandboxModal,
  } = useActions();
  const {
    editor: { isAllModulesSynced, currentSandbox },
    git: { error, repoTitle },
  } = useAppState();

  const updateRepoTitle = ({
    target: { value: title },
  }: ChangeEvent<HTMLInputElement>) => repoTitleChanged({ title });

  const createRepo = e => {
    e.preventDefault();
    track('Export to GitHub Clicked');
    createRepoClicked();
  };

  const disabled = Boolean(error) || !repoTitle || !isAllModulesSynced;

  return (
    <Collapsible
      title="Export to new GitHub repository"
      defaultOpen={!currentSandbox.originalGit}
    >
      <Element paddingX={2}>
        <Text variant="muted" marginBottom={4} block>
          Export the content of this sandbox to a new GitHub repository,
          allowing you to commit changes made on Codesandbox to GitHub. If you
          want to rather import an existing repository,{' '}
          <Link
            css={{ color: 'white' }}
            onClick={() => openCreateSandboxModal({ initialTab: 'Import' })}
          >
            open the GitHub import
          </Link>
          .
        </Text>
        {!isAllModulesSynced && (
          <Text marginBottom={2} block variant="danger">
            Save your files first before exporting.
          </Text>
        )}

        {error && (
          <Text marginBottom={2} block variant="danger">
            {error}
          </Text>
        )}

        <Stack
          marginX={0}
          as="form"
          direction="vertical"
          gap={2}
          onSubmit={createRepo}
        >
          <FormField label="Repository name" hideLabel>
            <Input
              type="text"
              onChange={updateRepoTitle}
              value={repoTitle}
              placeholder="Repository name..."
            />
          </FormField>
          <Element paddingX={2}>
            <Button type="submit" disabled={disabled} variant="secondary">
              Create new repository on GitHub
            </Button>
          </Element>
        </Stack>
      </Element>
    </Collapsible>
  );
};
