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

const SearchResult = () => {
  const { classes, theme } = useStyles();
  const [openFilter, setOpenFilter] = useState(false);
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
              {[...Array(10)].map((_, index) => (
                <Group className={classes.lawyersInfoBox} key={index}>
                  <Image
                    src='https://avatars.githubusercontent.com/u/25126261?v=4'
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
                    <Title order={4}>Abhiram</Title>
                    <Title order={5}>Civil Lawyer</Title>
                    <Group className={classes.text}>
                      <Text>Localtion: England</Text>|
                      <Text>Language: English</Text> |<Text>hr/50$</Text>
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
};

export default SearchResult;
