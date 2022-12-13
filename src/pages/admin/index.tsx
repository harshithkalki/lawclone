import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';
import { prisma } from 'src/server/db/client';
import type { StatsGridProps } from '@/components/admin/OverviewTab';
import UsersTab from '@/components/admin/UsersTab';
import OverviewTab from '@/components/admin/OverviewTab';
import { Tabs } from '@mantine/core';
import {
  IconBrandGoogleAnalytics,
  IconGavel,
  IconLock,
  IconUser,
} from '@tabler/icons';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface props {
  overview: StatsGridProps;
  users: User[];
  lawyers: User[];
  admins: User[];
}

export default function App({ overview, users, lawyers, admins }: props) {
  const { t } = useTranslation('admin');
  return (
    <>
      <Tabs defaultValue={'overview'}>
        <Tabs.List>
          <Tabs.Tab
            value='overview'
            icon={<IconBrandGoogleAnalytics size={14} />}
          >
            {t('overview')}
          </Tabs.Tab>
          <Tabs.Tab value='users' icon={<IconUser size={14} />}>
            {t('users')}
          </Tabs.Tab>
          <Tabs.Tab value='lawyers' icon={<IconGavel size={14} />}>
            {t('lawyers')}
          </Tabs.Tab>
          <Tabs.Tab value='admins' icon={<IconLock size={14} />}>
            {t('admins')}
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

const overviewDataEn: StatsGridProps = {
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

const overviewDataFr: StatsGridProps = {
  data: [
    {
      title: 'NOUVEAUX UTILISATEURS',
      icon: 'users',
      value: '13,456',
      diff: 34,
    },
    {
      title: 'NOUVEAUX AVOCATS',
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

// convert above overviewData title property to french

export interface User {
  name: string;
  email: string;
  createdAt: string;
}

export const getServerSideProps: GetServerSideProps<props> = async ({
  locale,
}) => {
  const overview = locale === 'fr' ? overviewDataFr : overviewDataEn;
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
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        createdAt: user.createdAt.toDateString(),
      })),
      lawyers: lawyers.map((lawyer) => ({
        name: lawyer.firstName + ' ' + lawyer.lastName,
        email: lawyer.email,
        createdAt: lawyer.createdAt.toDateString(),
      })),
      admins: admins.map((admin) => ({
        name: admin.firstName + ' ' + admin.lastName,
        email: admin.email,
        createdAt: admin.createdAt.toDateString(),
      })),
      ...(await serverSideTranslations(locale ? locale : 'en', ['admin'])),
    },
  };
};
