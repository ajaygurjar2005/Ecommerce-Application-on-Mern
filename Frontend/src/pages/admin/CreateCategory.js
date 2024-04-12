import React from "react";
import Layout from "../../components/layout/layout";
import Adminmenu from "../../components/layout/Adminmenu";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name }
      );
      if (data.success) {
        toast.success(`${name} is created`);
        setName("")
        getAllCategory();
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went Wrong in input form");
    }
  };

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      console.log(response, "respose");
      if (response?.data?.success) {
        setCategories(response?.data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.success("Something went in getting categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("just try");
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
      toast.success("Something went in getting categories");
    }
  };

  const handleDelete = async (id) => {
    console.log("just try");
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${id}`);
      if (data.success) {
        toast.success(data.msg);
        getAllCategory();
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
      toast.success("Something went in getting categories");
    }
  };
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="w-full md:flex">
        <div className="w-1/5">
          <Adminmenu />
        </div>
        <div className="w-4/5 flex flex-col mb-2 mt-2">
          <div className="mb-2">Manage Category</div>
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
          <div className="relative overflow-x-auto">
            <table className="w-[80%] text-sm text-left rtl:text-right text-gray-500 white:text-gray-400 md:ml-2 ml-6">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer	 dark:text-white"
                    >
                      {category.name}
                    </th>
                    <td
                      className="px-6 py-4 primary hover:underline cursor-pointer	"
                      onClick={() => {
                        setVisible(true);
                        setUpdatedName(category.name);
                        setSelected(category)
                      }}
                    >
                      Edit
                    </td>
                    <td className="px-6 py-4 primary hover:underline cursor-pointer	" onClick={(e)=>handleDelete(category._id)}>
                      Delete
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
