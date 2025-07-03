import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

const contentData = {
    content: `# Rich Text Editor Component in Figma

Research about the WYSIWYG editor's best practices

## Key Features to Implement:

- Responsive design
- Rich-text formatting
- Text color and highlighting
- Text alignment
- Bullet and numbered lists
- Real-time editing
- WYSIWYG interface
- Font styles and sizes
- Image insertion and editing
- Undo/redo functionality
- Hyperlink creation
- Dark and light mode`
}

const LearnContent = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="container mx-auto max-w-7xl py-16 font-nunito">
            <div className="relative">
                <div className="grid gap-8">
                    {/* Content Area */}
                    <div className="rounded-lg bg-gray p-8">
                        <div className="prose prose-invert max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: contentData.content }} />
                        </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="flex items-center justify-between">
                        <Button variant="outline" icon="material-symbols:arrow-back-rounded">
                            Önceki
                        </Button>

                        <div className="flex items-center gap-4">
                            <Button variant="outline">
                                Vazgeç
                            </Button>
                            <Button variant="filled" icon="material-symbols:check-circle-outline-rounded">
                                Kaydet
                            </Button>
                        </div>

                        <Button variant="outline" icon="material-symbols:arrow-forward-rounded">
                            Sonraki
                        </Button>
                    </div>

                    {/* Add Content Button */}
                    <div className="fixed bottom-8 right-8">
                        <Button 
                            onClick={() => setShowModal(true)}
                            className="rounded-full !p-4"
                            variant='outline'
                            icon="material-symbols:add-rounded"
                        >Not Ekle</Button>
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
                                    <h3 className="text-xl font-semibold text-white mb-4">Not Al...</h3>
                                    <textarea 
                                        className="w-full h-48 bg-gray-800 rounded-lg p-4 text-white resize-none"
                                        placeholder="Notlarınızı buraya yazın..."
                                    />
                                    <div className="flex justify-end gap-4 mt-4">
                                        <Button 
                                            variant="outline" 
                                            onClick={() => setShowModal(false)}
                                        >
                                            Vazgeç
                                        </Button>
                                        <Button>
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
