import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export const EditBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("userId"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const {id}=useParams();
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/books/add-book",
        Data,
        { headers }
      );
      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
      alert(response.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      alert(errorMessage);
    }
  };

 
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        if (response.data && response.data.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);
  return (
    <div className="h-[100%] p-0 md:p-4">
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc mb-8'>
            Edit Book
        </h1>
        <div className='p-4 bg-zinc rounded'>
        <div>
            <label htmlFor=""className='text-zinc'>
                Image
            </label>
            <input 
            type="text"
            className="w-full mt-2 bg-zinc text-zinc p-2 outline-none"
            placeholder='url of image '
            name="url"
            required
            value={Data.url}
            onChange={change}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-zinc'>
             Title of Book
            </label>
            <input 
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="Title of Book "
            name="title"
            requiredvalue={Data.title}
            onChange={change}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor=''className='text-zinc-400'>
                Author of Book 
            </label>
            <input 
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="Author of Book "
            name="author"
            requiredvalue={Data.author}
            onChange={change}
            />
        </div>
        <div className='mt-4 flex gap-4'>
            <div className='w-3/6'>
            <label htmlFor=" " className='text-zinc-400'>
                Language
            </label>
         <input 
          type="text"
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder="language of book"
          name="language"
          requiredvalue={Data.language}
          onChange={change}
          />
            </div>
            <div className='w-3/6'>
            <label htmlFor="" className='text-zinc-400'>
                Price
            </label>
            <input 
            type="number"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="Price of Book"
            name="price"
            required 
            value={Data.price}
            onChange={change}
            />
            </div>
            </div>
            <div className='mt-4'>
                <label htmlFor=""className='text-zinc-400'>
                    Description of Book
                </label>
                <textarea
                className='w-full mt-2 bg-zinc-900 p-2 outline-none'
                rows="5"
                placeholder='Description of book '
                name='desc'
                required
                value={Data.desc}
                onChange={change}
                />
            </div>
            <button 
            className='mt-4 px-3 bg-yellow-400 text-white font-semibold py-2 rounded hover:bg-blue'
            onClick={submit}>
                Upload Book
            </button>
        </div>
    </div>
  )
}

