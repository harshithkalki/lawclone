import { Graph } from '@/components/Graph';
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
  IconCoin,
  IconTruckDelivery,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons';

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
  orders: IconTruckDelivery,
  earnings: IconCoin,
};

export interface StatsGridProps {
  data: {
    title: string;
    icon: keyof typeof icons;
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
          <Icon className={classes.icon} size={30} stroke={1.5} />
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
          cols={3}
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
          <Graph data={earningsData} color={'#e1eb34'} />
          <Center>
            <Text color='dimmed' size='md' transform='uppercase' weight={700}>
              EARNINGS
            </Text>
          </Center>
        </Container>
        <Container w={'100%'} mt={'xl'}>
          <Graph data={ordersData} color={'#f54263'} />
          <Center>
            <Text color='dimmed' size='md' transform='uppercase' weight={700}>
              ORDERS
            </Text>
          </Center>
        </Container>
      </SimpleGrid>
    </>
  );
}

const earningsData = [
  { data: 157.06, dates: '2022-07-12T20:56:03Z' },
  { data: 115.93, dates: '2022-05-11T05:16:02Z' },
  { data: 73.62, dates: '2022-08-28T22:15:23Z' },
  { data: 83.73, dates: '2022-04-29T22:55:54Z' },
  { data: 63.78, dates: '2022-03-09T17:45:03Z' },
  { data: 127.34, dates: '2022-04-07T20:35:02Z' },
  { data: 53.12, dates: '2022-07-13T21:57:33Z' },
  { data: 6.4, dates: '2022-04-23T04:21:31Z' },
  { data: 71.89, dates: '2022-07-10T15:20:43Z' },
  { data: 136.21, dates: '2022-02-22T19:37:34Z' },
  { data: 127.58, dates: '2022-05-28T08:45:19Z' },
  { data: 64.42, dates: '2022-11-04T05:05:51Z' },
  { data: 98.57, dates: '2022-06-13T00:34:10Z' },
  { data: 6.84, dates: '2022-11-21T22:17:21Z' },
  { data: 34.86, dates: '2022-11-18T09:08:22Z' },
  { data: 111.64, dates: '2022-06-08T12:42:29Z' },
  { data: 153.2, dates: '2022-10-01T03:24:47Z' },
  { data: 16.54, dates: '2022-04-13T18:59:39Z' },
  { data: 99.8, dates: '2022-03-29T15:36:57Z' },
  { data: 72.29, dates: '2022-04-05T14:46:01Z' },
  { data: 110.33, dates: '2022-07-28T21:40:20Z' },
  { data: 178.02, dates: '2022-11-17T02:55:47Z' },
  { data: 155.75, dates: '2022-11-18T03:02:48Z' },
  { data: 29.16, dates: '2022-04-04T19:13:56Z' },
  { data: 136.43, dates: '2021-12-19T01:45:47Z' },
  { data: 40.8, dates: '2022-12-06T05:18:29Z' },
  { data: 104.26, dates: '2022-06-20T18:25:24Z' },
  { data: 47.95, dates: '2022-05-29T06:06:13Z' },
  { data: 54.04, dates: '2022-08-05T04:37:45Z' },
  { data: 189.59, dates: '2022-10-04T12:37:27Z' },
  { data: 176.58, dates: '2022-11-16T23:02:32Z' },
  { data: 113.53, dates: '2022-03-17T08:21:33Z' },
  { data: 40.5, dates: '2022-06-03T03:27:42Z' },
  { data: 97.66, dates: '2022-11-17T13:01:23Z' },
  { data: 35.2, dates: '2022-10-13T03:06:50Z' },
  { data: 103.57, dates: '2022-01-05T15:03:40Z' },
  { data: 31.25, dates: '2021-12-26T21:32:43Z' },
  { data: 129.09, dates: '2022-01-20T05:07:23Z' },
  { data: 66.31, dates: '2022-11-23T10:56:53Z' },
  { data: 40.98, dates: '2022-02-09T09:19:56Z' },
  { data: 76.2, dates: '2022-04-16T10:25:42Z' },
  { data: 174.92, dates: '2022-03-02T13:51:05Z' },
  { data: 64.6, dates: '2022-05-13T23:26:16Z' },
  { data: 189.41, dates: '2022-09-04T19:49:35Z' },
  { data: 154.72, dates: '2022-09-24T10:33:25Z' },
  { data: 29.67, dates: '2022-04-25T00:01:34Z' },
  { data: 29.29, dates: '2022-08-18T04:38:39Z' },
  { data: 116.5, dates: '2022-11-22T14:22:30Z' },
  { data: 114.8, dates: '2022-09-04T16:35:17Z' },
  { data: 111.16, dates: '2022-04-09T16:24:40Z' },
  { data: 160.68, dates: '2022-08-27T20:41:18Z' },
  { data: 197.0, dates: '2022-08-26T06:15:51Z' },
  { data: 131.41, dates: '2022-01-22T10:31:20Z' },
  { data: 113.22, dates: '2022-07-08T22:00:59Z' },
  { data: 143.19, dates: '2022-04-29T13:28:55Z' },
  { data: 98.0, dates: '2022-12-06T14:54:50Z' },
  { data: 138.45, dates: '2022-09-02T01:27:01Z' },
  { data: 25.69, dates: '2022-08-09T16:46:16Z' },
  { data: 175.46, dates: '2022-11-14T13:46:20Z' },
  { data: 39.75, dates: '2022-03-15T14:19:09Z' },
  { data: 109.18, dates: '2022-08-07T23:25:19Z' },
  { data: 20.24, dates: '2022-09-06T05:05:15Z' },
  { data: 192.64, dates: '2022-05-03T06:08:18Z' },
  { data: 128.22, dates: '2022-03-16T11:37:47Z' },
  { data: 137.65, dates: '2022-10-05T09:32:37Z' },
  { data: 163.6, dates: '2022-03-14T00:37:03Z' },
  { data: 30.74, dates: '2022-03-24T21:41:20Z' },
  { data: 52.26, dates: '2022-03-19T02:55:31Z' },
  { data: 65.24, dates: '2022-01-15T20:55:42Z' },
  { data: 141.67, dates: '2022-04-21T21:28:44Z' },
  { data: 133.86, dates: '2022-06-23T07:39:04Z' },
  { data: 65.32, dates: '2022-05-27T08:53:34Z' },
  { data: 41.8, dates: '2022-05-23T08:15:43Z' },
  { data: 144.72, dates: '2022-01-21T22:37:15Z' },
  { data: 147.47, dates: '2022-03-17T16:37:03Z' },
  { data: 124.37, dates: '2022-05-03T13:18:54Z' },
  { data: 121.32, dates: '2022-07-24T05:24:06Z' },
  { data: 121.11, dates: '2022-10-17T07:22:36Z' },
  { data: 40.21, dates: '2022-08-16T05:29:41Z' },
  { data: 87.74, dates: '2022-06-04T14:31:36Z' },
  { data: 172.18, dates: '2022-03-25T17:18:17Z' },
  { data: 13.52, dates: '2022-04-09T21:07:30Z' },
  { data: 115.45, dates: '2021-12-16T01:18:21Z' },
  { data: 130.53, dates: '2022-08-23T09:31:56Z' },
  { data: 54.35, dates: '2022-11-05T10:03:10Z' },
  { data: 123.43, dates: '2022-11-21T03:35:50Z' },
  { data: 45.99, dates: '2022-12-04T16:16:29Z' },
  { data: 6.98, dates: '2022-10-24T12:28:17Z' },
  { data: 141.11, dates: '2022-11-27T08:07:25Z' },
  { data: 127.89, dates: '2022-09-29T22:02:54Z' },
  { data: 118.5, dates: '2022-01-25T18:02:45Z' },
  { data: 48.57, dates: '2022-05-06T16:17:08Z' },
  { data: 95.32, dates: '2021-12-30T16:01:49Z' },
  { data: 186.48, dates: '2022-03-02T09:01:02Z' },
  { data: 95.95, dates: '2022-11-29T09:13:53Z' },
  { data: 94.14, dates: '2022-07-25T04:02:52Z' },
  { data: 138.21, dates: '2022-10-26T20:47:39Z' },
  { data: 186.24, dates: '2022-03-31T08:43:38Z' },
  { data: 23.23, dates: '2022-01-01T01:57:33Z' },
  { data: 47.86, dates: '2022-07-19T07:03:04Z' },
];

const ordersData = [
  { data: 10.06, dates: '2022-08-30T08:40:48Z' },
  { data: 19.86, dates: '2022-09-08T00:22:59Z' },
  { data: 8.29, dates: '2022-07-15T22:33:30Z' },
  { data: 10.4, dates: '2022-11-13T04:33:26Z' },
  { data: 11.77, dates: '2022-02-17T07:27:12Z' },
  { data: 11.65, dates: '2022-04-06T19:50:58Z' },
  { data: 16.7, dates: '2022-02-21T18:23:59Z' },
  { data: 17.69, dates: '2022-10-19T02:43:18Z' },
  { data: 6.84, dates: '2022-04-17T15:47:40Z' },
  { data: 14.17, dates: '2021-12-31T14:54:33Z' },
  { data: 16.78, dates: '2022-03-04T06:32:32Z' },
  { data: 12.88, dates: '2022-11-28T14:24:46Z' },
  { data: 15.77, dates: '2022-06-25T10:54:56Z' },
  { data: 18.18, dates: '2022-03-26T07:00:54Z' },
  { data: 13.77, dates: '2022-11-18T01:46:33Z' },
  { data: 10.47, dates: '2022-02-11T11:56:33Z' },
  { data: 5.51, dates: '2022-01-05T04:46:26Z' },
  { data: 14.13, dates: '2022-02-16T01:26:27Z' },
  { data: 7.56, dates: '2022-08-30T18:47:25Z' },
  { data: 19.54, dates: '2022-03-04T09:29:33Z' },
  { data: 6.79, dates: '2022-10-22T21:16:43Z' },
  { data: 10.56, dates: '2022-08-25T19:43:32Z' },
  { data: 17.4, dates: '2022-11-17T19:24:00Z' },
  { data: 18.63, dates: '2022-10-09T21:03:01Z' },
  { data: 18.24, dates: '2022-01-11T06:27:13Z' },
  { data: 10.68, dates: '2022-04-23T12:04:33Z' },
  { data: 11.78, dates: '2022-02-10T00:01:37Z' },
  { data: 13.73, dates: '2022-03-10T00:05:20Z' },
  { data: 10.67, dates: '2022-03-01T01:19:49Z' },
  { data: 10.11, dates: '2022-02-28T14:21:01Z' },
  { data: 13.95, dates: '2022-04-27T06:09:03Z' },
  { data: 9.6, dates: '2022-10-13T08:12:09Z' },
  { data: 19.82, dates: '2022-02-23T08:35:26Z' },
  { data: 19.13, dates: '2022-01-22T14:05:46Z' },
  { data: 12.0, dates: '2022-08-11T21:57:52Z' },
  { data: 14.74, dates: '2022-01-20T04:03:45Z' },
  { data: 15.43, dates: '2022-05-29T08:48:35Z' },
  { data: 16.77, dates: '2022-06-28T00:02:04Z' },
  { data: 6.14, dates: '2022-02-04T08:46:34Z' },
  { data: 12.43, dates: '2022-04-16T11:46:44Z' },
  { data: 12.4, dates: '2022-02-25T18:58:49Z' },
  { data: 13.23, dates: '2022-04-07T12:31:53Z' },
  { data: 6.41, dates: '2022-10-09T12:26:41Z' },
  { data: 14.2, dates: '2022-03-09T17:21:11Z' },
  { data: 16.0, dates: '2022-10-08T15:06:46Z' },
  { data: 11.18, dates: '2022-09-18T15:44:41Z' },
  { data: 5.06, dates: '2022-07-17T00:17:57Z' },
  { data: 13.23, dates: '2022-01-08T12:56:13Z' },
  { data: 11.3, dates: '2022-04-14T12:45:46Z' },
  { data: 16.72, dates: '2022-10-24T03:01:54Z' },
  { data: 11.78, dates: '2022-05-12T18:22:53Z' },
  { data: 14.55, dates: '2022-04-25T05:53:55Z' },
  { data: 9.93, dates: '2022-04-19T15:08:38Z' },
  { data: 16.73, dates: '2022-09-18T08:20:13Z' },
  { data: 11.88, dates: '2022-04-06T15:13:35Z' },
  { data: 12.95, dates: '2021-12-19T10:38:40Z' },
  { data: 9.85, dates: '2022-09-10T20:40:09Z' },
  { data: 15.1, dates: '2021-12-26T17:31:11Z' },
  { data: 10.11, dates: '2022-10-09T04:37:30Z' },
  { data: 11.96, dates: '2022-07-24T22:04:38Z' },
  { data: 7.29, dates: '2022-05-28T05:30:22Z' },
  { data: 13.38, dates: '2022-05-11T07:57:19Z' },
  { data: 19.49, dates: '2022-07-23T17:16:26Z' },
  { data: 5.95, dates: '2022-11-29T13:02:13Z' },
  { data: 16.02, dates: '2022-01-24T18:48:00Z' },
  { data: 14.57, dates: '2022-07-18T03:04:21Z' },
  { data: 7.83, dates: '2022-08-20T00:45:13Z' },
  { data: 6.45, dates: '2022-10-18T05:01:55Z' },
  { data: 8.55, dates: '2022-04-16T15:22:13Z' },
  { data: 12.23, dates: '2022-10-05T12:35:05Z' },
  { data: 10.64, dates: '2022-07-01T00:08:33Z' },
  { data: 10.74, dates: '2022-08-30T06:27:13Z' },
  { data: 6.61, dates: '2022-07-17T22:02:59Z' },
  { data: 14.9, dates: '2022-02-27T03:32:38Z' },
  { data: 13.67, dates: '2022-08-20T18:25:08Z' },
  { data: 19.59, dates: '2022-07-07T01:47:19Z' },
  { data: 17.41, dates: '2022-04-28T21:47:03Z' },
  { data: 15.98, dates: '2021-12-22T21:01:14Z' },
  { data: 16.27, dates: '2022-11-27T07:23:01Z' },
  { data: 16.68, dates: '2022-11-01T01:56:25Z' },
  { data: 8.0, dates: '2022-07-27T10:28:38Z' },
  { data: 13.83, dates: '2022-12-09T02:57:32Z' },
  { data: 11.48, dates: '2022-08-24T22:12:32Z' },
  { data: 11.06, dates: '2022-05-28T20:58:03Z' },
  { data: 12.1, dates: '2022-05-24T20:06:14Z' },
  { data: 19.33, dates: '2022-08-06T21:28:57Z' },
  { data: 10.32, dates: '2022-05-14T09:36:29Z' },
  { data: 19.72, dates: '2022-08-19T19:01:26Z' },
  { data: 10.12, dates: '2022-02-13T16:59:38Z' },
  { data: 10.72, dates: '2022-09-21T07:23:07Z' },
  { data: 16.66, dates: '2022-03-08T02:39:31Z' },
  { data: 6.66, dates: '2022-12-02T17:08:43Z' },
  { data: 14.21, dates: '2022-07-31T18:46:04Z' },
  { data: 5.22, dates: '2022-11-10T05:09:51Z' },
  { data: 12.48, dates: '2022-05-04T01:21:50Z' },
  { data: 6.58, dates: '2022-09-27T00:07:05Z' },
  { data: 13.02, dates: '2022-03-11T17:38:35Z' },
  { data: 18.02, dates: '2021-12-18T18:29:55Z' },
  { data: 9.6, dates: '2022-11-25T03:59:07Z' },
  { data: 6.24, dates: '2021-12-23T21:04:36Z' },
];
