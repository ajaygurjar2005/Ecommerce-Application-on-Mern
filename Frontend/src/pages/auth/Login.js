import React, {  useState ,useEffect} from "react";

import Layout from "../../components/layout/layout.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate , useLocation} from "react-router-dom";
import { useAuth } from "../../context/auth.js";


const Login = () => {
  const {auth,setAuth }= useAuth();
  const [store, setStore] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  let check = 1;

  useEffect(() => {
    if (check === 1) {
      check = 2;
    } else {
      window.location.reload();
    }
  }, []);
  

  const submitForm = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("http://localhost:8080/api/v1/auth/login", store)
      .then((succes) => {
        if (succes.data.success) {
          toast.success(succes.data.msg);
          console.log(succes.data);
          setAuth({
            user:succes.data.user,
            token:succes.data.token,
          })
          localStorage.setItem("auth",JSON.stringify(succes.data))
          navigate(location.state || "/");
        } else {
          toast.error(succes.data.msg);
        }
      })
      .catch((err) => {
        console.log(err, "err");
        toast.error(err.data);
      });
  };
  return (
    <Layout title={"Login - Ecommerce App"}>
      <section className="bg-gray-50 light:bg-gray-900 md:mt-[20px] md:mb-[20px]">
        <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto  lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 space-y-4 md:space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login Form
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action=""
                onSubmit={(e) => submitForm(e)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  onClick={()=>{navigate('/forgot-password')}}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Forgot Password
                </button>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Submit
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                  if you have no account ?{" "}
                  <Link
                    to={'/register'}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
