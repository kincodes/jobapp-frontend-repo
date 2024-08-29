import React from 'react'
import { Outlet } from 'react-router'
import DashNav from './DashNav'
const MainLayout = () => {
  return (
    <div>
        <DashNav/>
        <main>
            <Outlet/>
        </main>
      
    </div>
  )
}

export default MainLayout
