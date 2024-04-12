import React from "react";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const Adminmenu = () => {
  const Categorise = [
    {
        name: "Create Category",
        link: "/dashboard/admin/create-category",
      },
      {
        name: "Create Product",
        link: "/dashboard/admin/create-product",
      },
      {
        name: "All Products",
        link: "/dashboard/admin/products",
      },
      {
        name: "Users",
        link: "/dashboard/admin/users",
      },
  ];
  const { auth } = useAuth();
  return (
    <div>
      <table className="table-auto ml-4 mt-2">
        <thead>
          <tr>
            <Link to={"/dashboard/admin"}>
              <th>Admin Panel</th>
            </Link>
          </tr>
        </thead>
        <tbody>
          <div className="ml-2 ">
            {Categorise.map((d) => {
              return (
                <tr key={d.id} className="">
                  <Link to={d.link}>
                    <td className="hover:underline">{d.name}</td>
                  </Link>
                </tr>
              );
            })}
          </div>
        </tbody>
      </table>
    </div>
  );
};

export default Adminmenu;
