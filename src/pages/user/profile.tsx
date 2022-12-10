import { UserInfoIcon } from '@/components/UserInfo';
import { Center, createStyles } from '@mantine/core';

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

export default Profile;
