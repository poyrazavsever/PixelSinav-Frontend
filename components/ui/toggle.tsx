import React from 'react';

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, disabled = false }) => {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className="sr-only"
            />
            <div className={`
                w-11 h-6 rounded-full transition-all duration-200
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${checked ? 'bg-orange-primary' : 'bg-dark'}
                after:content-[''] 
                after:absolute 
                after:top-[2px] 
                after:left-[2px] 
                after:bg-white 
                after:rounded-full 
                after:h-5 
                after:w-5 
                after:transition-all
                after:duration-200
                ${checked ? 'after:translate-x-full' : 'after:translate-x-0'}
            `} />
        </label>
    );
};

export default Toggle;
