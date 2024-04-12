import React from 'react'

const CategoryForm = ({handleSubmit,setValue,value}) => {
  return (
    <div className="w-full max-w-xs">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="category name" 
      onChange={(e)=>setValue(e.target.value)}
      value={value}/>
    </div>
    <div className="flex items-center justify-between">
      <button onClick={(e)=>handleSubmit(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Submit
      </button>
    </div>
  </form>
</div>
  )
}

export default CategoryForm
