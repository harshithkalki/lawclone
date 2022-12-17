import {
  Flex,
  Group,
  Button,
  Divider,
  Stack,
  Grid,
  Table,
  TextInput,
  Avatar,
  Title,
} from '@mantine/core';
import { Image, Text, Rating } from '@mantine/core';
import { Lawyer, Reviews } from '@prisma/client';
import { IconMapPin, IconSearch, IconUser } from '@tabler/icons';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebaseconfig';
import { GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function Lawyer1({
  lawyer,
  reviews,
  username,
  fullName,
  myName,
}: {
  lawyer: Lawyer | null;
  reviews: Reviews[];
  username: string | undefined;
  fullName: string;
  myName: string | null;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(lawyer, reviews, username, fullName, myName);

  const [snapshot] = useCollection(collection(db, 'chats'));
  const handleClick = async () => {
    if (myName == username) return null;
    if (session?.user) {
      const chats: any = snapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const chat = chats?.filter(
        (data: any) =>
          data.users?.includes(myName) && data.users?.includes(username)
      );
      // const chat: any = [];
      if (chat.length === 0) {
        const c = await addDoc(collection(db, 'chats'), {
          users: [username, myName],
        });
        router.push('/chat');
      }

      chat.map((c: any) => router.push('/chat'));
    } else {
      router.push('/signin');
    }
  };
  return (
    <>
      {lawyer ? (
        <Grid columns={3}>
          <Grid.Col sm={3} md={1} lg={1}>
            <Flex
              direction='column'
              align={'center'}
              mt={'40px'}
              h={'auto'}
              style={{ border: '1px solid gray' }}
            >
              <Image
                alt={'avatar'}
                width={180}
                mt='45px'
                src='/avatar.png'
                style={{ width: 'auto' }}
              />
              <Text fz='lg' fw={700} mt={'sm'}>
                {fullName}
              </Text>
              <Rating value={lawyer.rating as number} mt={'sm'} readOnly />
              <Group
                mt={'sm'}
                w={'90%'}
                style={{ justifyContent: 'space-between' }}
              >
                <Button variant='outline' onClick={handleClick} w={'45%'}>
                  Message
                </Button>
                <Button variant='outline' w={'45%'}>
                  Book me
                </Button>
              </Group>
              <Divider mt={'40px'} color={'gray'} w={'90%'} />
              <Stack mt={'xl'} w={'90%'} mb={'10vh'}>
                <Group w={'100%'} style={{ justifyContent: 'space-between' }}>
                  <Group spacing={4}>
                    <IconMapPin size={'15'} />
                    From
                  </Group>
                  <Text fw={700} fz={'md'}>
                    {lawyer?.country}
                  </Text>
                </Group>

                <Group w={'100%'} style={{ justifyContent: 'space-between' }}>
                  <Group spacing={4}>
                    <IconUser size={'15'} />
                    Member Since
                  </Group>
                  <Text fw={700} fz={'md'}>
                    Nov 2021
                  </Text>
                </Group>
              </Stack>
            </Flex>

            <Flex
              direction='column'
              align={'center'}
              mt={'40px'}
              h={'auto'}
              style={{ border: '1px solid gray' }}
            >
              <Text fw={700} mb={'xl'} mt={'xl'}>
                Description
              </Text>
              <Text w={'90%'} mb={'40px'}>
                {lawyer?.description}
              </Text>
              <Table w={'90%'} mb={'xl'}>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: '700' }}>Educational Institute</td>
                    <td>{lawyer?.institution}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '700' }}>Degree</td>
                    <td>{lawyer?.course}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '700' }}>Service</td>
                    <td>{lawyer?.services}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '700' }}>Expertise</td>
                    <td>{lawyer?.expertise}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '700' }}>Experience</td>
                    <td>{lawyer?.experience} years</td>
                  </tr>
                </tbody>
              </Table>
            </Flex>
          </Grid.Col>
          <Grid.Col lg={2} md={3} sm={3} p='md'>
            <Grid mt='40px' columns={2}>
              <Grid.Col span={1}>
                <TextInput placeholder='Search' rightSection={<IconSearch />} />
              </Grid.Col>
              <Grid.Col span={2}>
                <Divider />
              </Grid.Col>
              {reviews.length === 0 && (
                <Grid.Col>
                  {' '}
                  <Title order={2}>No reviews</Title>{' '}
                </Grid.Col>
              )}

              {reviews.map((review, index) => {
                return (
                  <Grid.Col span={2} key={index}>
                    <Stack>
                      <Group>
                        <Avatar size={'lg'} radius='xl' />
                        <Stack spacing={2}>
                          <Title order={4}>askdh</Title>
                          {/* <Text>Netherland</Text> */}
                        </Stack>
                      </Group>
                      <Stack spacing={'xs'} ml='71px'>
                        <Rating value={review.rating} readOnly />
                        <Text>{review.review}</Text>
                        <Divider />
                      </Stack>
                    </Stack>
                  </Grid.Col>
                );
              })}
            </Grid>
          </Grid.Col>
        </Grid>
      ) : (
        <Title sx={{ textAlign: 'center' }} order={1}>
          invalid id
        </Title>
      )}
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const { id } = ctx.params;
  const session = await getSession(ctx);

  const u = await prisma?.user.findUnique({
    where: {
      id: session ? session?.user?.id : ' ',
    },
  });

  const lawyer = await prisma?.lawyer.findUnique({
    where: {
      lawyerId: id,
    },
  });

  const reviews = await prisma?.reviews.findMany({
    where: {
      lawyerId: id,
    },
  });

  const user = await prisma?.user.findUnique({
    where: {
      id: id,
    },
  });

  return {
    props: {
      lawyer: JSON.parse(JSON.stringify(lawyer)),
      reviews: JSON.parse(JSON.stringify(reviews)),
      username: user?.username ? user.username : ' ',
      fullName: user?.firstName + ' ' + user?.lastName,
      myName: u ? u.username : null,
    },
  };
}
