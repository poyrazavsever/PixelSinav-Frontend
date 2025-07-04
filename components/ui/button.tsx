import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline";
  children: ReactNode;
  href?: string;
  icon?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const buttonVariants = {
  filled: "bg-orange-primary text-white border-2 border-orange-primary",
  outline: "bg-transparent border-dashed border-2 border-orange-light text-orange-light",
};

import { Variants } from "framer-motion";

const buttonAnimation: Variants = {
  rest: {
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.1,
    },
  },
};

export const Button = ({
  variant = "filled",
  children,
  href,
  icon = "",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = `
    flex items-center justify-center gap-2 
    px-8 py-2 font-pixelify
    font-medium transition-all cursor-pointer
  `;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.type !== 'submit' && props.onClick) {
      e.preventDefault();
      props.onClick(e);
    }
  };

  const buttonContent = (
    <motion.div
      className={`${baseStyles} ${buttonVariants[variant]} ${className}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={buttonAnimation}
    >
      {children}
      {icon && <Icon icon={icon} className="w-5 h-5" />}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      {...props}
      type={props.type || 'button'}
      onClick={handleClick}
      className="inline-block disabled:opacity-50"
      disabled={props.disabled}
    >
      {buttonContent}
    </button>
  );
};