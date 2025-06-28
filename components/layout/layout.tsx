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
    <>

      <TopSection />
    
    
      <div className='max-w-7xl container mx-auto min-h-screen flex flex-col justify-between'>

        <Toaster position="top-right" reverseOrder={false} />

        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />


      </div>
    </>
  )
}

export default Layout