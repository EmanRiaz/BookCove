import React from 'react'
import {Link} from "react-router-dom";
const BookCard = ({data}) => {
  console.log(data);
  return (
  <>
  <Link to ={`/view-book-details/${data._id}`}>
  <div className="bg-black rounded p-4 flex flex-col">
    <div className="bg-black rounded  flex items-center justify-center">
      <img src={data.url } alt="/" className="h-60"/>
    </div>
    <h2 className="mt-4 text -xl font-semibold">{data.title}</h2>
    <p className="mt-2 text-white font-semibold"><b>By :</b> {data.author }</p>
    <p className="mt-2 text-white font-semibold"><b>Rs</b>{data.price }</p>

  </div>

  </Link>
  </>
  )
}

export default BookCard
