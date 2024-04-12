import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout.js";

import { toast } from "react-toastify";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Prices } from "../components/Prices.js";
import { useCart } from "../context/Cart.js";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useCart();
  

  const setItem = (data) => {
    for(let i = 0; i < cart.length; i++) {
      if(cart[i] === data) {
        toast.success("Item already added to Cart");
        return; 
      }
    }
    setCart([...cart, data]); 
    localStorage.setItem('cart', JSON.stringify([...cart, data])); 
    toast.success("Item added to cart successfully");
  }

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false)
      setProducts(data.product);
      console.log(data);
    } catch (err) {
      setLoading(false)
      console.log(err);
      toast.error("Something Went Wrong to getting Products ");
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      console.log(response, "respose");
      if (response?.data?.success) {
        setCategories(response?.data?.category);
        console.log(response, "res");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting categories");
    }
  };

  //total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong in total");
    }
  };

  useEffect(()=>{
    if(page === 1) return;
    loadMore()
  },[page])
  const loadMore = async() => {
    try{
      setLoading(true)
      const {data} = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products,...data?.product])
    }
    catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong in filter");
    }
  };

  return (
    <Layout title={"All Product-Best offers"}>
      <div className="w-full md:flex">
        <div className="w-1/5">
          <h1 className="text-center text-[25px] text-bold mt-12 underline">
            Filter by Category
          </h1>
          <div className="flex flex-col ml-4">
            {categories.map((c) => {
              return (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              );
            })}
          </div>
          <h1 className="text-center text-[25px] text-bold mt-6 underline">
            Filter by Price
          </h1>
          <div className="flex flex-col ml-4">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => {
                return (
                  <div key={p._id}>
                    {console.log(p.name)}
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                );
              })}
            </Radio.Group>
          </div>
          <div className="flex flex-col ml-4">
            <button
              type="button"
              class=" mt-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              onClick={() => window.location.reload()}
            >
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="w-4/5 flex flex-col">
          <div className="">
            <h1 className="text-center text-[28px] text-bold mt-2 underline">
              All Products List
            </h1>
            <div className="grid grid-cols-1  md:grid-cols-3  gap-4 justify-center ">
              {products.map((data, index) => {
                return (
                  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  md:ml-[0px] ml-[55px]">
                    <img
                      className="p-2 hover:p-0 w-full h-[300px] rounded-t-lg"
                      src={`/api/v1/product/product-photo/${data._id}`}
                      alt="product image"
                    />
                    <div className="px-5 pb-5">
                      <Link href="">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {data.name}
                        </h5>
                      </Link>
                      <Link >
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {data.description.substring(0, 20)} ...
                        </h5>
                      </Link>
                      <div className="flex items-center mb-4">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        <p>
                        <del className="font-bold mr-4">
                          ${data.price}
                        </del>
                        ${data.price - 0.1 * data.price}
                      </p>
                        </span>
                      </div>
                      <div className="flex">
                        <Link
                        to={`/product/${data.slug}`}
                          className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          More Details
                        </Link>
                        <Link className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                         onClick={()=>setItem(data)}>
                          Add to Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center  text-[28px] text-bold mt-4 underline text-black">
              {products && products.length < total && (
                <button className="underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ... " : "LoadMore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
