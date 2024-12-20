'use client'

import { FieldValues, Path, UseFormRegister, RegisterOptions, DeepMap, FieldError } from "react-hook-form";
import InputField, { InputFieldProps } from "./InputField";
import get from "lodash.get"
import { ErrorMessage } from "@hookform/error-message";
import { twMerge } from "tailwind-merge";

export type FormInputProps<TFormValues extends FieldValues> = {
    name: Path<TFormValues>,
    rules?: RegisterOptions,
    register?: UseFormRegister<TFormValues>,
    errors?: Partial<DeepMap<TFormValues, FieldError>>
} & Omit<InputFieldProps, 'name'>

const defaultStyle = 'flex flex-col w-full overflow-ellipsis'
const errorStyle = 'border-red-600 focus:ring-4 focus:ring-red-600 focus:ring-opacity-20 text-red-600'

const FormInput = <TFormValues extends FieldValues>({
    className,
    name,
    register,
    rules,
    errors,
    ref,
    id,
    label,
    ...props
}: FormInputProps<TFormValues>) => {
    const errorMessages = get(errors, name)
    const hasError = !!(errors && errorMessages)
    return (
        <div className={twMerge(defaultStyle, className)} aria-live="polite">
            <InputField
                name={name}
                id={id}
                label={label}
                ref={ref}
                {...(register && register(name, rules))}
                {...props}
                className={hasError ? errorStyle : twMerge(defaultStyle, "border border-zinc-500 rounded-md")}
            />

            <ErrorMessage
                errors={errors}
                name={name as any}
                render={({ message }) => (
                    <p className="m-1 font-serif text-sm text-left block text-red-600">
                        {message}
                    </p>
                )}
            />
        </div>
    );
}

export default FormInput;