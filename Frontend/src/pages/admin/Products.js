import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import Adminmenu from "../../components/layout/Adminmenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(6);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      setProducts(data.products);
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went Wrong ");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="w-full md:flex">
        <div className="w-1/5">
          <Adminmenu />
        </div>
        <div className="w-4/5 flex flex-col mb-2">
          <h1 className="text-center text-[28px] text-bold mt-2 underline">
            All Products List
          </h1>
          <div className="grid grid-cols-1  md:grid-cols-3  gap-4 justify-center ">
            {products.map((data, index) => {
              return (
                <Link
                  to={`/dashboard/admin/product/${data.slug}`}
                  key={data._id}
                  className="product-link"
                >
                  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  md:ml-[0px] ml-[55px]">
                    <img
                      className="p-2 w-full h-[300px] rounded-t-lg"
                      src={`/api/v1/product/product-photo/${data._id}`}
                      alt="product image"
                    />
                    <div className="px-5 pb-5">
                      <Link href="">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {data.name}
                        </h5>
                      </Link>
                      <Link>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {data.description}
                        </h5>
                      </Link>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {data.price} $
                        </span>
                        <Link
                          
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Add to cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
