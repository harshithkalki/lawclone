import {
  TextInput,
  PasswordInput,
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
} from "@mantine/core";
import type { FormikErrors } from "formik";
import { Formik } from "formik";
import { Form } from "formik";
import { z } from "zod";
import { useRouter } from "next/router";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRef, useState } from "react";
import {
  GoogleButton,
  TwitterButton,
} from "../../components/Icons/SocialButtons";
import FormInput from "@/components/FormikCompo/FormikInput";
import { signIn } from "next-auth/react";

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
        password: "Please Enter the password",
      });
      break;
    case AuthError.WRONG_PASSWORD:
      setErrors({
        password: "Email or Password are incorrect",
        email: "Email or Password are incorrect",
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
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 500,
        })}
      >
        Log in to your account
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor<"a">
          size="sm"
          onClick={(event) => {
            event.preventDefault();
            router.push("/signup");
          }}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            // console.log("hello there");
            setLoading(true);
            signIn("credentials", {
              ...values,
              redirect: false,
            }).then((value) => {
              if (value?.error) setFormikErrors(value?.error, setErrors);
              setLoading(false);
              if (value?.ok) router.push("/user/user-in");
              setSubmitting(false);
            });
          }}
          validationSchema={toFormikValidationSchema(
            z.object({
              email: z.string().email("Please enter valid email"),
              password: z.string(),
            })
          )}
        >
          {({ handleChange, values, handleBlur, errors, touched }) => (
            <Form style={{ width: "100%" }} id="signinForm">
              <Stack spacing={6}>
                <Stack spacing={5}>
                  <FormInput
                    name="email"
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    labelProps={{ htmlFor: "email" }}
                    withAsterisk
                  />
                  {/* <PasswordField name="password" label="Password" /> */}
                  <PasswordInput
                    name="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched && errors?.password ? errors?.password : undefined
                    }
                    placeholder="Your password"
                    withAsterisk
                    mt="md"
                  />
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>

        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
          <Anchor<"a">
            onClick={(event) => event.preventDefault()}
            href="#"
            size="sm"
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit" form="signinForm">
          Sign in
        </Button>
        <Divider label="Or continue with " labelPosition="center" my="lg" />
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>
      </Paper>
    </Container>
  );
}
