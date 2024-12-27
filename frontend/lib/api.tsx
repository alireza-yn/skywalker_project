import axios from "axios";
import Cookies from "js-cookie";



export const headers = ()=>{
  
  return {
    Authorization:"Bearer "+Cookies.get("token"),
    "Content-Type": "application/json"
  }
}


export async function fetchMultipleRequests(urls:string[]) {
    try {
      const responses = await axios.all(urls.map((url) => axios.get(url)));
      const data = responses.map((response) => response.data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  

export const performRequest = async (url: string) => {
  try {
    const response = await axios.get(url,{
      headers: headers()
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};