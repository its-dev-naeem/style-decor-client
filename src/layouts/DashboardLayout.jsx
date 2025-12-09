import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Dashbord from "../pages/Dashboard/Dashbord";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
// import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-[1600px] mx-auto">
        <h1 className=" lg:hidden border-b text-center h-10 justify-center flex items-center">
          Dashboard
        </h1>
        <div className=" mx-auto flex">
          <DashboardSidebar></DashboardSidebar>
          <div className="m-5 w-full">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
