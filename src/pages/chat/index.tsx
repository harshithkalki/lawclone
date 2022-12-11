import {
  Avatar,
  Group,
  ScrollArea,
  Stack,
  Text,
  createStyles,
  Grid,
  Header,
  TextInput,
  Title,
  ActionIcon,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSearch, IconSend } from '@tabler/icons';
import React from 'react';

const useStyles = createStyles((theme) => ({
  selectChat: {
    borderBottom: `1px solid ${theme.colors.dark[6]}`,
    flex: 1,
  },
  wrapper: {
    color: theme.white,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      cursor: 'pointer',
    },
  },
  userInfo: {
    borderBottom: `1px solid ${theme.colors.dark[6]}`,
    flexGrow: 1,
    padding: theme.spacing.md,
  },
  avatar: {
    marginLeft: theme.spacing.md,
  },
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
}));

const Users = ({ onClick }: { onClick: () => void }) => {
  const { classes } = useStyles();

  return (
    <ScrollArea scrollbarSize={8} className={classes.selectChat} type='auto'>
      {[...Array(100)].map((_, index) => (
        <Group
          spacing='md'
          key={index}
          className={classes.wrapper}
          onClick={onClick}
        >
          <Avatar
            size={50}
            radius={40}
            className={classes.avatar}
            src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
          />
          <div className={classes.userInfo} style={{ flexGrow: 1 }}>
            <Text size='lg' weight={500}>
              abhiram
            </Text>
            <Text color='dimmed' size='sm'>
              message here
            </Text>
          </div>
        </Group>
      ))}
    </ScrollArea>
  );
};

const Messages = () => {
  return (
    <ScrollArea style={{ flex: 1 }} w='100%' scrollbarSize={8}>
      <Stack p={'md'} spacing={'sm'}>
        {[...Array(2)].map((_, index) => (
          <Msg isReceiver={false} key={index}>
            Hi there
          </Msg>
        ))}
        {[...Array(2)].map((_, index) => (
          <Msg isReceiver={true} key={index}>
            Hi there
          </Msg>
        ))}
        {[...Array(2)].map((_, index) => (
          <Msg isReceiver={false} key={index}>
            Hi there
          </Msg>
        ))}{' '}
        {[...Array(2)].map((_, index) => (
          <Msg isReceiver={false} key={index}>
            Hi there
          </Msg>
        ))}
        {[...Array(20)].map((_, index) => (
          <Msg isReceiver={true} key={index}>
            Hi there
          </Msg>
        ))}
      </Stack>
    </ScrollArea>
  );
};

const useMsgStyles = createStyles((theme) => ({
  wrapper: {
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.dark[3],
    borderRadius: theme.radius.md,
    width: 'fit-content',
  },
  receiver: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.dark[5],
  },
}));

const Msg = ({
  children,
  isReceiver,
}: {
  children: React.ReactNode;
  isReceiver: boolean;
}) => {
  const { classes, cx } = useMsgStyles();
  return (
    <div className={cx(classes.wrapper, { [classes.receiver]: isReceiver })}>
      <Text>{children}</Text>
    </div>
  );
};

const Chat = () => {
  const { classes, theme } = useStyles();
  const [showChat, setShowChat] = React.useState(false);
  const matches = useMediaQuery('(max-width: 800px)');

  return (
    <Grid style={{ height: '100vh' }} columns={3} align='stretch' gutter={0}>
      <Grid.Col
        style={{ height: '100%' }}
        sm={3}
        md={1}
        lg={1}
        hidden={matches && showChat}
      >
        <Stack h='100%'>
          <Header height={60}>
            <Group sx={{ height: '100%' }}>
              <a href='#' className={classes.link}>
                Home
              </a>
            </Group>
          </Header>
          <TextInput
            icon={<IconSearch size={16} />}
            placeholder='Search'
            pl='sm'
            pr='sm'
          />
          <Users onClick={() => setShowChat(true)} />
        </Stack>
      </Grid.Col>
      <Grid.Col
        sm={3}
        md={2}
        lg={2}
        h='100%'
        style={{ borderLeft: `1px solid ${theme.colors.dark[6]}` }}
        hidden={matches ? !showChat : false}
      >
        <Stack h='100%'>
          <Header height={60} pl='md'>
            <Group spacing={5} align='center' h='100%'>
              <Group>
                <Avatar
                  radius={'xl'}
                  size={50}
                  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
                />
                <Title order={4}>Abhiram</Title>
              </Group>
            </Group>
          </Header>
          <Messages />
          <Group
            p='sm'
            style={{
              backgroundColor: theme.colors.dark[5],
            }}
            w='100%'
            h={60}
          >
            <form style={{ flex: 1 }}>
              <Group spacing={5}>
                <TextInput
                  size='md'
                  radius='md'
                  placeholder=''
                  style={{ flex: 1 }}
                  autoComplete='off'
                />
                <ActionIcon
                  color={'blue'}
                  variant='filled'
                  size={'xl'}
                  h='100%'
                  radius={'md'}
                >
                  <IconSend size={20} />
                </ActionIcon>
              </Group>
            </form>
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default Chat;
