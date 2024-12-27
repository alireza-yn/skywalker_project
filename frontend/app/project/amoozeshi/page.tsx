import Amoozeshi from "@/components/routes/projects/Amoozeshi/Amoozeshi";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let j_token:any = jwtDecode(token || "")
  ;
  let fetchData = null;

  if (token) {
    try {
      const response = await axios.get(
        `${process.env.server}/api/v1/create_project/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData = response.data;
      console.log(fetchData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return <Amoozeshi data={fetchData} user_id={j_token.user_id}/>;
};

export default page;
