import {
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
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { trpc } from '../../utils/trpc';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {
  GoogleButton,
  TwitterButton,
} from '../../components/Icons/SocialButtons';
import { FormikInput } from '@/components/FormikCompo';
import FormInput from '@/components/FormikCompo/FormikInput';
import FormikPass from '@/components/FormikCompo/FormikPass';
import { getSession } from 'next-auth/react';
import type { GetServerSideProps } from 'next';
import { prisma } from '@/server/db/client';

const FormSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    email: z.string().email('Enter valid email'),
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

const initialValues: z.infer<typeof FormSchema> = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirm: '',
};
export default function AuthenticationTitle() {
  const router = useRouter();
  const isEmailExists = trpc.auth.isEmailExists.useMutation();
  const isUsernameExists = trpc.auth.isUsernameExists.useMutation();
  const signup = trpc.auth.signup.useMutation();

  console.log(signup.error?.shape?.data.zodError);
  const onSubmit = async (values: typeof initialValues) => {
    if ((await isEmailExists.mutateAsync(values.email)).success) {
      return {
        error: {
          email: 'Email Address Already exists ',
        },
      };
    } else if ((await isUsernameExists.mutateAsync(values.username)).success) {
      return {
        error: {
          username: 'Username Already exists ',
        },
      };
    } else {
      signup.mutateAsync(values);
      router.push('/signin');
    }
  };

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
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            onSubmit(values).then((res) => {
              if (res && res.error) {
                setErrors(res.error);
              }
              setSubmitting(false);
            });
          }}
          validationSchema={toFormikValidationSchema(FormSchema)}
        >
          {() => (
            <Form style={{ width: '100%' }} id='signUpForm'>
              <Stack spacing={5}>
                <FormInput
                  name='firstName'
                  label='First Name'
                  withAsterisk
                  placeholder='First Name'
                />
                <FormInput
                  name='lastName'
                  label='Last Name'
                  withAsterisk
                  placeholder='Last Name'
                />
                <FormInput
                  name='username'
                  label='Username'
                  withAsterisk
                  placeholder='Username'
                />
                <FormikInput
                  name='email'
                  id='email'
                  type='email'
                  label='Email'
                  placeholder='Email'
                  withAsterisk
                  labelProps={{ htmlFor: 'email' }}
                />
                <FormikPass
                  name='password'
                  label='Password'
                  placeholder='Your password'
                  withAsterisk
                />
                <FormikPass
                  name='confirm'
                  label='Confirm'
                  placeholder='confirm password'
                  withAsterisk
                />
              </Stack>
            </Form>
          )}
        </Formik>

        <Button
          fullWidth
          mt='xl'
          type='submit'
          form='signUpForm'
          loading={signup.isLoading}
        >
          Sign up
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
    const user = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (user?.role === 'LAWYER' || user?.role === 'USER') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
