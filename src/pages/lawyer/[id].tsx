import {
  Flex,
  Group,
  Button,
  Divider,
  Stack,
  Grid,
  Table,
  TextInput,
  Avatar,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Image, Text, Rating } from '@mantine/core';
import { IconMapPin, IconSearch, IconUser } from '@tabler/icons';

export default function Lawyer() {
  const theme = useMantineTheme();

  return (
    <>
      <Grid columns={3}>
        <Grid.Col sm={3} md={1} lg={1}>
          <Flex
            direction='column'
            align={'center'}
            mt={'40px'}
            h={'auto'}
            style={{ border: '1px solid gray' }}
          >
            <Image
              alt={'avatar'}
              width={180}
              mt='45px'
              src='/avatar.png'
              style={{ width: 'auto' }}
            />
            <Text fz='lg' fw={700} mt={'sm'}>
              Stewie_harshith_kalki
            </Text>
            <Rating value={2} mt={'sm'} readOnly />
            <Group
              mt={'sm'}
              w={'90%'}
              style={{ justifyContent: 'space-between' }}
            >
              <Button variant='outline' w={'45%'}>
                Message
              </Button>
              <Button variant='outline' w={'45%'}>
                Book me
              </Button>
            </Group>
            <Divider mt={'40px'} color={'gray'} w={'90%'} />
            <Stack mt={'xl'} w={'90%'} mb={'10vh'}>
              <Group w={'100%'} style={{ justifyContent: 'space-between' }}>
                <Group spacing={4}>
                  <IconMapPin size={'15'} />
                  From
                </Group>
                <Text fw={700} fz={'md'}>
                  India
                </Text>
              </Group>

              <Group w={'100%'} style={{ justifyContent: 'space-between' }}>
                <Group spacing={4}>
                  <IconUser size={'15'} />
                  Member Since
                </Group>
                <Text fw={700} fz={'md'}>
                  Nov 2021
                </Text>
              </Group>
            </Stack>
          </Flex>

          <Flex
            direction='column'
            align={'center'}
            mt={'40px'}
            h={'auto'}
            style={{ border: '1px solid gray' }}
          >
            <Text fw={700} mb={'xl'} mt={'xl'}>
              Description
            </Text>
            <Text w={'90%'} mb={'40px'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Text>
            <Table w={'90%'} mb={'xl'}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: '700' }}>Educational Institute</td>
                  <td>Institute of lawyers</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '700' }}>Degree</td>
                  <td>Course</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '700' }}>Service</td>
                  <td>Divorce law, company law</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '700' }}>Expertise</td>
                  <td>Criminal lawyer</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '700' }}>Experience</td>
                  <td>3 years</td>
                </tr>
              </tbody>
            </Table>
          </Flex>
        </Grid.Col>
        <Grid.Col lg={2} md={3} sm={3} p='md'>
          <Grid mt='40px' columns={2}>
            <Grid.Col span={1}>
              <TextInput placeholder='Search' rightSection={<IconSearch />} />
            </Grid.Col>
            <Grid.Col span={2}>
              <Divider />
            </Grid.Col>
            {[...Array(10)].map((_, index) => {
              return (
                <Grid.Col span={2} key={index}>
                  <Stack>
                    <Group>
                      <Avatar size={'lg'} radius='xl' />
                      <Stack spacing={2}>
                        <Title order={4}>jackson</Title>
                        <Text>Netherland</Text>
                      </Stack>
                    </Group>
                    <Stack spacing={'xs'} ml='71px'>
                      <Rating value={0} readOnly />
                      <Text>Message</Text>
                      <Divider />
                    </Stack>
                  </Stack>
                </Grid.Col>
              );
            })}
          </Grid>
        </Grid.Col>
      </Grid>
    </>
  );
}
