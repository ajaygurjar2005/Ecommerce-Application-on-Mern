import React, { useState } from 'react'
import Layout from '../../components/layout/layout'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios, {} from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [store, setStore] = useState({
    name:"",
    email:"",
    password:'',
    phone:'',
    address:'',
    answer:''
  })
  const navigate = useNavigate()
  
  
  const handleChange = (e) => {
    setStore({...store,[e.target.name]:e.target.value})
  }
  
  const submitForm = async(e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:8080/api/v1/auth/register',store)
    .then((succes)=>{
      if(succes.data.success){
        toast.success(succes.data.msg)
        console.log(succes.data)
        
        navigate('/login')
      }
      else{
        toast.error(succes.data.msg)
      }
    }).catch((err)=>{
      console.log(err,'err')
    })
  }
  return (
    <Layout title={'Register - Ecommerce App'}>
    <section className="bg-gray-50 light:bg-gray-900 md:mt-[30px] md:mb-[30px]">
    <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Register Form
          </h1>
          <form className="space-y-4 md:space-y-6" action="" onSubmit={(e)=>submitForm(e)}>
            <div>
              
              <input
                type="text"
                onChange={(e)=>handleChange(e)}
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
             
              <input
                type="email"
                name="email"
                onChange={(e)=>handleChange(e)}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                onChange={(e)=>handleChange(e)}
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="number"
                onChange={(e)=>handleChange(e)}
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              
              <input
                type="textarea"
                name="address"
                onChange={(e)=>handleChange(e)}
                id="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your address"
                required
              />
            </div>
            <div>
              <input
                type="textarea"
                name="answer"
                onChange={(e)=>handleChange(e)}
                id="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="What is Your Favorite Sports"
                required
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
                to={'/login'}
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
  
    </Layout>
  )
}

export default Register
