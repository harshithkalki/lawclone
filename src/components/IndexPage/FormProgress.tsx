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

const useStyles = createStyles((theme) => ({
  mainContent: {
    width: '100%',
    minHeight: 500,
    maxHeight: 500,
  },
  div: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderRadius: '5px',
      boxShadow: 'inherit',
    },
  },
}));

export const FormProgress = () => {
  const [active, setActive] = useState(0);
  const { classes } = useStyles();

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
        <Stepper.Step label='Start' />
        <Stepper.Step label='Location' />
        <Stepper.Step label='Location' />
        <Stepper.Step label='Location' />
      </Stepper>

      <Group position='center' mt='xl' ml='auto' mr='auto'>
        <Button variant='default'>Back</Button>
        <Button>Next step</Button>
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
  return (
    <>
      <Box
        display='flex'
        sx={{ flexDirection: 'column', justifyContent: 'space-evenly' }}
        w='100%'
      >
        <Title sx={{ textAlign: 'center' }} order={3}>
          Is your request private or for business?
        </Title>
        <Flex justify='space-evenly'>
          <div onClick={() => setActive(1)} className={classes.div}>
            <FaHome size={70} />
            <Title order={2}>PRIVATE</Title>
          </div>

          <div onClick={() => setActive(1)} className={classes.div}>
            <BsBuilding size={70} />
            <Title order={2}>BUSINESS</Title>
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
          Where are you looking for a lawyer?
        </Text>
        <TextInput mb={10} w='100%' />
        <Text mb={10} fw={500}>
          Other Comments, Deadline
        </Text>
        <Textarea mb={10} w='100%' />
        <Button sx={{ alignSelf: 'flex-end' }}>Submit</Button>
      </Box>
    </>
  );
}
