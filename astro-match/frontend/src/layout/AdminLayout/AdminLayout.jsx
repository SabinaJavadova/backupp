import React from 'react'
import AdminHeader from '../Header/adminHeader'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/footer'
import Dashboardd from '../../pages/Dashboard/Dashboard'

const AdminLayout = () => {
  return (
    <>
    <AdminHeader/>
    <Dashboardd/>
    <Footer/>
    </>
  )
}

export default AdminLayout