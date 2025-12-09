import React from "react";

const ManageDecorators = () => {
  return (
    <div className="min-h-screen w-full bg-base-200 rounded-2xl p-4 md:p-6">
      {/* Header */}
      <div className="border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-3 py-4 px-2">
        <h1 className="font-bold text-2xl">User Management</h1>

        <select
          defaultValue="All User"
          className="select select-bordered w-full md:w-52"
        >
          <option>All User</option>
          <option>User</option>
          <option>Decorator</option>
          <option>Admin</option>
        </select>
      </div>

      {/* User Table */}
      <div className="rounded-2xl mt-6 overflow-x-auto">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 font-semibold bg-base-100 rounded-xl shadow-md text-center">
          <span className="py-3 border rounded-l-xl col-span-1">No</span>
          <span className="py-3 border col-span-2">Avatar</span>
          <span className="py-3 border col-span-3">Name</span>
          <span className="py-3 border col-span-3">Email</span>
          <span className="py-3 border col-span-1">Role</span>
          <span className="py-3 border rounded-r-xl col-span-2">Edit Role</span>
        </div>

        {/* USERS LIST */}
        <div className="mt-3 space-y-3">

          {/* User Row */}
          {/* Single Row Component */}
          <div className="bg-base-100 shadow-md rounded-xl p-4 grid md:grid-cols-12 grid-cols-1 gap-4 items-center">

            {/* Mobile Labels */}
            <span className="md:hidden font-semibold">User No: 1</span>

            <span className="md:col-span-1 hidden md:flex justify-center">
              1
            </span>

            <div className="md:col-span-2 flex justify-center">
              <img
                className="h-16 w-16 rounded-full border bg-amber-50"
                src="ss"
                alt="avatar"
              />
            </div>

            <div className="md:col-span-3 text-center md:text-left">
              <p className="font-semibold">Md Shakil</p>
              <p className="md:hidden text-sm opacity-70">User</p>
            </div>

            <div className="md:col-span-3 text-center md:text-left">
              <p className="opacity-80">shakilshorna@gmail.com</p>
            </div>

            <div className="md:col-span-1 text-center hidden md:block">
              User
            </div>

            <div className="md:col-span-2 flex justify-center md:justify-end">
              <select className="select select-bordered w-full md:w-40">
                <option>User</option>
                <option>Decorator</option>
                <option>Admin</option>
              </select>
            </div>
          </div>

          {/* Second Row */}
          <div className="bg-base-100 shadow-md rounded-xl p-4 grid md:grid-cols-12 grid-cols-1 gap-4 items-center">

            <span className="md:hidden font-semibold">User No: 2</span>

            <span className="md:col-span-1 hidden md:flex justify-center">
              2
            </span>

            <div className="md:col-span-2 flex justify-center">
              <img
                className="h-16 w-16 rounded-full border bg-amber-50"
                src="ss"
                alt="avatar"
              />
            </div>

            <div className="md:col-span-3 text-center md:text-left">
              <p className="font-semibold">Md Mushfiqur</p>
              <p className="md:hidden text-sm opacity-70">Admin</p>
            </div>

            <div className="md:col-span-3 text-center md:text-left">
              <p className="opacity-80">mdmushfiqur@gmail.com</p>
            </div>

            <div className="md:col-span-1 text-center hidden md:block">
              Admin
            </div>

            <div className="md:col-span-2 flex justify-center md:justify-end">
              <select className="select select-bordered w-full md:w-40">
                <option>User</option>
                <option>Decorator</option>
                <option>Admin</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManageDecorators;
