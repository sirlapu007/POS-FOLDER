import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { formatDate, getAvatarName } from "../../utils"

const CustomerInfo = () => {
    const [dateTime, setDateTime] = useState(new Date());
  const customerData = useSelector(state => state.customer);

  return (
    <div className="flex items-center justify-between px-4 py-3">
    <div className="flex flex-col items-start">
      <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
        {customerData.CustomerName || "Customer Name"}
      </h1>
      <p className="text-md text-[#ababab] font-medium m1-1">
       #{customerData.orderId || "NA"}/ Dine in
      </p>
      <p className="text-md text-[#ababab] font-medium m1-1">
        {formatDate(dateTime)}
      </p>
    </div>
    <button className="bg-[#f6B100] text-xl font-bold rounded-lg">
      {getAvatarName(customerData.CustomerName) || "CN"}
    </button>
  </div>
  )
}

export default CustomerInfo;