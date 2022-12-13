import { useState } from 'react';
import {
  Stepper,
  Button,
  createStyles,
  Box,
  Text,
  Title,
  Flex,
  TextInput,
  Textarea,
  Group,
} from '@mantine/core';
import { FaHome } from 'react-icons/fa';
import { BsBuilding } from 'react-icons/bs';
import WhatINeed from './WhatINeed';
import Form1 from './form';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme) => ({
  mainContent: {
    width: '100%',
    minHeight: 400,
  },
  div: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderRadius: '15px',
      boxShadow: 'inherit',
    },
  },
}));

export const FormProgress = () => {
  const [active, setActive] = useState(0);
  const { classes } = useStyles();
  const { t } = useTranslation('index');
  console.log(active);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <div className={classes.mainContent}>
        {active === 0 && <FirstPage setActive={setActive} />}
        {active === 1 && <WhatINeed setActive={setActive} />}
        {active === 2 && <Form1 setActive={setActive} />}
        {active === 3 && <FinalForm setActive={setActive} />}
      </div>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint='sm'
        size='sm'
        hidden
      >
        <Stepper.Step label={t('Start')} />
        <Stepper.Step label={t('Location')} />
        <Stepper.Step label={t('Location')} />
        <Stepper.Step label={t('Location')} />
      </Stepper>

      <Group position='center' mt='xl' ml='auto' mr='auto'>
        <Button variant='default'>{t('Back')}</Button>
        <Button>{t('Next step')}</Button>
      </Group>
    </>
  );
};

const FirstPage = ({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { classes } = useStyles();
  const { t } = useTranslation('index');
  return (
    <>
      <Box
        display='flex'
        h='100%'
        sx={{ flexDirection: 'column', justifyContent: 'space-evenly' }}
        w='100%'
      >
        <Title sx={{ textAlign: 'center' }} order={3}>
          {t('Is your request private or for business?')}
        </Title>
        <Flex h='25rem' justify='space-evenly' align='center'>
          <div onClick={() => setActive(1)} className={classes.div}>
            <FaHome size={70} />
            <Title order={2}>{t('PRIVATE')}</Title>
          </div>

          <div onClick={() => setActive(1)} className={classes.div}>
            <BsBuilding size={70} />
            <Title order={2}>{t('BUSINESS')}</Title>
          </div>
        </Flex>
      </Box>
    </>
  );
};

function FinalForm({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { t } = useTranslation('index');

  return (
    <>
      <Box
        display='flex'
        sx={{
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Text mb={10} fw={500}>
          {t('Where are you looking for a lawyer?')}
        </Text>
        <TextInput mb={10} w='100%' />
        <Text mb={10} fw={500}>
          {t('Other Comments, Deadline')}
        </Text>
        <Textarea mb={10} w='100%' />
        <Button sx={{ alignSelf: 'flex-end' }}>{t('Submit')}</Button>
      </Box>
    </>
  );
}
