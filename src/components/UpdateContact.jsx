import { Loader, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateContactMutation } from "../redux/api/contactApi";
import Cookies from "js-cookie";

const UpdateContact = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const nav = useNavigate();
  const contacts = useSelector((state) => state.contactSlice.contacts);
  const updateContactInfo = contacts.filter((contact) => contact.id == id);
  const [updateContact, { isLoading }] = useUpdateContactMutation();
  // console.log(updateContact[0].name);

  const form = useForm({
    initialValues: {
      name: updateContactInfo[0].name,
      email: updateContactInfo[0].email,
      phone: updateContactInfo[0].phone,
      address: updateContactInfo[0].address,
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
            const { data } = await updateContact({
              token: token,
              contact: values,
              id,
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
        <h4 className=" text-2xl">Update Contact</h4>
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
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateContact;
