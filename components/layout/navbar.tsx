import React from 'react'
import { Button } from '../ui/button'

const Navbar = () => {

  const links = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkında', href: '/about' },
    { name: 'Öğren', href: '/learn' },
    { name: 'Sınavlar', href: '/exams' },
  ]

  return (
    <nav className='py-6 flex items-center justify-between'>

      <div className='flex items-center gap-4'>

        <img src="/logo/logo.png" alt="navbar logo" className='w-12 h-12 mr-4'/>

        {
          links.map((link, index) => (
            <a key={index} href={link.href} className='text-text hover:text-orange-light transition-colors duration-200'>
              {link.name}
            </a>
          ))
        }

      </div>

      <Button
        variant='filled'
        href='/login'
        icon="pixelarticons:arrow-right"
      >
        Giriş Yap
      </Button>

    </nav>


  )
}

export default Navbar