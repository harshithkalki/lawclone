import OverviewTab from '@/components/Lawyers/Dashboard/OverviewTab';
import { Tabs } from '@mantine/core';
import { IconBrandGoogleAnalytics, IconGavel, IconUser } from '@tabler/icons';
import type { GetServerSideProps } from 'next';
import type { StatsGridProps } from '@/components/Lawyers/Dashboard/OverviewTab';
import { EarningsTab } from '@/components/Lawyers/Dashboard/EarningsTab';

export default function app({ overview }: props) {
  return (
    <>
      <Tabs defaultValue={'overview'}>
        <Tabs.List>
          <Tabs.Tab
            value='overview'
            icon={<IconBrandGoogleAnalytics size={14} />}
          >
            Overview
          </Tabs.Tab>
          <Tabs.Tab value='orders' icon={<IconUser size={14} />}>
            Orders
          </Tabs.Tab>
          <Tabs.Tab value='earnings' icon={<IconGavel size={14} />}>
            Earnings
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='overview' pt='xs'>
          <OverviewTab data={overview.data} />
        </Tabs.Panel>
        <Tabs.Panel value='orders' pt='xs'>
          {/* <UsersTab data={users} /> */}
        </Tabs.Panel>
        <Tabs.Panel value='earnings' pt='xs'>
          <EarningsTab />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export interface User {
  name: string;
  email: string;
  createdAt: string;
}

const overviewData: StatsGridProps = {
  data: [
    {
      title: 'ORDERS',
      icon: 'orders',
      value: '13,456',
      diff: 34,
    },
    {
      title: 'EARNINGS',
      icon: 'earnings',
      value: '4,145',
      diff: -13,
    },
  ],
};

interface OrdersType {
  client: string;
  date: string;
  status: string;
}

interface props {
  overview: StatsGridProps;
  orders: OrdersType[];
}
// const earningsData = {};

const ordersData = [
  { client: 'harshith', date: 'sdadasda', status: 'pending' },
];

export const getServerSideProps: GetServerSideProps<props> = async () => {
  const overview = overviewData;
  // const earnings = earningsData;
  const orders = ordersData;

  return {
    props: {
      overview,
      orders,
    },
  };
};
