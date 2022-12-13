import {
  createStyles,
  Header,
  Group,
  Button,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Autocomplete,
  Select,
  Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { useRouter } from 'next/router';
import { UserMenu } from '../UserMenu';
import SearchBar from '../searchBar';
import { signOut } from 'next-auth/react';
import { auth } from 'firebaseconfig';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

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
  searchCompo: {
    width: '100%',
    minWidth: 500,
  },
}));

export const HeaderMenu = ({ isAuth }: { isAuth: boolean }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const { push, locale } = useRouter();
  const login = () => {
    push('/signin');
  };
  const signup = () => {
    push('/signup');
  };

  return (
    <Box>
      <Header height={60} px='md'>
        <Group position='apart' sx={{ height: '100%' }}>
          <Text>Logo</Text>

          <Group className={classes.hiddenMobile}>
            <SearchBar />
            <div style={{ display: !isAuth ? 'none' : 'block' }}>
              <UserMenu>
                <Avatar
                  size={'md'}
                  radius='xl'
                  src='/avatar.png'
                  style={{ cursor: 'pointer' }}
                />
              </UserMenu>
            </div>
            <Group hidden={isAuth}>
              <Button variant='default' onClick={login}>
                Log in
              </Button>
              <Button onClick={signup}>Sign up</Button>
            </Group>
            <Select
              data={[
                { label: 'English', value: 'en' },
                { label: 'French', value: 'fr' },
              ]}
              size='xs'
              defaultValue={locale}
            />
          </Group>
          <Group
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            className={classes.hiddenDesktop}
          >
            <SearchBar />
            <div style={{ display: !isAuth ? 'none' : 'block' }}>
              <UserMenu>
                <Avatar
                  size={'md'}
                  radius='xl'
                  src='/avatar.png'
                  style={{ cursor: 'pointer' }}
                />
              </UserMenu>
            </div>
            <div></div>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='100%'
        padding='md'
        title='Navigation'
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx='-md'>
          <Divider
            my='sm'
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <a href='#' className={classes.link}>
            Home
          </a>

          <a href='#' className={classes.link}>
            Learn
          </a>
          <a href='#' className={classes.link}>
            Academy
          </a>

          <Select
            data={['English', 'French']}
            size='xs'
            maw={'fit-content'}
            pl='md'
            mt='sm'
          />

          <Divider
            my='sm'
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Group position='center' hidden={isAuth} grow pb='xl' px='md'>
            <Button variant='default' onClick={login}>
              Log in
            </Button>
            <Button onClick={signup}>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
