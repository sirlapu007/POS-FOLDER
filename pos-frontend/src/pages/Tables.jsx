import { React, useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { tables } from "../constants/";
import { useQuery } from "@tanstack/react-query";
// import {keepProviderData } from "@tanstack/react-query";
import { getTables } from "../https"

const Tables = () => {
  const [status, setStatus] = useState("all");

  const { data:resData, isError }= useQuery({
    queryKey: ["tables"],
    queryFn: async () => await getTables(),
    placeholderData: (previousData) => previousData,
  });

  if(isError) {
    enqueueSnackbar("Somthing went wrong!", { variant: "error" })
  }

  const filteredTables = resData?.data?.data?.filter((table) => {
    if (status === "all") return true;
    return table.status.toLowerCase() === status.toLowerCase();
  });


  console.log(resData);
  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Tables
          </h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg ${
              status === "all" ? "bg-[#383838] rounded-lg px-5 py-2" : ""
            } rounded-lg px-5 py-2 font-semibold`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("Booked")}
            className={`text-[#ababab] text-lg ${
              status === "Booked" ? "bg-[#383838] rounded-lg px-5 py-2" :""
            } rounded-lg px-5 py-2 font-semibold`}
          >
            Booked
          </button>
        </div>
      </div>

      <div
         className="grid grid-cols-5 gap-3 p-16 py-4 overflow-y-scroll h-[650px] scrollbar-hide"
     // className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 py-6 overflow-y-auto h-[calc(100vh-160px)] custom-scrollbar"
      >
        {
            filteredTables?.map((table) =>{
                return (
                    <TableCard  
                    key={table._id}
                    id={table._id} 
                    name={table.tableNo} 
                    status={table.status} 
                    initials={table?.currentOrder?.currentDetails?.name || ""} 
                    seats={table.seats}
                    />
                )
            })
        }
      </div>
      <BottomNav />
    </section>
  );
};

export default Tables;
