import { BsPencilSquare, BsThreeDots } from 'react-icons/bs';
import { MdNoteAlt } from 'react-icons/md';
import { GiChalkOutlineMurder } from 'react-icons/gi';
import { IoPeopleSharp, IoHomeSharp } from 'react-icons/io5';
import { TbReceiptTax } from 'react-icons/tb';
import { RiGovernmentFill } from 'react-icons/ri';
import { SimpleGrid, Title, Box, createStyles } from '@mantine/core';
import { FaUserNurse } from 'react-icons/fa';

const useStyles = createStyles((theme) => ({
  div: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderRadius: '15px',
      boxShadow: 'inherit',
    },
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
}));

export default function WhatINeed({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { classes } = useStyles();
  const items = [
    { title: 'CONTRACTS', icon: <BsPencilSquare size={40} /> },
    { title: 'COMPANY LAW', icon: <MdNoteAlt size={40} /> },
    { title: 'CRIMINAL LAW', icon: <GiChalkOutlineMurder size={40} /> },
    { title: 'FAMILY/DIVORCE', icon: <IoPeopleSharp size={40} /> },
    { title: 'INSURANCE', icon: <MdNoteAlt size={40} /> },
    { title: 'FINANCE/TAXES', icon: <TbReceiptTax size={40} /> },
    { title: 'LABOR LAW', icon: <FaUserNurse size={40} /> },
    { title: 'RENT/REALESTATE', icon: <IoHomeSharp size={40} /> },
    {
      title: 'GOVERNMENT ADMINISTRATION',
      icon: <RiGovernmentFill size={40} />,
    },
    { title: 'OTHERS', icon: <BsThreeDots size={40} /> },
  ];
  return (
    <Box w='100%' p={'sm'}>
      <Title sx={{ textAlign: 'center' }} order={3}>
        How can we help you?
      </Title>
      <SimpleGrid
        w='100%'
        breakpoints={[
          { maxWidth: 'md', cols: 3 },
          { maxWidth: 'lg', cols: 3 },
          { maxWidth: 'sm', cols: 2 },
        ]}
        cols={3}
        mt='3rem'
      >
        {items.map((item) => (
          <div
            className={classes.div}
            key={item.title}
            onClick={() => setActive(2)}
          >
            {item.icon}
            <Title order={6}>{item.title}</Title>
          </div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
