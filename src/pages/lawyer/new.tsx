import { FormikTextarea } from '@/components/FormikCompo';
import FormInput from '@/components/FormikCompo/FormikInput';
import { trpc } from '@/utils/trpc';
import { Button, Container, createStyles, Stack, Title } from '@mantine/core';
import { Language } from '@prisma/client';
import { Formik, Form } from 'formik';
import { z } from 'zod';

export const lawyerInput = z.object({
  lawyerId: z.string(),
  institution: z.string(),
  course: z.string(),
  experience: z.number(),
  description: z.string(),
  country: z.string(),
  expertise: z.string(),
  services: z.array(z.string()),
  state: z.string(),
  image: z.string(),
  price: z.number(),
  language: z.nativeEnum(Language).optional(),
});

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 60,
    paddingLeft: 60,
    paddingRight: 60,
    [theme.fn.smallerThan('lg')]: {
      paddingLeft: theme.spacing.xs,
      paddingRight: theme.spacing.xs,
      paddingTop: theme.spacing.xl,
    },
  },
}));

export default function NewLawyer() {
  const { classes } = useStyles();
  const createLawyer = trpc.lawyer.create.useMutation();
  return (
    <Container className={classes.root}>
      <Title order={3}>Lawyer Form</Title>

      <Formik
        initialValues={{
          institution: '',
          course: '',
          experience: 0,
          description: '',
          country: '',
          expertise: '',
          services: [],
          state: '',
          image: '',
          price: 0,
          language: Language.ENGLISH,
        }}
        onSubmit={async (values) => {
          await createLawyer.mutateAsync(values);
        }}
      >
        {() => (
          <Form>
            <Stack>
              <FormInput
                name='institution'
                label='Institution'
                placeholder='Institution'
                withAsterisk
              />
              <FormInput
                name='course'
                label='Course'
                placeholder='Course'
                withAsterisk
              />
              <FormInput
                name='experience'
                label='Experience'
                placeholder='Experience'
                withAsterisk
              />
              <FormikTextarea
                name='description'
                label='Description'
                placeholder='Description'
                withAsterisk
              />

              <FormInput
                name='country'
                label='Country'
                placeholder='Country'
                withAsterisk
              />

              <FormInput
                name='expertise'
                label='Expertise'
                placeholder='Expertise'
                withAsterisk
              />

              <FormInput
                name='services'
                label='Services'
                placeholder='Services'
                withAsterisk
              />
              <FormInput
                name='state'
                label='State'
                placeholder='State'
                withAsterisk
              />
              <FormInput
                name='image'
                label='Image'
                placeholder='Image'
                withAsterisk
              />
              <FormInput
                name='price'
                label='Price'
                placeholder='Price'
                withAsterisk
              />
              <Button type='submit'>Submit</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
