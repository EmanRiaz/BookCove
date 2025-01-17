import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

export const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("userId"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change=(e)=>{
    const {name,value} =e.target;
    setValue({...Value,[name]:value});
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/auth/getuserInfo/${localStorage.getItem(
          "userId"
        )}`,
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);
  const submitAddress = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID is not available");
        return;
      }
  
      const response = await axios.put(
        `http://localhost:5000/api/auth/update-address/${userId}`,
        Value,
        { headers }
      );
      console.log(response.data.message);
      alert("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error.response?.data || error.message);
      alert("Failed to update address. Please try again.");
    }
  };
  
  return (
    <>
      {!ProfileData && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {ProfileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc">
          <h1 className="text-3xl md:text-3xl font-semibold text-zinc mb-8">
            Settings
          </h1>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <label className="w-24 font-medium" htmlFor="username">
                Username:
              </label>
              <p className="p-2 rounded bg-zinc mt-2 font-semibold flex-grow">
                {ProfileData.username}
              </p>
            </div>
            <div className="flex items-center">
              <label className="w-24 font-medium" htmlFor="email">
                Email:
              </label>
              <p className="p-2 rounded bg-zinc mt-2 font-semibold flex-grow">
                {ProfileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="address">Address</label>
            <textarea
              className="p-2 rounded bg-zinc text-black font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-yellow-500 text-black font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300 " onClick={submitAddress}>
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};
