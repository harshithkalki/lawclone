import { Stack, Radio } from '@mantine/core';
import { Formik, Form } from 'formik';
import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import FormInput from '../FormikCompo/FormikInput';

export default function Form1({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [value, setValue] = useState('mrs');
  console.log(value);

  const formSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    city: z.string(),
    postalcode: z.string(),
    pays: z.string(),
    telephone: z.number(),
    email: z.string(),
  });

  const initialValues = {
    firstname: '',
    lastname: '',
    city: '',
    postalcode: '',
    pays: '',
    telephone: null,
    email: '',
  };

  const { t } = useTranslation('index');

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setActive(3);
        setSubmitting(false);
      }}
      validationSchema={toFormikValidationSchema(formSchema)}
    >
      {({}) => (
        <Form style={{ width: '100%', height: '100%' }}>
          {/* <Flex direction='column' sx={{ textAlign: 'left' }}>
            <Checkbox
              onChange={(e) => console.log(e.target.value)}
              sx={{ float: 'left' }}
              label='Mr'
            />
            <Checkbox sx={{ float: 'left' }} defaultChecked label='Mrs' />
          </Flex> */}
          <Radio.Group value={value} onChange={setValue} name='radio'>
            <Radio value='mr' label='Mr' />
            <Radio value='mrs' label='Mrs' />
          </Radio.Group>
          <Stack spacing={20} sx={{ textAlign: 'left' }}>
            <FormInput
              name='firstname'
              id='firstname'
              placeholder={t('firstname')!}
            />
            <FormInput name='lastname' id='lastname' placeholder='Last name' />
            <FormInput name='city' id='city' placeholder='City' />
            <FormInput
              name='postalcode'
              id='postalcode'
              placeholder={t('Postal Code')!}
            />
            <FormInput name='pays' id='pays' placeholder='Pays' />
            <FormInput
              name='telephone'
              id='telephone'
              placeholder={t('Telephone')!}
              type='number'
            />
            <FormInput name='email' id='email' placeholder={t('Email')!} />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
