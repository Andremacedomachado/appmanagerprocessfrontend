'use client'

import { InputHTMLAttributes, MutableRefObject, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type InputSize = 'medium' | 'large';
export type InputType = 'text' | 'email';

export type InputFieldProps = {
    id: string;
    name: string;
    label: string;
    type?: InputType;
    size?: InputSize;
    className?: string;
    ref?: MutableRefObject<HTMLInputElement>
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size'
>;


const sizeMap: { [key in InputSize]: string } = {
    medium: 'p-3 text-base',
    large: 'p-4 text-base',
};

const defaultStyleInput = ''

// eslint-disable-next-line react/display-name
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            id,
            name,
            label,
            type = 'text',
            size = 'medium',
            className = '',
            placeholder,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <input
                id={id}
                ref={ref}
                type={type}
                name={name}
                aria-label={label}
                placeholder={placeholder}
                disabled={disabled}
                className={twMerge('bg-transparent  rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-opacity-10 px-1 text-zinc-700', className)}
                {...props}
            />
        )
    })

export default InputField;