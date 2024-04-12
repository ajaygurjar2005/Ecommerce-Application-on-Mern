import React from "react";
import Layout from "../../components/layout/layout";
import Usermenu from "../../components/layout/Usermenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="w-full md:flex">
        <div className="w-1/5">
          <Usermenu />
        </div>
        <div className="w-4/5 flex flex-col">
          <div className="text-[25px] ml-[50px]">
            <ul>
              <li>Name : {auth?.user?.name}</li>
              <li>Email : {auth?.user?.email}</li>
              <li>Address : {auth?.user?.address}</li>
            </ul> 
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
