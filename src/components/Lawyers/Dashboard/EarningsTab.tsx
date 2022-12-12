import { Button, Container, Divider, Grid, Paper, Text } from '@mantine/core';

export const EarningsTab = () => {
  return (
    <>
      <Container h='100%'>
        <Text fw={400} fz={40}>
          Earnings
        </Text>
        <Grid columns={3} h={'100%'}>
          <Grid.Col sm={3} md={1} lg={1}>
            <Text fw={200} fz={'xl'} mt={'xl'}>
              Available funds
            </Text>
            <Paper w={'90%'} p={33} mt={'sm'} h={350}>
              <Text fw={400}>Balance available for use</Text>
              <Text fz={50} fw={500} mt={'xl'}>
                US$11.85
              </Text>
              <Text fw={300} mt={'xs'}>
                Withdrawn to date:
              </Text>
              <Text fw={300}>US$29.23</Text>
              <Button mt={60}>Withdraw balance</Button>
            </Paper>
          </Grid.Col>

          <Grid.Col sm={3} md={1} lg={1}>
            <Text fw={200} fz={'xl'} mt={'xl'}>
              Future payments
            </Text>
            <Paper w={'90%'} p={33} mt={'sm'} h={350}>
              <Text fw={400}>Payments being cleared</Text>
              <Text fz={30} fw={500} mt='xl'>
                US$15.80
              </Text>
              <Text fw={300} mb={30}>
                1 payment after taxes
              </Text>
              <Divider />
              <Text mt={'xl'} fw={400}>
                Payments for active orders
              </Text>
              <Text fw={400} mt={35} fz={30}>
                -
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col sm={3} md={1} lg={1}>
            <Text fw={200} fz={'xl'} mt={'xl'}>
              Earnings & expenses
            </Text>
            <Paper w={'90%'} p={33} mt={'sm'} h={350}>
              <Text fw={400}>Earnings to date</Text>
              <Text fz={45} fw={400} mt={'xl'}>
                US$41.60
              </Text>
              <Text fw={300} mt={'xs'}>
                Your earnings before taxes.
              </Text>
              <Text fw={300} mb={30}>
                US$29.23
              </Text>
              <Divider />
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
