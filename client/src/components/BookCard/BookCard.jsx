import React from 'react'
import {Link} from "react-router-dom";
const BookCard = ({data}) => {
  console.log(data);
  if (!data) return null; // Safeguard against undefined `data`

  return (
  <>
 <Link to ={`/view-book-details/${data._id}`}>
  <div className="bg-black rounded p-2 flex flex-col ">
    <div className="bg-white rounded  flex items-center justify-center">
      <img src={data.url } alt="/" className="h-64"/>
    </div>
    <h2 className="mt-3  text-yellow-400 text-2xl font-bold">{data.title}</h2>
    <p className="mt-2  text-white font-normal text-lg hover:text-yellow-400"><b>By :</b> {data.author }</p>
    <p className="mt-2 text-white font-normal text-lg hover:text-yellow-400"><b>Rs : </b>{data.price }</p>

  </div>

  </Link>
  </>
  )
}

export default BookCard
