'use client'

import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonOptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonOption: FC<ButtonOptionProps> = ({ onClick, className, children, type = 'button', ...props }) => {
    return (
        <button
            {...props}
            onClick={onClick}
            className={twMerge('flex bg-orange-600 shadow-md rounded-md h-fit text-white font-semibold px-1 transition hover:bg-orange-400', className)}
        >{children}</button>)
}

export default ButtonOption;