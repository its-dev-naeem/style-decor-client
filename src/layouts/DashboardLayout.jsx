import { Outlet } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
// import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    <div className=''>
      <Navbar></Navbar>
      <div>
        <div>
          {/* Outlet for dynamic contents */}

          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout