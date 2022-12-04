import { useState } from 'react';
import { Stepper, Button, Group, createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  mainContent: {
    display: 'flex',
    width: '100%',
    minHeight: 450,
  },
}));

export const FormProgress = () => {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const { classes } = useStyles();

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint='sm'
        size='sm'
      >
        <Stepper.Step label='Start' />
        <Stepper.Step label='Location' />
        <Stepper.Step label='Location' />
        <Stepper.Step label='Location' />
      </Stepper>

      <div className={classes.mainContent}></div>

      <Group position='center' mt='xl'>
        <Button variant='default' onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
};
