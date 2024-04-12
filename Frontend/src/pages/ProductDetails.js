import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const [store, setStore] = useState({});
  const slug = useParams();
  const [relatedProduct, setRelatedProduct] = useState([]);

  const getSingleproduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${slug.slug}`
      );
      setStore(data?.product);
      getSimilarProduct(data.product._id, data.product.category._id);
      console.log(data, "data");
    } catch (err) {
      console.log(err);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.product);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (slug?.slug) {
      getSingleproduct();
    }
  }, [slug?.slug]);

  return (
    <Layout>
      <section className="container mx-auto p-10 md:p-20 antialiased">
        <article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-3xl group cursor-pointer transform duration-500">
          <img
            src={`/api/v1/product/product-photo/${store._id}`}
            alt="Product_photo"
            height={"250px"}
            width={"280px"}
            className="img img-responsive"
          />
          <div className="">
            <div className="p-5 pb-8">
              <h1 className="text-2xl font-semibold text-gray-800 mt-4">
                {store.name}
              </h1>
              <p className="text-xl text-gray-400 mt-2 leading-relaxed">
                description : {store.description}
              </p>
            </div>
            <div className="bg-blue-50 p-5">
              <div className="sm:flex sm:justify-between">
                <div>
                  <div className="text-lg text-gray-700">
                    <del className="text-gray-900 font-bold mr-2">
                      {store.price}
                    </del>{" "}
                    $ {store.price - 0.1 * store.price}
                  </div>
                  <div className="flex items-center">
                    <div className="text-gray-600 text-sm md:text-base mt-1">
                      Category : {store.category?.name}
                    </div>
                  </div>
                </div>
                <button className="mt-3 md:ml-20 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-purple-700 hover:bg-purple-600 font-bold text-white md:text-lg rounded-lg shadow-md">
                  Add to Cart
                </button>
              </div>
              <div className="mt-3 text-gray-600 text-sm md:text-sm">
                *Places to visit: Harmara sikar road Jaipur
              </div>
            </div>
          </div>
        </article>
      </section>
      <div className="ml-4 mb-2">
        <h1 className="text-center text-[28px] text-bold mt-2">
          Similar Products
        </h1>
        <h1 className="text-center text-[28px] text-bold mt-2   ">
        {relatedProduct.length < 1 && <p>No Similar Product Found</p>}
      </h1>
        

        <div className="grid grid-cols-1  md:grid-cols-3  gap-4 justify-center mt-2">
          {relatedProduct.map((data, index) => {
            return (
              <div
                key={index}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  md:ml-[0px] ml-[55px]"
              >
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
                  <Link href="">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {data.description.substring(0, 20)} ...
                    </h5>
                  </Link>
                  <div className="flex items-center mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {data.price} $
                    </span>
                  </div>
                  <div className="flex">
                    <Link
                      to={`/product/${data.slug}`}
                      className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      More Details
                    </Link>
                    <Link className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">
                      Add to Cart
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
