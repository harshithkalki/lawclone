import { Menu, Group } from '@mantine/core';
import { IconLogout, IconSettings } from '@tabler/icons';
import { signOut } from 'next-auth/react';

export function UserMenu({ children }: { children: React.ReactNode }) {
  return (
    <Group position='center'>
      <Menu withArrow position='bottom' transition='pop'>
        <Menu.Target>{children}</Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
            Account settings
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
