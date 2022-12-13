import OverviewTab from '@/components/Lawyers/Dashboard/OverviewTab';
import { Tabs } from '@mantine/core';
import { IconBrandGoogleAnalytics, IconGavel, IconUser } from '@tabler/icons';
import type { GetServerSideProps } from 'next';
import type { StatsGridProps } from '@/components/Lawyers/Dashboard/OverviewTab';
import { EarningsTab } from '@/components/Lawyers/Dashboard/EarningsTab';
import type { OrderStatus } from '@prisma/client';
import OrderTab from '@/components/Lawyers/Dashboard/OrderTab';

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
          <OrderTab data={ordersData} />
        </Tabs.Panel>
        <Tabs.Panel value='earnings' pt='xs'>
          <EarningsTab />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export interface Order {
  client: string;
  date: string;
  status: OrderStatus;
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

export interface OrdersType {
  client: string;
  date: string;
  status: string;
}

interface props {
  overview: StatsGridProps;
  orders: OrdersType[];
}

const ordersData: Order[] = [
  {
    client: 'Arlana Liveing',
    date: '2022-11-20T12:07:20Z',
    status: 'CONFORMED',
  },
  {
    client: 'Tracie Halpeine',
    date: '2022-07-12T17:46:43Z',
    status: 'CONFORMED',
  },
  { client: 'Miriam Cowing', date: '2022-12-06T13:46:00Z', status: 'PENDING' },
  {
    client: 'Alexandr Plan',
    date: '2022-12-06T02:45:48Z',
    status: 'CONFORMED',
  },
  {
    client: 'Wallace Thomen',
    date: '2022-09-30T13:34:07Z',
    status: 'CANCELLED',
  },
  {
    client: 'Alexandrina Moretto',
    date: '2022-03-25T06:11:40Z',
    status: 'CONFORMED',
  },
  {
    client: 'Gayelord Kniveton',
    date: '2022-07-24T08:19:53Z',
    status: 'CANCELLED',
  },
  { client: 'Barde Hannon', date: '2022-07-10T06:42:01Z', status: 'CANCELLED' },
  { client: 'Paulette Wykes', date: '2022-12-05T21:40:15Z', status: 'PENDING' },
  { client: 'Evonne Tommeo', date: '2022-03-04T19:52:33Z', status: 'PENDING' },
];

export const getServerSideProps: GetServerSideProps<props> = async () => {
  const overview = overviewData;
  const orders = ordersData;

  return {
    props: {
      overview,
      orders,
    },
  };
};
