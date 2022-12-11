import { BsPencilSquare, BsThreeDots } from "react-icons/bs";
import { MdNoteAlt } from "react-icons/md";
import { GiChalkOutlineMurder } from "react-icons/gi";
import { IoPeopleSharp, IoHomeSharp } from "react-icons/io5";
import { TbReceiptTax } from "react-icons/tb";
import { RiGovernmentFill } from "react-icons/ri";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { createStyles, SimpleGrid, Title, Box } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  div: {
    width: "10rem",
    display: "flex",
    flexDirection: "column",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    alignItems: "center",
    justifyContent: "space-evenly",
    "&:hover": {
      cursor: "pointer",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderRadius: "10px",
      //   boxShadow: "",
    },
  },
}));

export default function WhatINeed({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { classes, theme } = useStyles();
  const items = [
    { title: "CONTRACTS", icon: <BsPencilSquare size={40} /> },
    { title: "COMPANY LAW", icon: <MdNoteAlt size={40} /> },
    { title: "CRIMINAL LAW", icon: <GiChalkOutlineMurder size={40} /> },
    { title: "FAMILY/DIVORCE", icon: <IoPeopleSharp size={40} /> },
    { title: "INSURANCE", icon: <MdNoteAlt size={40} /> },
    { title: "FINANCE/TAXES", icon: <TbReceiptTax size={40} /> },
    { title: "LABOR LAW", icon: <EngineeringIcon sx={{ fontSize: 40 }} /> },
    { title: "RENT/REALESTATE", icon: <IoHomeSharp size={40} /> },
    {
      title: "GOVERNMENT ADMINISTRATION",
      icon: <RiGovernmentFill size={40} />,
    },
    { title: "OTHERS", icon: <BsThreeDots size={40} /> },
  ];
  return (
    <>
      <Box
        display="flex"
        sx={{
          flexDirection: "column",
          justifyContent: "space-evenly",
          marginBottom: "5rem",
        }}
        w="100%"
      >
        <Title sx={{ textAlign: "center" }} order={3}>
          How can we help you?
        </Title>
        <SimpleGrid mt="2rem" px="lg" cols={4} spacing={theme.spacing.xl * 0.6}>
          {items.map((item) => (
            <div
              key={item.title}
              onClick={() => setActive(2)}
              className={classes.div}
            >
              {item.icon}
              <Title order={6}>{item.title}</Title>
            </div>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
