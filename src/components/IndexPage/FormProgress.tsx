import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  createStyles,
  Box,
  Text,
  Title,
  Flex,
  ActionIcon,
  TextInput,
  Paper,
  Textarea,
} from "@mantine/core";
import { FaHome } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import WhatINeed from "./WhatINeed";
import Form1 from "./form";

const useStyles = createStyles((theme) => ({
  mainContent: {
    display: "flex",
    width: "100%",
    minHeight: 400,
  },
  div: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "space-evenly",
    "&:hover": {
      cursor: "pointer",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderRadius: "5px",
      boxShadow: "inherit",
    },
  },
}));

export const FormProgress = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const { classes } = useStyles();
  console.log(active);

  return (
    <>
      <div className={classes.mainContent}>
        {active === 0 && <FirstPage setActive={setActive} />}
        {active === 1 && <WhatINeed setActive={setActive} />}
        {active === 2 && <Form1 setActive={setActive} />}
        {active === 3 && <FinalForm setActive={setActive} />}
        {/* <FirstPage /> */}
        {/* <WhatINeed /> */}
        {/* <Form1 /> */}
        {/* <FinalForm /> */}
      </div>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        size="sm"
      >
        <Stepper.Step label="Start" />
        <Stepper.Step label="Location" />
        <Stepper.Step label="Location" />
        <Stepper.Step label="Location" />
      </Stepper>

      {/* <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
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
        display="flex"
        sx={{ flexDirection: "column", justifyContent: "space-evenly" }}
        w="100%"
      >
        <Title sx={{ textAlign: "center" }} order={3}>
          Is your request private or for business?
        </Title>
        <Flex justify="space-evenly">
          {/* <Paper sx={{ borderRadius: "15px" }} shadow="xl" p="md" bg=" "> */}
          <div onClick={() => setActive(1)} className={classes.div}>
            <FaHome size={70} />
            <Title order={2}>PRIVATE</Title>
          </div>
          {/* </Paper> */}
          {/* <Paper shadow="xl" p="md"> */}
          <div onClick={() => setActive(1)} className={classes.div}>
            <BsBuilding size={70} />
            <Title order={2}>BUSINESS</Title>
          </div>
          {/* </Paper> */}
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
        mt="3rem"
        display="flex"
        // alignItems="flex-start"
        sx={{
          height: "100%",
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
        // justify="space-evenly"
      >
        <Text mb={10} fw={500}>
          Where are you looking for a lawyer?
        </Text>
        <TextInput mb={10} w="100%" />
        <Text mb={10} fw={500}>
          Other Comments, Deadline
        </Text>
        <Textarea mb={10} w="100%" />
        <Button sx={{ alignSelf: "flex-end" }}>Submit</Button>
      </Box>
    </>
  );
}
