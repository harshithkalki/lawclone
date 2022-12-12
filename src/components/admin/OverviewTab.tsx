import {
  Center,
  Container,
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Text,
} from '@mantine/core';
import {
  IconBrandGoogleAnalytics,
  IconGavel,
  IconLock,
  IconUser,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons';
import { Graph } from '../Graph';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

const icons = {
  revenue: IconBrandGoogleAnalytics,
  lawyers: IconGavel,
  transactions: IconLock,
  users: IconUser,
};

export type IconsType = keyof typeof icons;

export interface StatsGridProps {
  data: {
    title: string;
    icon: IconsType;
    value: string;
    diff: number;
  }[];
}

export default function OverviewTab({ data }: StatsGridProps) {
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p='md' radius='md' key={stat.title}>
        <Group position='apart'>
          <Text size='xs' color='dimmed' className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size={22} stroke={1.5} />
        </Group>

        <Group align='flex-end' spacing='xs' mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            color={stat.diff > 0 ? 'teal' : 'red'}
            size='sm'
            weight={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size={16} stroke={1.5} />
          </Text>
        </Group>

        <Text size='xs' color='dimmed' mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <>
      <div className={classes.root}>
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'xs', cols: 1 },
          ]}
        >
          {stats}
        </SimpleGrid>
      </div>
      <SimpleGrid
        cols={2}
        breakpoints={[
          { maxWidth: 'md', cols: 1 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        <Container w={'100%'} mt={'xl'}>
          <Graph data={usersGdata} color={'#e1eb34'} />
          <Center>
            <Text color='dimmed' size='md' transform='uppercase' weight={700}>
              New Users
            </Text>
          </Center>
        </Container>

        <Container w={'100%'} mt={'xl'}>
          <Graph data={lawyersGdata} color={'#03fcf8'} />
          <Center>
            <Text color='dimmed' size='md' transform='uppercase' weight={700}>
              New Lawyers
            </Text>
          </Center>
        </Container>

        <Container w={'100%'} mt={'xl'}>
          <Graph data={transactionsGdata} color={'#eb8334'} />
          <Center>
            <Text color='dimmed' size='md' transform='uppercase' weight={700}>
              Transaction
            </Text>
          </Center>
        </Container>

        <Container w={'100%'} mt={'xl'}>
          <Graph data={RevenueGdata} color={'#34eb8f'} />
          <Center>
            <Text color='dimmed' size='md' transform='uppercase' weight={700}>
              Revenue
            </Text>
          </Center>
        </Container>
      </SimpleGrid>
    </>
  );
}
// interface mockData {
//   data: number;
//   dates: string;
// }

//mock datasets for graphs
const usersGdata = [
  { data: 74, dates: '2021-12-31T16:08:49Z' },
  { data: 82, dates: '2022-05-27T10:03:24Z' },
  { data: 56, dates: '2022-02-14T01:10:06Z' },
  { data: 51, dates: '2022-11-08T00:45:21Z' },
  { data: 70, dates: '2022-03-25T13:59:37Z' },
  { data: 13, dates: '2022-05-25T05:00:07Z' },
  { data: 32, dates: '2022-02-24T18:28:55Z' },
  { data: 85, dates: '2022-04-03T12:08:06Z' },
  { data: 89, dates: '2022-04-12T12:16:37Z' },
  { data: 81, dates: '2022-03-26T09:42:29Z' },
  { data: 48, dates: '2022-09-22T16:59:29Z' },
  { data: 84, dates: '2022-12-07T20:03:34Z' },
  { data: 12, dates: '2022-10-14T11:58:33Z' },
  { data: 21, dates: '2022-10-08T11:15:54Z' },
  { data: 60, dates: '2022-07-29T03:03:29Z' },
  { data: 36, dates: '2022-03-19T14:31:46Z' },
  { data: 82, dates: '2022-06-13T19:55:08Z' },
  { data: 57, dates: '2022-10-08T03:26:29Z' },
  { data: 5, dates: '2022-05-14T11:55:02Z' },
  { data: 5, dates: '2022-07-06T05:08:16Z' },
  { data: 84, dates: '2022-09-25T03:57:55Z' },
  { data: 78, dates: '2022-07-02T11:45:46Z' },
  { data: 13, dates: '2022-02-25T06:40:37Z' },
  { data: 73, dates: '2022-02-18T09:37:18Z' },
  { data: 62, dates: '2022-01-27T00:23:00Z' },
  { data: 15, dates: '2022-01-21T22:48:18Z' },
  { data: 80, dates: '2022-02-27T19:10:54Z' },
  { data: 67, dates: '2022-10-19T01:15:10Z' },
  { data: 7, dates: '2022-04-02T16:44:50Z' },
  { data: 8, dates: '2022-11-16T22:29:27Z' },
  { data: 81, dates: '2022-03-26T03:24:23Z' },
  { data: 52, dates: '2022-09-15T05:35:59Z' },
  { data: 21, dates: '2022-09-13T16:01:07Z' },
  { data: 96, dates: '2021-12-14T04:46:51Z' },
  { data: 20, dates: '2021-12-20T12:13:53Z' },
  { data: 11, dates: '2022-07-01T08:42:15Z' },
  { data: 83, dates: '2022-02-19T13:11:13Z' },
  { data: 58, dates: '2022-11-01T11:23:26Z' },
  { data: 91, dates: '2022-09-13T12:02:59Z' },
  { data: 48, dates: '2022-02-23T23:42:49Z' },
  { data: 65, dates: '2021-12-19T13:53:02Z' },
  { data: 65, dates: '2022-02-08T08:08:00Z' },
  { data: 28, dates: '2022-08-22T11:32:25Z' },
  { data: 81, dates: '2022-05-11T19:10:13Z' },
  { data: 43, dates: '2022-09-16T12:37:15Z' },
  { data: 24, dates: '2022-05-17T08:47:04Z' },
  { data: 37, dates: '2022-07-06T12:01:29Z' },
  { data: 23, dates: '2022-08-08T14:13:40Z' },
  { data: 61, dates: '2022-07-27T15:49:30Z' },
  { data: 77, dates: '2022-05-29T16:45:23Z' },
  { data: 97, dates: '2022-05-09T20:14:28Z' },
  { data: 25, dates: '2022-07-06T19:53:06Z' },
  { data: 88, dates: '2022-09-29T04:23:16Z' },
  { data: 49, dates: '2022-05-06T09:27:09Z' },
  { data: 88, dates: '2022-04-18T12:58:00Z' },
  { data: 56, dates: '2022-01-13T08:52:39Z' },
  { data: 28, dates: '2022-09-21T03:45:20Z' },
  { data: 57, dates: '2022-07-23T19:57:17Z' },
  { data: 76, dates: '2022-05-28T19:28:09Z' },
  { data: 50, dates: '2022-08-18T09:35:57Z' },
  { data: 72, dates: '2022-06-08T04:00:19Z' },
  { data: 66, dates: '2022-07-13T21:10:17Z' },
  { data: 90, dates: '2021-12-29T11:00:06Z' },
  { data: 74, dates: '2022-12-10T00:44:50Z' },
  { data: 92, dates: '2022-05-08T15:45:09Z' },
  { data: 53, dates: '2021-12-13T18:11:01Z' },
  { data: 22, dates: '2021-12-30T22:25:05Z' },
  { data: 59, dates: '2022-05-11T03:23:08Z' },
  { data: 17, dates: '2022-01-16T17:41:52Z' },
  { data: 74, dates: '2022-07-13T00:57:32Z' },
  { data: 52, dates: '2022-01-25T03:12:08Z' },
  { data: 67, dates: '2022-12-11T08:46:51Z' },
  { data: 7, dates: '2022-09-17T17:12:34Z' },
  { data: 28, dates: '2022-09-15T16:57:42Z' },
  { data: 14, dates: '2021-12-12T15:05:11Z' },
  { data: 90, dates: '2022-11-08T08:15:39Z' },
  { data: 21, dates: '2022-10-23T17:12:40Z' },
  { data: 71, dates: '2022-03-01T11:23:33Z' },
  { data: 91, dates: '2022-11-27T19:47:19Z' },
  { data: 74, dates: '2022-06-22T22:36:08Z' },
  { data: 98, dates: '2022-02-04T15:08:13Z' },
  { data: 80, dates: '2022-04-08T22:11:24Z' },
  { data: 26, dates: '2022-10-24T22:33:46Z' },
  { data: 62, dates: '2022-02-18T21:24:09Z' },
  { data: 65, dates: '2022-12-03T04:46:47Z' },
  { data: 81, dates: '2022-02-12T07:08:03Z' },
  { data: 11, dates: '2021-12-16T16:15:25Z' },
  { data: 30, dates: '2022-01-07T18:44:22Z' },
  { data: 72, dates: '2022-06-22T18:31:38Z' },
  { data: 89, dates: '2022-04-08T17:23:23Z' },
  { data: 17, dates: '2022-04-01T00:01:50Z' },
  { data: 95, dates: '2022-11-02T15:15:50Z' },
  { data: 39, dates: '2022-06-17T22:02:51Z' },
  { data: 61, dates: '2022-10-16T10:14:15Z' },
  { data: 46, dates: '2022-10-17T11:46:25Z' },
  { data: 82, dates: '2022-08-20T04:51:04Z' },
  { data: 66, dates: '2022-09-09T10:29:07Z' },
  { data: 17, dates: '2022-10-24T06:59:54Z' },
  { data: 53, dates: '2021-12-18T20:03:15Z' },
  { data: 6, dates: '2022-08-12T06:38:20Z' },
];

const lawyersGdata = [
  { data: 5, dates: '2022-10-24T02:27:10Z' },
  { data: 1, dates: '2022-01-02T12:38:13Z' },
  { data: 13, dates: '2022-08-19T15:42:07Z' },
  { data: 18, dates: '2022-07-17T07:42:51Z' },
  { data: 9, dates: '2022-10-12T22:06:01Z' },
  { data: 20, dates: '2022-01-26T13:45:43Z' },
  { data: 14, dates: '2022-05-19T08:59:10Z' },
  { data: 20, dates: '2022-08-24T05:35:43Z' },
  { data: 4, dates: '2022-03-25T19:38:39Z' },
  { data: 18, dates: '2022-11-07T16:44:37Z' },
  { data: 12, dates: '2022-09-03T12:45:13Z' },
  { data: 5, dates: '2022-02-15T10:55:45Z' },
  { data: 5, dates: '2021-12-24T10:04:47Z' },
  { data: 16, dates: '2022-06-03T15:43:00Z' },
  { data: 10, dates: '2022-08-09T10:15:23Z' },
  { data: 10, dates: '2022-12-03T23:57:19Z' },
  { data: 19, dates: '2022-08-21T19:39:29Z' },
  { data: 19, dates: '2022-04-06T02:05:11Z' },
  { data: 9, dates: '2022-04-03T07:55:57Z' },
  { data: 11, dates: '2022-01-25T14:14:23Z' },
  { data: 4, dates: '2022-02-04T19:13:40Z' },
  { data: 18, dates: '2022-01-23T17:00:35Z' },
  { data: 16, dates: '2022-03-03T21:17:03Z' },
  { data: 15, dates: '2022-04-08T03:59:57Z' },
  { data: 5, dates: '2022-01-16T19:21:45Z' },
  { data: 11, dates: '2022-02-25T15:11:14Z' },
  { data: 16, dates: '2022-06-17T22:42:04Z' },
  { data: 4, dates: '2022-08-31T21:45:32Z' },
  { data: 7, dates: '2022-08-23T20:10:31Z' },
  { data: 18, dates: '2022-09-18T16:34:42Z' },
  { data: 13, dates: '2022-01-09T01:51:22Z' },
  { data: 17, dates: '2022-12-04T00:32:45Z' },
  { data: 2, dates: '2022-01-28T07:06:19Z' },
  { data: 15, dates: '2022-09-04T01:20:44Z' },
  { data: 7, dates: '2021-12-23T03:52:19Z' },
  { data: 12, dates: '2022-04-19T18:33:53Z' },
  { data: 6, dates: '2021-12-20T21:34:25Z' },
  { data: 9, dates: '2022-10-20T08:54:29Z' },
  { data: 18, dates: '2022-06-06T10:52:24Z' },
  { data: 1, dates: '2022-01-20T17:32:02Z' },
  { data: 12, dates: '2022-02-24T19:54:04Z' },
  { data: 9, dates: '2022-02-01T13:30:32Z' },
  { data: 12, dates: '2022-10-13T01:11:26Z' },
  { data: 10, dates: '2022-06-08T01:26:18Z' },
  { data: 17, dates: '2022-05-22T15:41:35Z' },
  { data: 7, dates: '2022-07-31T10:54:39Z' },
  { data: 13, dates: '2022-10-24T05:21:56Z' },
  { data: 2, dates: '2022-05-13T03:35:28Z' },
  { data: 13, dates: '2022-03-27T17:36:29Z' },
  { data: 12, dates: '2022-12-06T10:32:07Z' },
  { data: 20, dates: '2021-12-24T21:07:54Z' },
  { data: 17, dates: '2022-10-09T01:07:04Z' },
  { data: 20, dates: '2022-01-14T21:46:59Z' },
  { data: 1, dates: '2021-12-30T17:21:12Z' },
  { data: 9, dates: '2022-05-24T23:56:33Z' },
  { data: 17, dates: '2022-03-15T06:47:45Z' },
  { data: 12, dates: '2022-11-21T15:38:57Z' },
  { data: 20, dates: '2022-06-06T22:45:37Z' },
  { data: 10, dates: '2022-10-24T18:45:34Z' },
  { data: 13, dates: '2022-01-21T21:12:20Z' },
  { data: 7, dates: '2022-05-02T08:08:13Z' },
  { data: 6, dates: '2021-12-21T00:30:54Z' },
  { data: 5, dates: '2022-01-07T02:40:12Z' },
  { data: 14, dates: '2022-08-03T23:27:17Z' },
  { data: 14, dates: '2022-03-16T18:21:34Z' },
  { data: 4, dates: '2022-02-25T20:41:45Z' },
  { data: 1, dates: '2022-11-21T06:08:22Z' },
  { data: 3, dates: '2021-12-28T06:43:55Z' },
  { data: 10, dates: '2022-08-01T05:04:06Z' },
  { data: 5, dates: '2022-10-27T01:12:06Z' },
  { data: 3, dates: '2022-09-12T00:04:53Z' },
  { data: 20, dates: '2022-01-05T09:56:58Z' },
  { data: 20, dates: '2022-03-07T10:46:57Z' },
  { data: 14, dates: '2022-10-18T12:47:07Z' },
  { data: 1, dates: '2022-10-12T22:45:19Z' },
  { data: 14, dates: '2022-06-08T03:25:41Z' },
  { data: 1, dates: '2022-07-04T16:08:38Z' },
  { data: 16, dates: '2022-03-14T08:41:33Z' },
  { data: 10, dates: '2022-09-21T13:36:40Z' },
  { data: 20, dates: '2022-10-20T14:47:42Z' },
  { data: 7, dates: '2022-01-08T01:24:31Z' },
  { data: 5, dates: '2022-04-21T13:11:23Z' },
  { data: 15, dates: '2022-08-16T02:29:13Z' },
  { data: 3, dates: '2022-11-28T14:10:29Z' },
  { data: 6, dates: '2022-02-21T05:53:57Z' },
  { data: 14, dates: '2022-05-14T03:14:45Z' },
  { data: 10, dates: '2021-12-31T14:25:53Z' },
  { data: 10, dates: '2021-12-24T00:18:21Z' },
  { data: 9, dates: '2022-02-28T01:16:25Z' },
  { data: 11, dates: '2022-06-02T14:08:15Z' },
  { data: 16, dates: '2022-03-18T16:58:24Z' },
  { data: 16, dates: '2022-04-13T07:14:21Z' },
  { data: 14, dates: '2022-07-28T01:18:00Z' },
  { data: 4, dates: '2022-09-10T01:05:37Z' },
  { data: 1, dates: '2022-03-25T17:47:11Z' },
  { data: 5, dates: '2022-08-06T09:12:05Z' },
  { data: 15, dates: '2022-05-24T09:22:01Z' },
  { data: 5, dates: '2022-02-03T02:48:47Z' },
  { data: 9, dates: '2022-05-23T18:21:25Z' },
  { data: 2, dates: '2022-03-14T22:32:13Z' },
];

const transactionsGdata = [
  { data: 86.69, dates: '2022-10-08T19:30:02Z' },
  { data: 141.88, dates: '2022-02-14T04:07:38Z' },
  { data: 172.37, dates: '2022-07-02T18:37:50Z' },
  { data: 103.08, dates: '2022-04-28T21:21:57Z' },
  { data: 11.97, dates: '2022-11-18T23:21:33Z' },
  { data: 195.35, dates: '2022-03-16T05:14:34Z' },
  { data: 78.04, dates: '2022-08-28T13:51:02Z' },
  { data: 196.04, dates: '2022-03-01T13:27:56Z' },
  { data: 57.6, dates: '2022-08-13T20:07:24Z' },
  { data: 160.6, dates: '2022-08-01T21:13:21Z' },
  { data: 156.82, dates: '2022-09-21T04:00:32Z' },
  { data: 57.27, dates: '2022-08-18T00:05:17Z' },
  { data: 14.65, dates: '2022-08-13T20:56:00Z' },
  { data: 66.44, dates: '2022-01-18T16:40:47Z' },
  { data: 52.74, dates: '2022-01-22T19:24:18Z' },
  { data: 27.73, dates: '2022-07-15T07:13:49Z' },
  { data: 61.14, dates: '2022-03-01T16:20:31Z' },
  { data: 115.97, dates: '2022-10-28T19:08:04Z' },
  { data: 33.54, dates: '2022-12-08T01:09:02Z' },
  { data: 37.95, dates: '2022-08-27T23:23:10Z' },
  { data: 103.08, dates: '2022-09-19T02:34:41Z' },
  { data: 28.39, dates: '2022-01-17T01:08:51Z' },
  { data: 108.54, dates: '2022-04-07T22:20:00Z' },
  { data: 140.22, dates: '2022-12-04T20:39:52Z' },
  { data: 22.39, dates: '2022-02-27T02:18:25Z' },
  { data: 24.17, dates: '2022-06-05T21:12:54Z' },
  { data: 76.33, dates: '2022-03-10T19:16:30Z' },
  { data: 32.95, dates: '2022-06-04T22:47:39Z' },
  { data: 180.9, dates: '2022-11-01T17:08:56Z' },
  { data: 178.34, dates: '2022-05-18T00:30:07Z' },
  { data: 12.74, dates: '2022-11-20T06:58:45Z' },
  { data: 145.7, dates: '2022-09-13T19:48:43Z' },
  { data: 29.28, dates: '2022-09-02T13:46:31Z' },
  { data: 36.16, dates: '2022-10-06T23:47:21Z' },
  { data: 23.81, dates: '2022-05-04T09:45:32Z' },
  { data: 49.01, dates: '2022-07-06T07:23:37Z' },
  { data: 23.31, dates: '2022-02-28T20:43:12Z' },
  { data: 91.12, dates: '2022-02-27T02:38:28Z' },
  { data: 11.22, dates: '2022-07-06T19:08:57Z' },
  { data: 47.39, dates: '2022-02-22T04:30:51Z' },
  { data: 162.28, dates: '2022-01-27T11:58:39Z' },
  { data: 141.08, dates: '2021-12-26T12:36:25Z' },
  { data: 196.06, dates: '2022-03-03T09:38:14Z' },
  { data: 138.05, dates: '2022-10-24T01:24:19Z' },
  { data: 58.23, dates: '2022-03-05T00:13:51Z' },
  { data: 72.07, dates: '2022-09-17T17:08:17Z' },
  { data: 138.94, dates: '2022-01-07T04:52:06Z' },
  { data: 149.73, dates: '2022-05-27T16:41:52Z' },
  { data: 185.25, dates: '2022-07-27T08:19:12Z' },
  { data: 74.76, dates: '2022-01-19T03:52:35Z' },
  { data: 85.19, dates: '2022-09-21T12:24:52Z' },
  { data: 105.61, dates: '2022-09-01T09:36:25Z' },
  { data: 26.52, dates: '2022-01-09T14:45:09Z' },
  { data: 101.42, dates: '2022-03-02T02:07:52Z' },
  { data: 68.22, dates: '2022-07-10T17:48:14Z' },
  { data: 156.18, dates: '2022-02-06T01:31:09Z' },
  { data: 128.67, dates: '2022-02-19T20:00:07Z' },
  { data: 145.76, dates: '2022-05-19T07:46:18Z' },
  { data: 30.83, dates: '2022-10-12T09:46:37Z' },
  { data: 55.46, dates: '2022-08-06T05:09:26Z' },
  { data: 121.57, dates: '2022-06-16T12:38:39Z' },
  { data: 17.89, dates: '2022-02-28T07:37:13Z' },
  { data: 130.95, dates: '2022-07-15T14:56:20Z' },
  { data: 98.85, dates: '2022-09-16T23:09:13Z' },
  { data: 79.01, dates: '2022-09-24T01:11:37Z' },
  { data: 45.59, dates: '2022-06-07T16:33:43Z' },
  { data: 182.21, dates: '2022-02-05T04:08:54Z' },
  { data: 151.75, dates: '2022-11-15T01:29:51Z' },
  { data: 40.54, dates: '2022-11-14T03:45:56Z' },
  { data: 186.2, dates: '2022-01-20T07:37:18Z' },
  { data: 23.74, dates: '2022-11-04T07:43:58Z' },
  { data: 127.85, dates: '2022-07-21T20:06:54Z' },
  { data: 48.63, dates: '2022-11-22T03:57:45Z' },
  { data: 29.49, dates: '2022-04-02T19:41:54Z' },
  { data: 97.8, dates: '2022-03-19T04:03:13Z' },
  { data: 101.68, dates: '2022-01-13T04:09:49Z' },
  { data: 23.15, dates: '2022-08-30T23:55:50Z' },
  { data: 161.6, dates: '2022-05-31T10:47:07Z' },
  { data: 68.78, dates: '2021-12-24T23:38:51Z' },
  { data: 185.04, dates: '2022-04-03T00:04:07Z' },
  { data: 89.29, dates: '2022-04-27T06:16:32Z' },
  { data: 156.4, dates: '2022-04-11T06:32:58Z' },
  { data: 124.01, dates: '2022-10-17T07:23:52Z' },
  { data: 15.87, dates: '2022-10-26T09:17:49Z' },
  { data: 181.09, dates: '2022-06-22T00:09:57Z' },
  { data: 36.07, dates: '2022-02-27T00:06:47Z' },
  { data: 62.72, dates: '2022-03-09T21:09:03Z' },
  { data: 89.18, dates: '2021-12-15T05:50:31Z' },
  { data: 71.0, dates: '2021-12-17T22:43:25Z' },
  { data: 101.19, dates: '2022-03-25T06:20:42Z' },
  { data: 186.36, dates: '2022-10-16T23:36:31Z' },
  { data: 10.73, dates: '2022-08-02T03:08:21Z' },
  { data: 151.66, dates: '2022-02-03T01:15:48Z' },
  { data: 172.22, dates: '2022-01-21T17:13:18Z' },
  { data: 99.57, dates: '2022-11-06T01:50:20Z' },
  { data: 21.1, dates: '2022-05-30T05:45:30Z' },
  { data: 153.03, dates: '2022-11-07T05:54:18Z' },
  { data: 163.08, dates: '2022-01-04T15:45:45Z' },
  { data: 161.02, dates: '2022-03-07T23:48:39Z' },
  { data: 73.67, dates: '2021-12-17T23:37:13Z' },
];

const RevenueGdata = [
  { data: 4392.69, dates: '2022-03-29T20:18:47Z' },
  { data: 4854.71, dates: '2022-03-04T13:37:38Z' },
  { data: 4014.1, dates: '2022-06-01T09:44:54Z' },
  { data: 672.64, dates: '2022-07-02T19:17:27Z' },
  { data: 3639.08, dates: '2022-09-19T22:08:41Z' },
  { data: 1645.37, dates: '2022-03-15T11:40:07Z' },
  { data: 1560.48, dates: '2022-06-30T01:30:44Z' },
  { data: 1470.45, dates: '2022-05-27T12:58:29Z' },
  { data: 373.69, dates: '2022-05-25T23:49:53Z' },
  { data: 4155.81, dates: '2022-05-30T16:56:57Z' },
  { data: 3909.73, dates: '2022-10-02T11:16:58Z' },
  { data: 1948.82, dates: '2022-09-02T23:09:40Z' },
  { data: 2082.9, dates: '2022-04-16T23:15:57Z' },
  { data: 2262.21, dates: '2021-12-29T15:52:39Z' },
  { data: 4020.98, dates: '2022-05-03T07:19:45Z' },
  { data: 4597.48, dates: '2022-04-06T15:14:05Z' },
  { data: 3384.95, dates: '2022-08-16T21:52:06Z' },
  { data: 3611.61, dates: '2022-06-21T12:19:09Z' },
  { data: 430.12, dates: '2022-07-23T15:37:48Z' },
  { data: 1722.23, dates: '2022-09-29T14:54:14Z' },
  { data: 2836.52, dates: '2022-08-24T03:15:34Z' },
  { data: 894.95, dates: '2022-07-23T17:33:46Z' },
  { data: 1812.47, dates: '2022-06-21T18:17:01Z' },
  { data: 2459.34, dates: '2022-10-18T15:02:31Z' },
  { data: 819.84, dates: '2022-11-19T15:23:26Z' },
  { data: 4675.57, dates: '2022-09-29T18:01:55Z' },
  { data: 4449.11, dates: '2022-11-14T12:22:26Z' },
  { data: 560.98, dates: '2022-03-08T19:47:34Z' },
  { data: 2642.29, dates: '2022-11-27T16:26:43Z' },
  { data: 4323.07, dates: '2022-05-12T06:06:02Z' },
  { data: 1619.87, dates: '2021-12-21T16:47:53Z' },
  { data: 4459.34, dates: '2022-02-07T15:45:36Z' },
  { data: 359.49, dates: '2022-07-23T06:14:38Z' },
  { data: 1533.8, dates: '2022-09-02T06:13:50Z' },
  { data: 1365.54, dates: '2022-02-05T02:03:16Z' },
  { data: 3289.75, dates: '2022-09-26T01:57:44Z' },
  { data: 3941.62, dates: '2022-03-03T16:38:38Z' },
  { data: 1112.75, dates: '2022-01-10T14:26:21Z' },
  { data: 4024.73, dates: '2022-08-28T21:33:04Z' },
  { data: 4438.47, dates: '2022-10-03T12:17:20Z' },
  { data: 4178.06, dates: '2022-07-15T11:48:23Z' },
  { data: 3921.79, dates: '2022-02-03T10:32:34Z' },
  { data: 2179.12, dates: '2022-01-26T12:51:02Z' },
  { data: 296.22, dates: '2022-05-22T20:48:19Z' },
  { data: 1897.58, dates: '2021-12-31T17:10:40Z' },
  { data: 1622.76, dates: '2022-02-02T16:02:31Z' },
  { data: 2555.34, dates: '2021-12-27T21:15:41Z' },
  { data: 2977.23, dates: '2022-01-11T15:50:27Z' },
  { data: 2722.28, dates: '2022-08-16T15:10:22Z' },
  { data: 1972.39, dates: '2022-04-30T06:28:18Z' },
  { data: 3453.05, dates: '2022-01-03T04:15:19Z' },
  { data: 2382.84, dates: '2022-05-23T13:42:12Z' },
  { data: 1066.46, dates: '2022-05-16T15:36:04Z' },
  { data: 2655.05, dates: '2022-01-24T14:03:11Z' },
  { data: 2099.41, dates: '2022-08-07T07:20:12Z' },
  { data: 2421.4, dates: '2022-11-07T17:25:44Z' },
  { data: 2620.76, dates: '2022-06-05T03:08:46Z' },
  { data: 4286.09, dates: '2021-12-15T16:45:36Z' },
  { data: 720.92, dates: '2022-09-19T18:27:42Z' },
  { data: 3705.62, dates: '2022-01-02T14:28:51Z' },
  { data: 4911.12, dates: '2022-04-05T16:05:44Z' },
  { data: 4321.06, dates: '2022-08-21T05:54:11Z' },
  { data: 4748.53, dates: '2022-05-05T11:47:59Z' },
  { data: 2334.69, dates: '2022-10-15T22:10:54Z' },
  { data: 4545.73, dates: '2022-03-15T16:30:22Z' },
  { data: 2834.23, dates: '2022-06-23T02:23:44Z' },
  { data: 2589.46, dates: '2022-05-26T19:54:01Z' },
  { data: 754.26, dates: '2022-02-20T04:47:22Z' },
  { data: 4525.11, dates: '2022-02-08T11:17:26Z' },
  { data: 4738.17, dates: '2022-03-17T12:36:02Z' },
  { data: 2380.15, dates: '2022-05-04T16:13:12Z' },
  { data: 152.19, dates: '2022-11-10T03:22:58Z' },
  { data: 1885.93, dates: '2022-05-01T20:34:36Z' },
  { data: 4110.09, dates: '2022-05-02T12:41:53Z' },
  { data: 2659.29, dates: '2022-10-25T12:44:35Z' },
  { data: 2400.51, dates: '2022-02-20T21:36:51Z' },
  { data: 1075.05, dates: '2022-09-22T17:01:17Z' },
  { data: 4777.79, dates: '2022-07-15T11:23:28Z' },
  { data: 3406.64, dates: '2022-10-06T05:14:38Z' },
  { data: 3504.28, dates: '2022-06-22T19:12:28Z' },
  { data: 1923.2, dates: '2022-07-21T18:54:53Z' },
  { data: 4374.92, dates: '2022-06-19T16:26:43Z' },
  { data: 1456.46, dates: '2022-02-28T11:25:39Z' },
  { data: 4684.69, dates: '2022-06-22T00:10:18Z' },
  { data: 2576.94, dates: '2022-04-08T10:44:22Z' },
  { data: 3050.21, dates: '2022-06-27T03:34:27Z' },
  { data: 4825.49, dates: '2022-06-18T16:25:49Z' },
  { data: 222.37, dates: '2022-12-11T18:45:46Z' },
  { data: 3445.67, dates: '2022-10-09T12:30:35Z' },
  { data: 482.09, dates: '2022-10-20T09:17:56Z' },
  { data: 3380.87, dates: '2022-04-14T00:47:02Z' },
  { data: 3191.7, dates: '2022-08-28T17:32:16Z' },
  { data: 3467.14, dates: '2022-07-03T08:35:43Z' },
  { data: 4220.2, dates: '2022-11-21T08:59:51Z' },
  { data: 2515.69, dates: '2021-12-16T04:08:06Z' },
  { data: 4183.1, dates: '2022-01-03T22:12:41Z' },
  { data: 1035.62, dates: '2022-04-05T08:45:11Z' },
  { data: 2253.46, dates: '2022-07-11T18:30:48Z' },
  { data: 1867.51, dates: '2022-06-03T06:51:50Z' },
  { data: 3151.88, dates: '2022-07-17T21:40:19Z' },
];
