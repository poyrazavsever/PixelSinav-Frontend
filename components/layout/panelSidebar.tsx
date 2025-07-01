import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

interface NavItem {
  label: string
  icon: string
  href: string
  subItems?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    label: 'Ders İşlemleri',
    icon: 'pixelarticons:book-open',
    href: '',
    subItems: [
      { label: 'Ders Ekle', href: '/panel/lessons/add' },
      { label: 'Dersleri Yönet', href: '/panel/lessons/manage' },
      { label: 'Ders İçerikleri', href: '/panel/lessons/contents' }
    ]
  },
  {
    label: 'Sınav İşlemleri',
    icon: 'pixelarticons:file',
    href: '',
    subItems: [
      { label: 'Sınav Ekle', href: '/panel/exams/add' },
      { label: 'Sınavları Yönet', href: '/panel/exams/manage' }
    ]
  },
  {
    label: 'Kategori İşlemleri',
    icon: 'pixelarticons:align-justify',
    href:'',
    subItems: [
      { label: 'Kategori Ekle', href: '/panel/categories/add' },
      { label: 'Kategorileri Yönet', href: '/panel/categories/manage' }
    ]
  },
  {
    label: 'Ayarlar',
    icon: 'pixelarticons:command',
    href: '/panel/settings'
  }
]

const PanelSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
    setExpandedItems([]) // Collapse all subitems when sidebar is collapsed
  }

  const toggleSubItems = (label: string) => {
    setExpandedItems(current =>
      current.includes(label)
        ? current.filter(item => item !== label)
        : [...current, label]
    )
  }

  return (
    <motion.div
      className="h-screen bg-dark-800 border-r border-gray flex flex-col"
      animate={{ width: isCollapsed ? '80px' : '280px' }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-gray flex justify-center items-center">
        <Link href="/panel">
          <motion.img
            src="/logo/logo.png"
            alt="PixelSınav Logo"
            className="h-12"
            animate={{ scale: isCollapsed ? 0.8 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-2">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href ? item.href : ''}
                onClick={() => item.subItems ? toggleSubItems(item.label) : null}
                className={`w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-orange-primary/10 transition-colors
                  ${expandedItems.includes(item.label) ? 'bg-orange-primary/10' : ''}`}
              >
                <Icon icon={item.icon} className="w-6 h-6 text-orange-primary" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 text-left font-nunito"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!isCollapsed && item.subItems && (
                  <Icon
                    icon="pixelarticons:chevron-down"
                    className={`w-5 h-5 transition-transform duration-300
                      ${expandedItems.includes(item.label) ? 'rotate-180' : ''}`}
                  />
                )}
              </Link>

              {/* Sub Items */}
              <AnimatePresence>
                {!isCollapsed && item.subItems && expandedItems.includes(item.label) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="flex items-center gap-3 px-12 py-2 text-neutral-300 hover:text-white hover:bg-orange-primary/10 transition-colors font-nunito"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>

      {/* Toggle Link */}
      <button
        onClick={toggleSidebar}
        className="p-4 border-t border-gray flex justify-center items-center text-white hover:bg-orange-primary/10 transition-colors"
      >
        <Icon
          icon={isCollapsed ? 'pixelarticons:chevron-right' : 'pixelarticons:chevron-left'}
          className="w-6 h-6"
        />
      </button>
    </motion.div>
  )
}

export default PanelSidebar