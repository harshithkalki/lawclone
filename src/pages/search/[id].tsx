import {
  Checkbox,
  Container,
  createStyles,
  Divider,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Title,
  Text,
  Image,
  MediaQuery,
  Drawer,
  Button,
} from '@mantine/core';
import { Lawyer } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  hiddenDesktop: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  lawyersContainer: {
    padding: theme.spacing.lg,
    [theme.fn.smallerThan('md')]: {
      padding: theme.spacing.xs,
    },
  },
  lawyersInfoBox: {
    width: '100%',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],

    borderRadius: theme.radius.lg,
    ':hover': {
      cursor: 'pointer',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
    padding: theme.spacing.lg,
    [theme.fn.smallerThan('md')]: {
      padding: theme.spacing.md,
      gap: theme.spacing.xs,
    },
  },
  text: {
    gap: theme.spacing.md,
    [theme.fn.smallerThan('md')]: {
      fontSize: theme.fontSizes.xs,
      gap: 3,
    },
  },
}));

const Filter = () => {
  return (
    <Container h='100%'>
      <Title order={3}>Filters</Title>
      <Divider mt='md' mb='md' />
      <div>
        <Title order={5}>Location</Title>
        <ScrollArea style={{ height: 200 }} scrollbarSize={5}>
          <Stack mt='md' spacing={'xs'}>
            <Checkbox label='France' />
            <Checkbox label='German' />
            <Checkbox label='England' />
            <Checkbox label='England' />
            <Checkbox label='England' />
            <Checkbox label='England' />
          </Stack>
        </ScrollArea>
      </div>
      <Divider mt='md' mb='md' />
      <div>
        <Title order={5}>Language</Title>
        <ScrollArea style={{ height: 200 }} scrollbarSize={5}>
          <Stack mt='md' spacing={'xs'}>
            <Checkbox label='France' />
            <Checkbox label='German' />
            <Checkbox label='England' />
            <Checkbox label='England' />
            <Checkbox label='England' />
            <Checkbox label='England' />
          </Stack>
        </ScrollArea>
      </div>
    </Container>
  );
};

export default function SearchResult({ lawyers }: { lawyers: any }) {
  const { classes, theme } = useStyles();
  const [openFilter, setOpenFilter] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  console.log(lawyers);
  console.log(id);

  const filteredLawyers = lawyers.filter(
    (lawyer: any) =>
      lawyer.fullName
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes((id as string)?.toLowerCase().replace(/\s+/g, '')) ||
      lawyer.expertise
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes((id as string)?.toLowerCase().replace(/\s+/g, ''))
  );

  return (
    <>
      <Grid columns={8} h='100%'>
        <Grid.Col span={2} h='100%' className={classes.hiddenDesktop}>
          <Filter />
        </Grid.Col>
        <Grid.Col lg={6} md={6} sm={8} h='100%'>
          <Group style={{ justifyContent: 'space-between' }}>
            <Title order={3}>Search Result</Title>
            <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
              <Button
                onClick={() => setOpenFilter((prev) => !prev)}
                radius='xl'
                variant='outline'
              >
                Filter
              </Button>
            </MediaQuery>
          </Group>
          <Divider mt='md' mb='md' />
          <ScrollArea>
            <Stack className={classes.lawyersContainer}>
              {filteredLawyers.map((lawyer: any, index: number) => (
                <Group
                  onClick={() => {
                    router.push(`/lawyer/${lawyer.lawyerId}`);
                  }}
                  className={classes.lawyersInfoBox}
                  key={index}
                >
                  <Image
                    src='/avatar.png'
                    alt='avatar'
                    styles={{
                      image: {
                        maxWidth: 80,
                        borderRadius: '50%',
                        [theme.fn.smallerThan('md')]: {
                          maxWidth: 50,
                        },
                      },
                    }}
                    style={{ width: 'auto' }}
                  />
                  <div>
                    <Title order={4}>{lawyer.fullName}</Title>
                    <Title order={5}>{lawyer.expertise}</Title>
                    <Group className={classes.text}>
                      <Text>Localtion: {lawyer.country}</Text>|
                      <Text>Language: {lawyer.language}</Text> |
                      <Text>hr/{lawyer.price}$</Text>
                    </Group>
                  </div>
                </Group>
              ))}
            </Stack>
          </ScrollArea>
        </Grid.Col>
      </Grid>
      <Drawer
        opened={openFilter}
        onClose={() => setOpenFilter(false)}
        padding='xl'
        size='md'
      >
        <Filter />
      </Drawer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const lawyers1 = await prisma?.lawyer.findMany();
  const users = await prisma?.user.findMany({
    where: {
      role: 'LAWYER',
    },
  });
  const lawyers = lawyers1?.map((l) => {
    const c = users?.find((g) => g.id === l.lawyerId);
    return {
      ...l,
      fullName: c?.firstName + ' ' + c?.lastName,
      username: c?.username,
    };
  });

  return {
    props: { lawyers },
  };
};
