import OverviewTab from '@/components/admin/OverviewTab';
import { Tabs } from '@mantine/core';
import {
  IconBrandGoogleAnalytics,
  IconGavel,
  IconLock,
  IconUser,
} from '@tabler/icons';
import type { GetServerSideProps } from 'next';
import { prisma } from 'src/server/db/client';
import type { StatsGridProps } from '@/components/admin/OverviewTab';
import UsersTab from '@/components/admin/UsersTab';

interface userData {
  name: string;
  email: string;
  createdAt: string;
}
export default function app({ overview, users, lawyers, admins }: props) {
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
          <Tabs.Tab value='users' icon={<IconUser size={14} />}>
            Users
          </Tabs.Tab>
          <Tabs.Tab value='lawyers' icon={<IconGavel size={14} />}>
            Lawyers
          </Tabs.Tab>
          <Tabs.Tab value='admins' icon={<IconLock size={14} />}>
            Admins
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='overview' pt='xs'>
          <OverviewTab data={overview.data} />
        </Tabs.Panel>
        <Tabs.Panel value='users' pt='xs'>
          <UsersTab data={users} />
        </Tabs.Panel>
        <Tabs.Panel value='lawyers' pt='xs'>
          <UsersTab data={lawyers} />
        </Tabs.Panel>
        <Tabs.Panel value='admins' pt='xs'>
          <UsersTab data={admins} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

const overviewData: StatsGridProps = {
  data: [
    {
      title: 'NEW USERS',
      icon: 'users',
      value: '13,456',
      diff: 34,
    },
    {
      title: 'NEW LAWYERS',
      icon: 'lawyers',
      value: '4,145',
      diff: -13,
    },
    {
      title: 'transactions',
      icon: 'transactions',
      value: '745',
      diff: 18,
    },
    {
      title: 'Revenue',
      icon: 'revenue',
      value: '188',
      diff: -30,
    },
  ],
};

interface props {
  overview: StatsGridProps;
  users: User[];
  lawyers: User[];
  admins: User[];
}

export interface User {
  name: string;
  email: string;
  createdAt: string;
}
export const getServerSideProps: GetServerSideProps<props> = async () => {
  const overview = overviewData;
  const users = await prisma.user.findMany({
    where: {
      role: 'USER',
    },
  });

  const lawyers = await prisma.user.findMany({
    where: {
      role: 'LAWYER',
    },
  });

  const admins = await prisma.user.findMany({
    where: {
      role: 'ADMIN',
    },
  });

  return {
    props: {
      overview,
      users: users.map((user) => ({
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toDateString(),
      })),
      lawyers: lawyers.map((lawyer) => ({
        name: lawyer.name,
        email: lawyer.email,
        createdAt: lawyer.createdAt.toDateString(),
      })),
      admins: admins.map((admin) => ({
        name: admin.name,
        email: admin.email,
        createdAt: admin.createdAt.toDateString(),
      })),
    },
  };
};
