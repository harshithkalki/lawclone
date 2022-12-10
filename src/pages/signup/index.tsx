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
  Stack,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { Formik, Form } from "formik";
import { trpc } from "../../utils/trpc";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  GoogleButton,
  TwitterButton,
} from "../../components/Icons/SocialButtons";
import { FormikInput } from "@/components/FormikCompo";

const FormSchema = z
  .object({
    name: z.string(),
    email: z.string().email("Enter valid email"),
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const initialValues: z.infer<typeof FormSchema> = {
  name: "",
  email: "",
  password: "",
  confirm: "",
};
export default function AuthenticationTitle() {
  const [isLoadiing, setLoading] = useState(false);
  const router = useRouter();
  const isEmailExists = trpc.auth.isEmailExists.useMutation();
  const signup = trpc.auth.signup.useMutation();

  const onSubmit = async (values: typeof initialValues) => {
    if ((await isEmailExists.mutateAsync(values.email)).success)
      return {
        error: {
          email: "Email Address Already exists ",
        },
      };
    else {
      signup.mutateAsync(values);
      router.push("/signin");
    }
  };

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
        Already have an account yet?{" "}
        <Anchor<"a">
          size="sm"
          onClick={(event) => {
            event.preventDefault();
            router.push("/signin");
          }}
        >
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            onSubmit(values).then((res) => {
              if (res && res.error) {
                setErrors(res.error);
              }
              // router.push("/signin");
              setSubmitting(false);
            });
          }}
          validationSchema={toFormikValidationSchema(FormSchema)}
        >
          {({ values, handleBlur, handleChange, errors, touched }) => (
            <Form style={{ width: "100%" }} id="signUpForm">
              <Stack spacing={5}>
                <FormikInput name="name" label="Name" />
                <FormikInput
                  name="email"
                  id="email"
                  type="email"
                  label="Email"
                  labelProps={{ htmlFor: "email" }}
                />
                <PasswordInput
                  name="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched && errors.password}
                  placeholder="Your password"
                  withAsterisk
                  mt="md"
                />
                <PasswordInput
                  name="confirm"
                  label="Confirm"
                  value={values.confirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.confirm}
                  placeholder="confirm password"
                  withAsterisk
                  mt="md"
                />
              </Stack>
            </Form>
          )}
        </Formik>

        <Button
          fullWidth
          mt="xl"
          type="submit"
          form="signUpForm"
          loading={isLoadiing}
        >
          Sign up
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
