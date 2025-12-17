import React from "react";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Dashbord = () => {
  return (
      <div className=" mx-auto flex flex-col justify-center items-center h-screen">
        <h1 className="font-bold text-6xl text-center justify-center"> Coming soon .....</h1>
        <h1><LoadingSpinner/></h1>
      </div>
  );
};

export default Dashbord;
 