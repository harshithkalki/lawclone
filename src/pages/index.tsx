import {
  createStyles,
  Paper,
  SimpleGrid,
  Title,
  Text,
  Container,
  Image,
} from '@mantine/core';
import { HeroTitle } from '../components/IndexPage/LawyerRequestForm';
import { prisma } from '@/server/db/client';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

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
  lawBox: {
    padding: 15,
    borderRadius: '10px',
  },
}));

interface FeaturesGridProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

function FeaturesGrid({ title, description }: FeaturesGridProps) {
  const { classes, theme } = useStylesFeatureGrid();

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
        {laws.map((value, index) => (
          <Paper key={index} shadow='xl' className={classes.lawBox}>
            <Image
              width={80}
              height={80}
              alt='feature image'
              src={value.src}
              sx={{ objectFit: 'cover', textAlign: 'center', margin: 'auto' }}
            />
            <Title order={3} style={{ textAlign: 'center' }}>
              {value.title}
            </Title>
            <Text style={{ textAlign: 'center' }}>{value.para}</Text>
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
}

const laws = [
  {
    title: 'Civil Law',
    src: '/civil.png',
    para: "Civil law is the part of a country's set of laws which is concerned with the private affairs of citizens",
  },
  {
    title: 'Criminal Law',
    src: '/criminal.png',
    para: 'The body of law that defines criminal offenses, regulates the apprehension, charging, and trial of suspected persons, and fixes penalties.',
  },

  {
    title: 'Divorce',
    src: '/divorce.png',
    para: 'A divorce is a legal action leading to the break-up of a civil wedding pronounced by a court at the request of one or both spouses',
  },
  {
    title: 'Immigration Law',
    src: '/immigration.png',
    para: 'Immigration law refers to the national statutes, regulations, and legal precedents governing immigration into and deportation from a country.',
  },
  {
    title: 'Tax Law',
    src: '/tax.png',
    para: 'tax law, body of rules under which a public authority has a claim on taxpayers, requiring them to transfer to the authority part of their income or property',
  },
  {
    title: 'Medical Law',
    src: '/medical.png',
    para: 'Medical law is the branch of law which concerns the prerogatives and responsibilities of medical professionals and the rights of the patient',
  },
];

const IndexPage = () => {
  return (
    <div style={{ width: '100%' }}>
      <HeroTitle />
      <FeaturesGrid
        title='Find Your Perfect Lawyer'
        description='em ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore'
      />
    </div>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });

    if (user?.role === 'ADMIN') {
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        },
      };
    }
  }
  return {
    props: {},
  };
};
