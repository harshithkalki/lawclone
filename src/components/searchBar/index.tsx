import { useEffect, useState } from 'react';
import { Autocomplete, Group, createStyles, Modal } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { trpc } from '@/utils/trpc';
import { ActionIcon } from '@mantine/core';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export default function SearchBar() {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [names, setNames] = useState<string[]>([
    'Sample Lawyer1',
    'Sample Lawyer2',
  ]);
  const lawyernames = trpc.user.getLawyers.useMutation();

  async function getLawyersName(i: string) {
    const username = (await lawyernames.mutateAsync(i)).usernames;
    setNames(username);
  }

  useEffect(() => {
    getLawyersName(query);
  }, [query]);

  const searchItems = [
    'Civil Lawyer',
    'Criminal Lawyer',
    'Divorce',
    'Immigration Lawyer',
    'Tax Lawyer',
    'Medical Lawyer',
    'Legal Advices',
  ];
  const data = [...searchItems, ...names];

  return (
    <>
      <Group
        sx={{ height: '100%' }}
        spacing={0}
        className={classes.hiddenMobile}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('dlsl');
          }}
        >
          <Autocomplete
            onItemSubmit={(item) => router.push(`/search/${item.value}`)}
            data={data as string[]}
            size='md'
            w='40rem'
            mr='5rem'
            value={query}
            onChange={(e) => setQuery(e)}
            icon={<IconSearch />}
            placeholder='Search your lawyer'
            onSubmit={() => console.log(query)}
          />
          <button type='submit' hidden></button>
        </form>
      </Group>
      <Modal
        opened={opened}
        withCloseButton={false}
        onClose={() => setOpened(false)}
      >
        <Group sx={{ height: '100%' }} spacing={0}>
          <Autocomplete
            data={data as string[]}
            size='md'
            w='40rem'
            mr='5rem'
            value={query}
            onChange={(e) => setQuery(e)}
            icon={<IconSearch />}
            placeholder='Search your lawyer'
          />
        </Group>
      </Modal>
      <Group
        sx={{ height: '100%' }}
        spacing={0}
        className={classes.hiddenDesktop}
      >
        <ActionIcon onClick={() => setOpened(true)}>
          <IconSearch />
        </ActionIcon>
      </Group>
    </>
  );
}
