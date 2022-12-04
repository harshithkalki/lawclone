import {
  createStyles,
  Divider,
  Paper,
  SimpleGrid,
  Title,
  Text,
} from '@mantine/core';
import { HeroTitle2 } from '../components/IndexPage/HeroTitle2';
import { HeroTitle } from '../components/IndexPage/LawyerRequestForm';

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
      <HeroTitle2 />
      <Divider />
      <Laws />
    </div>
  );
};

export default IndexPage;
