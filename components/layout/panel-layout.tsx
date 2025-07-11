import React, { useEffect } from 'react'
import PanelSidebar from './panelSidebar'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

interface PanelLayoutProps {
    children: React.ReactNode
}

const PanelLayout = ({ children }: PanelLayoutProps) => {
    const router = useRouter()

    useEffect(() => {
        const checkTeacherRole = () => {
            const userStr = localStorage.getItem('user')
            if (!userStr) {
                toast.error('Giriş yapmanız gerekmektedir.')
                router.push('/auth/login')
                return
            }

            const user = JSON.parse(userStr)
            if (!user.roles?.includes('teacher')) {
                toast.error('Panel erişimi için öğretmen olmanız gerekmektedir.')
                router.push('/become-teacher')
                return
            }
        }

        checkTeacherRole()
    }, [router])

    return (
        <div className="flex h-screen bg-dark">
            <PanelSidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default PanelLayout
