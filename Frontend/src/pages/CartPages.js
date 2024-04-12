import React from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CartPages = () => {
  const [cart, setCart] = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const removeCartItem = (pid) => {
    try {
      const myCarts = [...cart];
      const productIndex = myCarts.findIndex((item) => item._id === pid);
      myCarts.splice(productIndex, 1);
      localStorage.setItem("cart", JSON.stringify(myCarts));
      setCart(myCarts);
      // toast.success("Product Remove Successfully From Cart"); // Assuming 'toast' is defined elsewhere
    } catch (err) {
      console.log(err);
    }
  };

  const makePayment = async () => {
    try {
      const store = localStorage.getItem("orders");
      const preStore = JSON.parse(store);
      console.log(preStore, "prestore");

      if (preStore === null) {
        localStorage.setItem("orders", JSON.stringify(cart));
      } 
      else {
        for (let i = 0; i < cart.length; i++) {
          preStore.push(cart[i]);
          localStorage.setItem('orders',JSON.stringify(preStore))
        }
      }

      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
    } catch (err) {
      console.log(err);
      toast.error("Error");
    }
  };

  const totalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  return (
    <Layout>
      <h1 className="text-center text-4xl mt-4">
        Hello {auth?.token && auth?.user?.name}
      </h1>
      <div className="text-center text-2xl">
        {cart.length > 0
          ? `You have ${cart.length} item${
              cart.length > 1 ? "s" : ""
            } in your cart${
              auth?.token ? "" : ", please login to checkout your cart"
            }`
          : "Your cart is empty."}
      </div>
      <div className="w-full md:flex p-8">
        <div className="w-3/5 relative md:ml-[0px] ml-[60px]">
          {auth?.token ? (
            <div className="h-auto bg-gray-100 pt-10">
              <h1 className="mb-10 text-center text-2xl font-bold">
                Cart Items
              </h1>
              {cart.map((data) => (
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
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="flex items-center space-x-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              onClick={() => removeCartItem(data._id)}
                              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="w-1/5 flex flex-col mb-2 mt-2 ml-4 text-center">
          <h1 className="text-[30px]">Cart Summary</h1>
          <h1 className="text-[18px]">Total | Checkout | payment</h1>
          <hr />
          <h2>Total: {totalPrice() - 0.1 * totalPrice()}</h2>
          {auth?.token ? (
            <>
              <h1>Current Address</h1>
              <h2>{auth?.user?.address}</h2>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
              <button
                className="text-black mt-4 bg-green-700 hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => makePayment()}
              >
                Make Payment
              </button>
            </>
          ) : (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() =>
                navigate("/login", {
                  state: "/cart",
                })
              }
            >
              please login to checkout{" "}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPages;
