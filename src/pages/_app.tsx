import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { AppShell, MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';
import { HeaderMenu } from '../components/Header';
import { Footer } from '../components/Footer';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <MantineProvider
        theme={{
          colorScheme: 'dark',
        }}
        withGlobalStyles
        withNormalizeCSS
      >
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
          header={<HeaderMenu />}
          hidden={router.pathname === '/login'}
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
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
