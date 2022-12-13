import { createStyles, Container, Box, Paper } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { FormProgress } from './FormProgress';
const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
  },

  inner: {
    position: 'relative',
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 40,
      paddingTop: 40,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: 20,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    textAlign: 'center',

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },

  dynamicForm: {
    padding: 10,
  },
}));

export const HeroTitle = () => {
  const { classes } = useStyles();
  const { t } = useTranslation('index');

  return (
    <div className={classes.wrapper}>
      <Container size={900} className={classes.inner}>
        <h2 className={classes.title}>{t('Find the best lawyer for you')}</h2>
        <Paper
          sx={(theme) => ({
            textAlign: 'center',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
          })}
        >
          <FormProgress />
        </Paper>
      </Container>
    </div>
  );
};
