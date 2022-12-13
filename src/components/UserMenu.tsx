import { Menu, Group } from '@mantine/core';
import { IconDashboard, IconLogout } from '@tabler/icons';
import { signOut, useSession } from 'next-auth/react';
import router from 'next/router';

export function UserMenu({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  console.log(data?.role);

  return (
    <Group position='center'>
      <Menu withArrow position='bottom' transition='pop'>
        <Menu.Target>{children}</Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<IconDashboard size={14} stroke={1.5} />}
            onClick={() => {
              router.push(`/lawyer/dashboard/${data?.user?.id}`);
            }}
            hidden={!(data?.role === 'LAWYER')}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            icon={<IconLogout size={14} stroke={1.5} />}
            onClick={() => {
              signOut({ redirect: true, callbackUrl: '/' });
            }}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
