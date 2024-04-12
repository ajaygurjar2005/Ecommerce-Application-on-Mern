import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import Adminmenu from "../../components/layout/Adminmenu";
import axios from "axios";
const Users = () => {
  const [storeUsers, setStoreUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("auth"));
      console.log(token, "token");
      const response = await axios.get(
        "http://localhost:8080/api/v1/auth/get-users",
        {
          headers: {
            Authorization: `${token.token}`, // Set the token to Authorization header
          },
        }
      );
      setStoreUsers(response.data.response, "store"); // Assuming response.data contains the data you want to log
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="w-full md:flex">
        <div className="w-1/5">
          <Adminmenu />
        </div>
        <div className="w-4/5 flex flex-col">
          <h1 className="text-center mt-2 text-[30px]">All Users</h1>
          <div className="relative overflow-x-auto mr-2 mb-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {storeUsers.map((data) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data.name}
                      </th>
                      <td className="px-6 py-4">{data.email}</td>
                      <td className="px-6 py-4">{data.phone}</td>
                      <td className="px-6 py-4">{data.address}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
