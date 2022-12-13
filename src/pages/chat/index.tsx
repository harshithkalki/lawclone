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
  Flex,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSearch, IconSend } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import {
  useCollection,
  useCollectionData,
} from 'react-firebase-hooks/firestore';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  limit,
} from 'firebase/firestore';
import { db } from 'firebaseconfig';
import { BiArrowBack } from 'react-icons/bi';
import { ImAttachment } from 'react-icons/im';
import { getSession } from 'next-auth/react';
import type { GetServerSidePropsContext } from 'next';

const getUser = (users: string[], currentUser: any) =>
  users?.filter((user) => user !== currentUser);

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

const GetLastMessage = ({ id }: { id: string }) => {
  const q = query(
    collection(db, `chats/${id}/messages`),
    orderBy('timestamp', 'desc'),
    limit(1)
  );
  const [messages] = useCollectionData(q);

  if (messages) {
    return messages[0]?.sender === 'name' ? (
      <Text color='dimmed' size='sm'>
        Me : {messages[0]?.text.slice(0, 40)}
      </Text>
    ) : (
      <Text color='dimmed' size='sm'>
        {messages[0]?.text.slice(0, 40)}
      </Text>
    );
  } else {
    return <Text color='dimmed' size='sm'></Text>;
  }
};

const Users = ({
  setShowChat,
  setId,
  name,
}: {
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  name: string | undefined;
}) => {
  const { classes } = useStyles();
  const [snapshot] = useCollection(collection(db, 'chats'));
  const chats: any = snapshot?.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((c: any) => c.users.includes(name));

  return (
    <ScrollArea scrollbarSize={8} className={classes.selectChat} type='auto'>
      {chats?.length === 0 && <Title order={3}>No chats to show</Title>}
      {chats?.map((chat: any, index: number) => (
        <Group
          spacing='md'
          h='md'
          key={index}
          className={classes.wrapper}
          onClick={() => {
            setShowChat(true);
            setId(chat.id);
          }}
        >
          <Avatar
            size={50}
            radius={40}
            className={classes.avatar}
            // src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
          >
            {getUser(chat.users, 'name')[0]?.slice(0, 1).toUpperCase()}
          </Avatar>
          <div className={classes.userInfo} style={{ flexGrow: 1 }}>
            <Text size='lg' weight={500}>
              {getUser(chat.users, name)}
            </Text>
            <GetLastMessage id={chat.id} />
          </div>
        </Group>
      ))}
    </ScrollArea>
  );
};

const Messages = ({ messages }: { messages: any }) => {
  const viewport = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (viewport.current)
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: 'smooth',
      });
  }, [messages]);
  return (
    <ScrollArea
      style={{ flex: 1 }}
      w='100%'
      scrollbarSize={8}
      viewportRef={viewport}
    >
      <Stack p={'md'} spacing={'sm'}>
        {messages?.map((msg: any, index: number) => (
          <Msg isReceiver={msg.sender === 'name'} key={index}>
            {msg.text}
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

const SendMessage = ({ id }: { id: string }) => {
  const { classes, theme } = useStyles();
  const [value, setValue] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (value) {
      await addDoc(collection(db, `chats/${id}/messages`), {
        text: value,
        sender: 'name',
        timestamp: serverTimestamp(),
      });
      setValue('');
      const docRef = doc(db, 'chats', id as string);
      updateDoc(docRef, { receiverhasread: false });
    }
  };

  return (
    <Group
      p='sm'
      style={{
        backgroundColor: theme.colors.dark[5],
      }}
      w='100%'
      h={60}
    >
      <form onSubmit={handleSubmit} style={{ flex: 1 }}>
        <Group spacing={5}>
          <TextInput
            size='md'
            radius='md'
            placeholder=''
            style={{ flex: 1 }}
            autoComplete='off'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <ActionIcon
            type='submit'
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
  );
};

const Chat = ({ name }: { name: string | undefined }) => {
  const { classes, theme } = useStyles();
  const [value, setValue] = useState('');
  const [data, setData] = useState<any>();
  const [showChat, setShowChat] = React.useState(false);
  const matches = useMediaQuery('(max-width: 800px)');

  const [snapshot] = useCollection(collection(db, 'chats'));
  const chats: any = snapshot?.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((c: any) => c.users.includes('name'));
  console.log(chats);

  const [id, setId] = useState(' ');

  useEffect(() => {
    try {
      const docRef = doc(db, 'chats', id as string);
      getDoc(docRef).then((doc1) => {
        setData(doc1.data());
      });
    } catch (error) {
      return;
    }
  }, [id]);

  const q = query(collection(db, `chats/${id}/messages`), orderBy('timestamp'));
  const [messages] = useCollectionData(q);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setValue('');
  };

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
          <Users name={name} setId={setId} setShowChat={setShowChat} />
        </Stack>
      </Grid.Col>
      <Grid.Col
        sm={3}
        md={2}
        lg={2}
        h='100%'
        style={{
          borderLeft: `1px solid ${
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.dark[0]
          }`,
        }}
        hidden={matches ? !showChat : false}
      >
        {!data ? (
          <Flex direction='column' h='100%' justify='center' align='center'>
            <ImAttachment size={40} />
            <Title order={1}>Select a Conversation</Title>
          </Flex>
        ) : (
          <Stack h='100%'>
            <Header height={60} pl='md'>
              <Group spacing={5} align='center' h='100%'>
                <Group>
                  {matches && (
                    <BiArrowBack
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowChat(false)}
                      size={25}
                    />
                  )}
                  <Avatar
                    radius={'xl'}
                    size={50}
                    // src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
                  >
                    {getUser(data?.users, 'name')[0]?.slice(0, 1).toUpperCase()}
                  </Avatar>
                  <Title order={4}>{getUser(data?.users, name)}</Title>
                </Group>
              </Group>
            </Header>
            <Messages messages={messages} />
            <SendMessage id={id} />
          </Stack>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default Chat;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  const user = await prisma?.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  return {
    props: {
      name: user?.username,
    },
  };
}
