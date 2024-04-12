import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import Adminmenu from "../../components/layout/Adminmenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");

  const [id, setId] = useState("");
  const [shipping, setShipping] = useState("shipping_option"); // Default value for shipping state

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      console.log(response, "response");
      if (response?.data?.success) {
        setCategories(response?.data?.category);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting categories");
    }
  };

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setId(data.product._id);
      setCategory(data.product.category._id);
      setQuantity(data.product.quantity);
      setPhoto(data.product.photo);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.msg);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went Wrong");
    }
  };

  const handleDelete = async() => {
    try{
        let answer = window.prompt("Are You Sure Want to Delete this product ? type yes ")
        if(!answer) return;
        const {data} = await axios.delete(`http://localhost:8080/api/v1/product/product/${id}`)
        if (data?.success) {
            toast.success("product Delete successfully");
            navigate("/dashboard/admin/products");
          } else {
            toast.error(data?.msg);
          }
    }
    catch(err){
        console.log(err)
        toast.error("Something went Wrong")
    }
  }

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="w-full md:flex">
        <div className="w-1/5">
          <Adminmenu />
        </div>
        <div className="w-4/5 flex flex-col">
          <h1 className="text-center text-[28px] text-bold mt-2 underline w-[80%]">
            Update Product
          </h1>
          <div className="mt-4 w-[100%]">
            <Select
              bordered={false}
              placeholder="Select a Category"
              size="large"
              showSearch
              className="form-select mb-2 w-[80%] text-center border-2"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mt-6">
              <label className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mt-4 text-center w-[80%]">
              {photo ? (
                <div className="flex justify-center">
                  <img
                    src={
                      photo instanceof File
                        ? URL.createObjectURL(photo)
                        : `/api/v1/product/product-photo/${id}`
                    }
                    alt="Product_photo"
                    height={"250px"}
                    width={"280px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="flex justify-center">
                  <img
                    src={`/api/v1/product/product-photo/${id}`}
                    alt="Product_photo"
                    height={"250px"}
                    width={"280px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                value={name}
                placeholder="write product name"
                className="form-control mt-2 w-[80%]  border-2 p-2"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="textarea"
                value={description}
                placeholder="write description"
                className="form-control mt-2 w-[80%]  border-2 p-2"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="number"
                value={price}
                placeholder="write a price"
                className="form-control mt-2 w-[80%]  border-2 p-2"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="form-control mt-2 w-[80%]  border-2 p-2"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
            <div>
              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="form-select mt-2 w-[80%] text-center border-2"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
              </Select>
            </div>
            <div>
              <button
                onClick={(e) => handleUpdate(e)}
                className=" mt-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                UPDATE PRODUCT
              </button>
              <button
                onClick={(e) => handleDelete(e)}
                className=" mt-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
