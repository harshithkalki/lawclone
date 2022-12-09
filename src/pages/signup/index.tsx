import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Divider,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  GoogleButton,
  TwitterButton,
} from '../../components/Icons/SocialButtons';

export default function AuthenticationTitle() {
  const [isLoadiing, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Container size={420} my={40}>
      <Title
        align='center'
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 500,
        })}
      >
        Log in to your account
      </Title>
      <Text color='dimmed' size='sm' align='center' mt={5}>
        Already have an account yet?{' '}
        <Anchor<'a'>
          size='sm'
          onClick={(event) => {
            event.preventDefault();
            router.push('/signin');
          }}
        >
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <TextInput label='Name' placeholder='Username' required />
        <TextInput label='Email' placeholder='you@email.com' required />
        <PasswordInput
          label='Password'
          placeholder='Your password'
          required
          mt='md'
        />
        <PasswordInput
          label='Confirm Password'
          placeholder='Confirm password'
          required
          mt='md'
        />
        <Button fullWidth mt='xl'>
          Sign in
        </Button>
        <Divider label='Or continue with ' labelPosition='center' my='lg' />
        <Group grow mb='md' mt='md'>
          <GoogleButton radius='xl'>Google</GoogleButton>
          <TwitterButton radius='xl'>Twitter</TwitterButton>
        </Group>
      </Paper>
    </Container>
  );
}
