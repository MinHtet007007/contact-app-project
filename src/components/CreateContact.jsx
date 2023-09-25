import { Loader, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import React from "react";
import { useCreateContactMutation } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
  const token = Cookies.get("token");
  const [createContact, { isLoading }] = useCreateContactMutation();
  const nav = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: hasLength({ min: 9, max: 11 }),
      address: (value) =>
        value.length < 4 ? "address must have at least 4 letters" : null,
    },
  });
  return (
    <div className=" flex h-screen justify-center items-center">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await createContact({
              token: token,
              contact: values,
            });
            // console.log(data);
            // console.log(values);
            if (data?.success) {
              nav("/");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-96 flex flex-col gap-10 shadow-lg p-7"
      >
        <h4 className=" text-2xl">Create Contact</h4>
        <TextInput
          placeholder="Enter your name..."
          {...form.getInputProps("name")}
        />
        <TextInput
          placeholder="Enter your email..."
          {...form.getInputProps("email")}
        />
        <TextInput
          placeholder="Enter your phone..."
          {...form.getInputProps("phone")}
        />
        <TextInput
          placeholder="Enter your address..."
          {...form.getInputProps("address")}
        />
        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-500 text-white px-4 py-1"
        >
          {isLoading ? (
            <Loader className=" mx-auto block" color="dark" size="sm" />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateContact;
