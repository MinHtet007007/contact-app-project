import { Button, Input, Loader, Table } from "@mantine/core";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contactApi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setContacts, setSearchTerm } from "../redux/services/contactSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Menu } from "@mantine/core";

const ContactTable = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  const [deleteContact] = useDeleteContactMutation();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactSlice.contacts);
  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);



  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await deleteContact({ id, token });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    dispatch(setContacts(data?.contacts?.data));
  }, [data]);

  const rows = contacts
    ?.filter((item) => {
      if (searchTerm === "") {
        return item;
      } else if (item?.name.toLowerCase().includes(searchTerm?.toLowerCase())) {
        return item;
      }
    })
    .map((contact) => (
      <tr key={contact.id}>
        <td>{contact.name}</td>
        <td>{contact.email === null ? "example@gmail.com" : contact.email}</td>
        <td>{contact.phone}</td>
        <td>{contact.address === null ? "Unknown" : contact.address}</td>
        <td>
          {/* <button
            onClick={() => deleteHandler(contact?.id)}
            className=" bg-red-500 text-white p-2"
          >
            Delete
          </button> */}
          <Menu transitionProps={{ transition: "rotate-right", duration: 150 }}>
            <Menu.Target>
              <Button className=" bg-blue-500">...</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Link to={`/userinfo/${contact?.id}`}>
                <Menu.Item>User Info</Menu.Item>
              </Link>
              <Link to={`/update/${contact?.id}`}>
                <Menu.Item>Update User Info</Menu.Item>
              </Link>
              <Menu.Item>
                <p
                  onClick={() => deleteHandler(contact?.id)}
                  className=" text-red-500 "
                >
                  Delete
                </p>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));

  


  if (isLoading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }
  return (
    <>
      <div className=" flex items-center gap-3 ms-5 ">
        <Link to={"/create"}>
          <button className=" bg-blue-500 text-white px-6 py-1 my-5 rounded">
            Create Contact
          </button>
        </Link>
      </div>
      <div className=" overflow-auto">
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </>
  );
};

export default ContactTable;
