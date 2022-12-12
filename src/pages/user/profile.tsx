import { UserInfoIcon } from '@/components/UserInfo';
import { Center, createStyles } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl,
  },
}));

const Profile = () => {
  const { classes } = useStyles();

  return (
    <Center className={classes.root}>
      <UserInfoIcon
        name='abhiram'
        email='fdasfs'
        phone='dkfadsf'
        title='fdafds'
        avatar={''}
      />
    </Center>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default Profile;
