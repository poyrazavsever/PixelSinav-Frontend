import React from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './navbar'
import Footer from './footer'
import TopSection from './topSection'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='min-h-screen flex flex-col justify-between'>

      <TopSection />

      <Toaster position="top-right" reverseOrder={false} />

      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />


    </div>
  )
}

export default Layout