import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

const Userinfo = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data: singleContact } = useGetSingleContactQuery({ id, token });
//   console.log(singleContact);
  return (
    <div>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        className=" flex flex-col h-screen items-center justify-center"
        withBorder
      >
        <Card.Section>
          <Image
            src={
              singleContact?.contact?.photo === null
                ? "https://img.freepik.com/free-icon/user_318-159711.jpg"
                : singleContact?.contact?.photo
            }
            width={160}
            alt="Norway"
          />
        </Card.Section>

        <Text size="lg">{singleContact?.contact?.name}</Text>
        <Text size="lg">{singleContact?.contact?.phone}</Text>
        <Text size="lg">{singleContact?.contact?.email}</Text>
        <Text size="lg">{singleContact?.contact?.address}</Text>
        <Link to={"/"}>
          <Button className=" bg-blue-500 text-white" mt="md" radius="md">
            Back
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default Userinfo;
