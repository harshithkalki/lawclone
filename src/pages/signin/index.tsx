import {
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Divider,
  Stack,
} from '@mantine/core';
import type { FormikErrors } from 'formik';
import { Formik } from 'formik';
import { Form } from 'formik';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useState } from 'react';
import {
  GoogleButton,
  TwitterButton,
} from '../../components/Icons/SocialButtons';
import { getSession, signIn } from 'next-auth/react';
import { FormikPass, FormikInput } from '@/components/FormikCompo';
import type { GetServerSideProps } from 'next';
import { prisma } from '@/server/db/client';

export const AuthError = {
  WRONG_PASSWORD: 1,
  EMAIL_DOESNT_EXIST: 2,
  NO_PASSWORD: 3,
} as const;

const setFormikErrors = (
  error: string,
  setErrors: (
    errors: FormikErrors<{
      email: string;
      password: string;
    }>
  ) => void
) => {
  switch (parseInt(error)) {
    case AuthError.EMAIL_DOESNT_EXIST:
      setErrors({
        email: "Email Address doesn't exists",
      });
      break;
    case AuthError.NO_PASSWORD:
      setErrors({
        password: 'Please Enter the password',
      });
      break;
    case AuthError.WRONG_PASSWORD:
      setErrors({
        password: 'Email or Password are incorrect',
        email: 'Email or Password are incorrect',
      });
      break;
  }
};

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
        Do not have an account yet?{' '}
        <Anchor<'a'>
          size='sm'
          onClick={(event) => {
            event.preventDefault();
            router.push('/signup');
          }}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            setLoading(true);
            signIn('credentials', {
              ...values,
              redirect: false,
            }).then((value) => {
              if (value?.error) setFormikErrors(value?.error, setErrors);
              setLoading(false);
              if (value?.ok) router.push('/user/user-in');
              setSubmitting(false);
            });
          }}
          validationSchema={toFormikValidationSchema(
            z.object({
              email: z.string().email('Please enter valid email'),
              password: z.string(),
            })
          )}
        >
          {() => (
            <Form style={{ width: '100%' }} id='signinForm'>
              <Stack spacing={6}>
                <Stack spacing={5}>
                  <FormikInput
                    name='email'
                    id='email'
                    type='email'
                    label='Email'
                    placeholder='Email'
                    labelProps={{ htmlFor: 'email' }}
                    withAsterisk
                  />
                  <FormikPass
                    name='password'
                    label='Password'
                    placeholder='Your password'
                    withAsterisk
                  />
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>

        <Group position='apart' mt='lg'>
          <Checkbox label='Remember me' sx={{ lineHeight: 1 }} />
        </Group>
        <Button
          fullWidth
          mt='xl'
          type='submit'
          form='signinForm'
          loading={isLoadiing}
        >
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
    if (user?.role === 'ADMIN') {
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
