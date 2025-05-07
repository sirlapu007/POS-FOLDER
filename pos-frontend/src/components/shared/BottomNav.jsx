import React from "react";
import { FaHome } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { IoReorderThreeOutline } from "react-icons/io5";
import { MdTableBar } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
import {useDispatch} from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();

  const openModal = () => setisModalOpen(true);
  const closeModal = () => setisModalOpen(false);

  const increment = () => {
    if(guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  }
  const decrement = () => {
    if(guestCount <= 0) return;
    setGuestCount((prev) => prev - 1);
  }

  const isActive = (path) => location.pathname === path;

  const handleCreateOrder = () => {
    //send data to store
    dispatch(setCustomer({name, phone, guests: guestCount}))
    navigate("/tables");
  }
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
      <button
        onClick={() => navigate("/")}
        className={`flex items-center justify-center font-bold
        ${ isActive("/") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] rounded-[20px]`}
      >
        <FaHome className="inline mr-2" sixe={20} />
        <p>Home</p>
      </button>
      <button
        onClick={() => navigate("/orders")}
        className={`flex items-center justify-center font-bold
          ${ isActive("/orders") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] rounded-[20px]`}
      >
        <IoReorderThreeOutline className="inline mr-2" sixe={20} />
        <p>Orders</p>
      </button>
      <button
        onClick={() => navigate("/tables")}
        className={`flex items-center justify-center font-bold
          ${ isActive("/tables") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] rounded-[20px]`}
      >
        <MdTableBar className="inline mr-2" sixe={20} />
        <p>Tables</p>
      </button>
      <button className="text-[#ababab] flex items-center justify-center w-[200px]">
        <CiCircleMore className="inline mr-2" sixe={20} />
        <p>More</p>
      </button>
      <button
        disabled = {isActive("/tables") || isActive("/menu")}
        onClick={openModal}
        className="absolute bottom-6 bg-[#F6B100] text-[#f5f5f5] items-center rounded-full p-3"
      >
        <BiSolidDish size={30} />
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create Order"
      >
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">Customer Name</label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter customer name" name="" id="" 
            className="bg-transparent flex-1 text-white focus:outline-none"  />
          </div>
        </div>
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Customer phone</label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="+91-9999999999" name="" id="" 
            className="bg-transparent flex-1 text-white focus:outline-none"  />
          </div>
        </div>
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Guest</label>
          <div className="flex items-center justify-between rounded-lg p-3 px-4 bg-[#1f1f1f]">
           <button onClick={decrement}  className="text-yellow-500 text-2xl cursor-pointer">&minus;</button>
           <span className="text-white">{guestCount} Person</span>
           <button onClick={increment}  className="text-yellow-500 text-2xl cursor-pointer">&#43;</button>
          </div>
        </div>
        <button onClick={handleCreateOrder} className="w-full bg-[#f6B100] text-[#f5f5f5] rounded-lg py-3 mt-8
        hover:bg-yellow-700">
          Create Order
        </button>
      </Modal>
    </div>
  );
};

export default BottomNav;
