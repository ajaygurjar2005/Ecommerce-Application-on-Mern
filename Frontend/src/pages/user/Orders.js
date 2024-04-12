import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import Usermenu from "../../components/layout/Usermenu";
import { useAuth } from "../../context/auth";
const Orders = () => {
  const { auth } = useAuth();
  const totalPrice = () => {
    let total = 0;
    originalData.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const store = localStorage.getItem("orders");
  const originalData = JSON.parse(store);
  console.log(originalData, "origin");

  return (
    <Layout title={"Yours Orders"}>
      <div className="w-full md:flex">
        <div className="w-1/5">
          <Usermenu />
        </div>
        <div className="w-4/5 flex flex-col">
          <div className="text-[30px] text-center">
            {auth?.token ? (
              <div className="h-auto bg-gray-100 pt-10">
                <h1 className="mb-10 text-center text-2xl font-bold">
                  All Orders
                </h1>
                <h1 className="mb-10 text-center text-2xl font-bold">
                  Total Amount = $ {totalPrice() -  0.1 * totalPrice()}
                </h1>
                {originalData.map((data) => (
                  <div
                    key={data._id}
                    className="mx-auto max-w-5xl justify-center px-2 md:flex md:space-x-2 xl:px-0"
                  >
                    <div className="rounded-lg md:w-2/3">
                      <div className="justify-between mb-6 rounded-lg bg-white p-2 shadow-md sm:flex sm:justify-start">
                        <img
                          className="p-2 w-[200px] h-[170px] rounded-t-lg"
                          src={`/api/v1/product/product-photo/${data._id}`}
                          alt="product image"
                        />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div className="mt-5 sm:mt-0">
                            <h2 className="text-lg font-bold text-gray-900 mt-4">
                              {data.name}
                            </h2>
                            <h2 className="text-lg font-bold text-gray-900">
                              {data.description.substring(0, 20)} ...
                            </h2>
                            <p>
                              <del className="text-gray-900 font-bold mr-4">
                                ${data.price}
                              </del>
                              ${data.price - 0.1 * data.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
