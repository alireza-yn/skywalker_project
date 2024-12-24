import Dashboard from '@/components/user/dashboard/Dashboard'
import React from 'react'

type Props = {}

const dashboard = (props: Props) => {

  const routes = [
    {
      label:"پروفایل",
      url:`${process.env.dashboard}/profile`
    }
  ]

  return (
    <main className='flex box-border p-5'>
      <section className='w-full'>
      
          <Dashboard />
       
      </section>
    </main>
  )
}

export default dashboard