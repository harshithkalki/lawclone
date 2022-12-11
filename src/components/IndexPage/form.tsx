import { Button, Flex, Checkbox } from "@mantine/core";
import { Formik, Form } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import FormInput from "../FormikCompo/FormikInput";

export default function Form1({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) {
  const formSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    city: z.string(),
    postalcode: z.string(),
    pays: z.string(),
    telephone: z.number(),
    email: z.string(),
  });

  const initialValues = {
    firstname: "",
    lastname: "",
    city: "",
    postalcode: "",
    pays: "",
    telephone: null,
    email: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setActive(3);
        setSubmitting(false);
      }}
      validationSchema={toFormikValidationSchema(formSchema)}
    >
      {({ values, isSubmitting }) => (
        <Form style={{ width: "100%", height: "100%" }}>
          <Flex direction="column" sx={{ textAlign: "left" }}>
            <Checkbox sx={{ float: "left" }} label="Mr" />
            <Checkbox sx={{ float: "left" }} defaultChecked label="Mrs" />
          </Flex>
          <Flex mt="2rem" h="23rem" direction="column" justify="space-between">
            <FormInput
              name="firstname"
              id="firstname"
              placeholder="First Name"
            />
            <FormInput name="lastname" id="lastname" placeholder="Last name" />
            <FormInput name="city" id="city" placeholder="City" />
            <FormInput
              name="postalcode"
              id="postalcode"
              placeholder="Postal Code"
            />
            <FormInput name="pays" id="pays" placeholder="Pays" />
            <FormInput
              name="telephone"
              id="telephone"
              placeholder="Telephone"
              type="number"
            />
            <FormInput name="email" id="email" placeholder="E-mail" />
          </Flex>
          <Button type="submit" sx={{ float: "right", margin: "1rem" }}>
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
}
