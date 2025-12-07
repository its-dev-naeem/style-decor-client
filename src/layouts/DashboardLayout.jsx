import { Outlet } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
// import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='max-w-[1600px] mx-auto'>
        <div>
          {/* Outlet for dynamic contents */}

          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout