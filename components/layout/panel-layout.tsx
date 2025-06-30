import React from 'react'
import PanelSidebar from './panelSidebar'

interface PanelLayoutProps {
    children: React.ReactNode
}

const PanelLayout = ({ children }: PanelLayoutProps) => {
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
