import React from 'react'
import Layout from '../../components/layout/layout'
import Adminmenu from '../../components/layout/Adminmenu'
import { useAuth } from '../../context/auth'


const AdminDashboard = () => {
  const {auth} = useAuth()
  return (
    <Layout>
    <div className="w-full md:flex">
    <div className="w-1/5">
      <Adminmenu/>
    </div>
    <div className="w-4/5 d:flex flex-col">
      <div className="text-[25px] ml-[50px]">
      <h1>Name : {auth?.user?.name}</h1>
      <h1>Email : {auth?.user?.email}</h1> 
      <h1>Address : {auth?.user?.address}</h1>
      </div>
    </div>
  </div>
    </Layout>
  )
}

export default AdminDashboard
