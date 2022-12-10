import {
  createStyles,
  Paper,
  SimpleGrid,
  Title,
  Text,
  Container,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
} from '@tabler/icons';
import { HeroTitle } from '../components/IndexPage/LawyerRequestForm';
import type { TablerIcon } from '@tabler/icons';

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: 'Extreme performance',
    description:
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
  },
  {
    icon: IconUser,
    title: 'Privacy focused',
    description:
      'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
  },
  {
    icon: IconCookie,
    title: 'No third parties',
    description:
      'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
  },
  {
    icon: IconLock,
    title: 'Secure by default',
    description:
      'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right',
  },
  {
    icon: IconMessage2,
    title: '24/7 Support',
    description:
      'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail',
  },
];

interface FeatureProps {
  icon: TablerIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant='light' size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>
        {title}
      </Text>
      <Text size='sm' color='dimmed' style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

const useStylesFeatureGrid = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },
}));

interface FeaturesGridProps {
  title: React.ReactNode;
  description: React.ReactNode;
  data?: FeatureProps[];
}

function FeaturesGrid({
  title,
  description,
  data = MOCKDATA,
}: FeaturesGridProps) {
  const { classes, theme } = useStylesFeatureGrid();
  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>{title}</Title>

      <Container size={560} p={0}>
        <Text size='sm' className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' },
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: theme.spacing.xl * 2,
  },
  lawBox: {
    padding: 15,
  },
}));

const laws = [
  {
    title: 'law',
    description:
      'tax law, body of rules under which a public authority has a claim on taxpayers, requiring them to transfer to the authority part of their income or property',
  },
  {
    title: 'law',
    description:
      'tax law, body of rules under which a public authority has a claim on taxpayers, requiring them to transfer to the authority part of their income or property',
  },
  {
    title: 'law',
    description:
      'tax law, body of rules under which a public authority has a claim on taxpayers, requiring them to transfer to the authority part of their income or property',
  },
  {
    title: 'law',
    description:
      'tax law, body of rules under which a public authority has a claim on taxpayers, requiring them to transfer to the authority part of their income or property',
  },
  {
    title: 'law',
    description:
      'tax law, body of rules under which a public authority has a claim on taxpayers, requiring them to transfer to the authority part of their income or property',
  },
  {
    title: 'law',
    description:
      'tax law, body of rules under which a public authority has a claim on taxpayers, requiring them to transfer to the authority part of their income or property',
  },
];

const Laws = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Title order={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Basic Laws
      </Title>
      <SimpleGrid cols={3}>
        {laws.map((value, index) => (
          <Paper key={index} shadow='xl' className={classes.lawBox}>
            <Title order={3} style={{ textAlign: 'center' }}>
              {value.title}
            </Title>
            <Text style={{ textAlign: 'center' }}>{value.description}</Text>
          </Paper>
        ))}
      </SimpleGrid>
    </div>
  );
};

const IndexPage = () => {
  return (
    <div>
      <HeroTitle />
      {/* <Divider />
      <Laws /> */}
      <FeaturesGrid
        title='Find Your Perfect Lawyer'
        description='em ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore'
      />
    </div>
  );
};

export default IndexPage;
