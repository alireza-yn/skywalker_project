import Amoozeshi from "@/components/routes/projects/Amoozeshi/Amoozeshi";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  let fetchData = null;

  
    try {
      const response = await axios.get(
        `${process.env.server}/api/v1/create_project/`
       );
      fetchData = response.data;
    } catch (error) {

      console.error("Error fetching user data:", error);
    }
  

  return <Amoozeshi data={fetchData} />;
};

export default page;
