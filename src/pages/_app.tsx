import { SessionProvider, useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import type { ColorScheme } from '@mantine/core';
import {
  AppShell,
  Center,
  ColorSchemeProvider,
  Loader,
  MantineProvider,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { HeaderMenu } from '../components/Header';
import { Footer } from '../components/Footer';
import RouterTransition from '@/components/RouterTransition';
import { appWithTranslation } from 'next-i18next';
import { useState } from 'react';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <RouterTransition />

          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

function AppWrapper({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <Center h='100vh'>
        <Loader />
      </Center>
    );
  }

  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      navbarOffsetBreakpoint='sm'
      header={<HeaderMenu isAuth={status === 'authenticated'} />}
      hidden={
        router.pathname === '/signin' ||
        router.pathname === '/signup' ||
        router.pathname === '/chat'
      }
      footer={
        <Footer
          data={[
            {
              links: [
                {
                  label: 'support',
                  link: '/',
                },
              ],
              title: 'help',
            },
          ]}
        />
      }
    >
      {children}
    </AppShell>
  );
}

export default trpc.withTRPC(appWithTranslation(MyApp));
