import { Icon } from '@iconify/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterButtonProps {
    value: string;
    placeholder: string;
    options: Array<{ label: string; value: string; }>;
    onChange: (value: string) => void;
}

export const FilterButton = ({ value, placeholder, options, onChange }: FilterButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full md:w-auto">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full md:w-[200px] px-4 py-3 bg-dark-800 border border-gray text-left text-white font-nunito flex items-center justify-between
          hover:border-orange-primary transition-all duration-300"
            >
                <span className="block truncate">
                    {value || placeholder}
                </span>
                <Icon
                    icon="pixelarticons:chevron-down"
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute z-10 w-full mt-2 bg-dark-800 border border-gray bg-background"
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onChange(option.label);
                                    setIsOpen(false);
                                }}
                                className="w-full px-4 py-3 text-left text-white hover:bg-orange-primary/10 transition-colors"
                            >
                                {option.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
