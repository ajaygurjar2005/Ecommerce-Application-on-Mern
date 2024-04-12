import React from 'react'
import { Link } from 'react-router-dom';


const Usermenu = () => {
    const Categorise = [
        {
            name: "Profile",
            link: "/dashboard/user/profile",
          },
          {
            name: "Orders",
            link: "/dashboard/user/orders",
          },
      ];
  return (
    <div>
      <table className="table-auto ml-4 mt-2">
        <thead>
          <tr className='mt-4'>
            <Link to={'/dashboard/user'}>
              <th>User Dashboard</th>
            </Link>
          </tr>
        </thead>
        <tbody>
          <div className="ml-2 text-[18px] text-center">
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
  )
}

export default Usermenu
