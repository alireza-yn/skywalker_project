import Dashboard from '@/components/routes/user/dashboard/Dashboard'
import { headers, performRequest } from '@/lib/api'
import axios from 'axios'
import React from 'react'
import Cookies from 'js-cookie'
import { cookies } from 'next/headers'
type Props = {}

const  dashboard = async (props: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  let fetchData = null;

  if (token) {
    try {
      const response = await axios.get(`${process.env.server}/auths/user_info/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData = response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  return (
    <main className='flex box-border p-5 relative'>
      <section className='w-full absolute top-16 '>
      
          <Dashboard  user={fetchData}/>
       
      </section>
    </main>
  )
}

export default dashboard