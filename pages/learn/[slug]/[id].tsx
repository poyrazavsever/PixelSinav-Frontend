import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

const contentData = {
    content: `# Ders İçeriği - Aşağı Kaydırmalı

Rich Text Editor Component in Figma - Örnek Olarak Bunu Aldım

✓ Research about the WYSIWYG editor's best practices
○ Organize training sessions for working with rich text editor
○ Strategize the rich text editor component structure

- Responsive design         • Rich-text formatting        • Real-time editing        • WYSIWYG interface        • Font styles and sizes
- Text color and highlighting        • Text alignment        • Bullet and numbered lists        • Undo/redo functionality        • Image insertion and editing
- Hyperlink creation                                                                                           • Dark and light mode
✓ Research about the WYSIWYG editor's best practices
○ Organize training sessions for working with rich text editor
○ Strategize the rich text editor component structure

- Responsive design         • Rich-text formatting        • Real-time editing        • WYSIWYG interface        • Font styles and sizes
- Text color and highlighting        • Text alignment        • Bullet and numbered lists        • Undo/redo functionality        • Image insertion and editing
- Hyperlink creation                                                                                           • Dark and light mode

✓ Research about the WYSIWYG editor's best practices
○ Organize training sessions for working with rich text editor
○ Strategize the rich text editor component structure

- Responsive design         • Rich-text formatting        • Real-time editing        • WYSIWYG interface        • Font styles and sizes
- Text color and highlighting        • Text alignment        • Bullet and numbered lists        • Undo/redo functionality        • Image insertion and editing
- Hyperlink creation                                                                                           • Dark and light mode

`
}

const LearnContent = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="container mx-auto max-w-7xl pt-6 pb-16 font-nunito">
            <div className="relative">
                <div className="grid gap-8">

                    {/* Content Area */}
                    <div className="md-content max-h-[60vh] overflow-y-auto">
                        <ReactMarkdown>{contentData.content}</ReactMarkdown>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="flex items-center justify-between border-t border-gray pt-6">
                        <div className='flex items-center gap-6'>
                            <Button variant="outline">
                                Önceki
                            </Button>

                            <Button variant="filled" icon='pixelarticons:check'>
                                Tamamla
                            </Button>

                            <Button variant="outline">
                                Sonraki
                            </Button>
                        </div>

                        <div className='flex items-center gap-6'>

                            <Button
                                onClick={() => setShowModal(true)}
                                variant="outline"
                                icon="material-symbols:add-rounded"
                            >
                                Not Ekle
                            </Button>

                            <Button variant="filled" icon="pixelarticons:android">
                                Yapay zekaya Sor
                            </Button>

                        </div>


                    </div>
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {showModal && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 z-40"
                                onClick={() => setShowModal(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 100 }}
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                            >
                                <div className="w-[600px] rounded-lg bg-gray p-6">
                                    <h3 className="text-xl font-medium text-white mb-4">Not Al...</h3>
                                    <textarea
                                        className="w-full h-48 bg-gray rounded-lg p-4 text-white resize-none outline-none border border-gray-700 focus:border-orange-600 transition-colors"
                                        placeholder="Notlarınızı buraya yazın..."
                                    />
                                    <div className="flex justify-end gap-4 mt-4">
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Vazgeç
                                        </Button>
                                        <Button variant="filled">
                                            Kaydet
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default LearnContent
