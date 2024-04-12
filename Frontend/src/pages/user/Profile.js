import React, { useEffect } from "react";
import Layout from "../../components/layout/layout";
import Usermenu from "../../components/layout/Usermenu";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from './../../context/auth';

const Profile = () => {
  const [store, setStore] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const {auth,setAuth} = useAuth()


  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put("http://localhost:8080/api/v1/auth/profile", store);
      
      if (response.data.success) {
        console.log(response, "success");
        setAuth(response.data?.updatedUser);
        
        let locals = JSON.parse(localStorage.getItem('auth'));
        locals.user = response.data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(locals));
        
        
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error");
    }
  };
  

  const getAllValue = async() => {
    const {name,email,phone,address} = auth?.user
    setStore({
      name:name,
      address:address,
      email:email,
      phone:phone
    })  
  }
  useEffect(()=>{
    getAllValue()
  },[])

  return (
    <Layout title={"Your Profile"}>
      <div className="w-full md:flex">
        <div className="w-1/5">
          <Usermenu />
        </div>
        <div className="w-4/5 flex flex-col">
          <section className="bg-gray-50 light:bg-gray-900 md:mt-[30px] md:mb-[30px]">
            <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Update Details
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    action=""
                    onSubmit={(e) => submitForm(e)}
                  >
                    <div>
                      <input
                        type="text"
                        onChange={(e) => handleChange(e)}
                        name="name"
                        value={store.name}
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={store.email}
                        onChange={(e) => handleChange(e)}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        disabled
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        id="password"
                        placeholder="•••••••• must greater than 7"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        onChange={(e) => handleChange(e)}
                        name="phone"
                        id="phone"
                        value={store.phone}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your phone number"
                       
                      />
                    </div>
                    <div>
                      <input
                        type="textarea"
                        name="address"
                        value={store.address }
                        onChange={(e) => handleChange(e)}
                        id="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your address"
                        
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Submit
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                      Already have an account?{" "}
                      <Link
                        to={"/login"}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
