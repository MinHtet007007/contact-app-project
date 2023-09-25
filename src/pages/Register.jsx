import { PasswordInput, TextInput, Loader } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/authApi";
import { useForm } from "@mantine/form";

const Register = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [password_confirmation, setPasswordConfirmation] = useState("");
  const [register,{isLoading}] = useRegisterMutation();
  const nav = useNavigate();

  // sirmin@gmail.com
  // asdffdsa

  // const registerHandler = async (e) => {
  //   try {
  //     e.preventDefault();
  //     // console.log(name,email,password,password_confirmation);
  //     const user = { name, email, password, password_confirmation };
  //     const { data } = await register(user);
  //     console.log(data);
  //     if (data?.success === true) {
  //       nav("/login");
  //     }
  //   } catch (error) {
  //     console.log(error.data);
  //   }
  // };

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 character" : null,
    },
  });

  return (
    <div className=" flex h-screen justify-center items-center">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await register(values);
            // console.log(data);
            if (data?.success) {
              nav("/login")
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-96 flex flex-col gap-10 shadow-lg p-7"
      >
        <TextInput
          placeholder="Enter your name..."
          {...form.getInputProps("name")}
        />
        <TextInput
          placeholder="Enter your email..."
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Enter your password..."
          {...form.getInputProps("password")}
        />
        <PasswordInput
          placeholder="Password Confirm..."
          {...form.getInputProps("password_confirmation")}
        />
        <div className=" flex gap-3">
          <p>Already have an account?</p>
          <Link to={"/login"}>
            <p className=" text-blue-500">Login</p>
          </Link>
        </div>
        <button disabled={isLoading && true} type="submit" className=" bg-blue-500 text-white px-4 py-1">
          {isLoading ? <Loader className=" mx-auto block" color="dark" size="sm" />:"Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Register;
