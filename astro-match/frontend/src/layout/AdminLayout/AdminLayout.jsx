import React from 'react'
import AdminHeader from '../Header/adminHeader'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/footer'

const AdminLayout = () => {
  return (
    <>
    <AdminHeader/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default AdminLayout