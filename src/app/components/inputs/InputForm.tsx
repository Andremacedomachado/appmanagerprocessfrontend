'use client'
import { State } from "@/app/lib/schemas"
import { ChangeEvent, InputHTMLAttributes, useCallback, useEffect, useState } from "react"

export interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    name: string,
    errors?: string[]
    listOption?: { label: string, value: string }[]
}
export function InputForm({ label, name, type = 'text', errors, listOption, defaultValue, multiple, ...props }: InputFormProps) {
    const invalidField = errors && errors?.length >= 0;
    const validProps = type == 'radio' ? (listOption && listOption.length > 0) : true
    return <div className="flex flex-col transition duration-300">
        <label htmlFor={name} className="text-orange-400">{label}</label>
        {type == 'radio' && listOption && <select
            multiple
            id={name}
            name={name}
            className={`
                peer 
                block 
                w-full 
                cursor-pointer 
                rounded-md 
                border border-gray-200 
                py-2 
                pl-10 
                text-sm 
                font-semibold
                outline-2 
                placeholder:text-gray-500
                ${invalidField ? "focus:shadow-red-400 focus:border-red-400" : "focus:shadow-orange-400 focus:border-orange-400"}
                ${invalidField ? "border-red-400 text-red-600 " : "text-gray-700 "}
            `}
            defaultValue={defaultValue ? defaultValue : ''}
            aria-describedby='customer-error'
        >
            <option value="" disabled>
                {label}
            </option>
            {listOption.map((option) => (
                <option key={option.value} value={option.value} >
                    {option.label}
                </option>
            ))}
        </select>}
        {type == 'text' &&
            <input type={type} name={name} {...props}
                defaultValue={defaultValue}
                className={`shadow 
                appearance-none 
                border 
                rounded 
                w-full 
                py-2 
                px-3 
                leading-tight 
                focus:outline-none 
                focus:shadow-outline 
                ${invalidField ? "focus:shadow-red-400 focus:border-red-400" : "focus:shadow-orange-400 focus:border-orange-400"}
                ${invalidField ? "border-red-400 text-red-600 " : "text-gray-700 "}
                
            `}
            />
        }
        {type == "date" && <input
            type={type}
            name={name}
            defaultValue={defaultValue ? defaultValue : new Date().toISOString().split('T')[0]}
            disabled
            {...props}
            className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline text-gray-700`}
        />}

        {type == "password" && <input
            type={type}
            name={name}

            {...props}
            className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline text-gray-700`}
        />}
        {
            errors && errors.map(error => (
                <p key={error} className="text-red-400 text-sm mt-2 ml-1">{error}</p>
            ))
        }
        {
            !validProps && <p className="text-red-400 text-sm mt-2 ml-1">invalid props in field : {name}</p>
        }

    </div>
}

export interface InputFormMultipleSelectProps extends Omit<InputFormGeneralProps, 'defaultValue'> {
    initValue?: string[]
    listOption: { label: string, value: string }[]
}
export function InputFormGroupCheckBox({ label, name, errors, initValue = [], listOption, ...props }: InputFormMultipleSelectProps) {

    const [fieldCheckeds, setFieldCheckeds] = useState<string[]>(initValue)
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value, checked },
        } = event;

        if (checked) {
            setFieldCheckeds(pre => [...pre, value]);
        }
        else {
            setFieldCheckeds(pre => {
                return [...pre.filter(item => item != value)]
            })
        }
    }, []);

    return (
        <div className="flex flex-col">
            <LabelInputForm label={label} name={name} />
            <fieldset name={name} id={name}  >
                {listOption.map(field => (
                    <div key={field.label} className="group flex  px-2 gap-2 hover:text-orange-400">

                        <input type="checkbox" className="group-hover:bg-orange-400 p-2" name={name} onChange={handleChange} value={field.value} defaultChecked={!!initValue.find(item => item == field.value)} />
                        <div>{field.label}</div>
                    </div>
                ))}

            </fieldset>
            <ShowFormErros errors={errors} />
        </div>
    )
}
export interface InputFormGroupCheckboxOneOptionProps extends Omit<InputFormGeneralProps, 'defaultValue'> {
    initValue?: string
    listOption: { label: string, value: string }[]
}
export function InputFormGroupCheckboxOneOption({ label, name, errors, defaultChecked, listOption, initValue }: InputFormGroupCheckboxOneOptionProps) {
    const [checkedValue, setCheckedValue] = useState(initValue)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target

        if (checked) {
            setCheckedValue(value)
        }
    }


    return (

        <div className="flex flex-col">
            <LabelInputForm label={label} name={name} />
            <fieldset name={name} id={name}  >
                {listOption && listOption.map((field) => (
                    <div key={field.label} className="group flex  px-2 gap-2 hover:text-orange-400">
                        <input type="checkbox" className="group-hover:bg-orange-400 p-2" name={name} onChange={handleChange} value={field.value} checked={checkedValue === field.value} defaultChecked={defaultChecked} />
                        <div>{field.label}</div>
                    </div>
                ))}
            </fieldset>
            <ShowFormErros errors={errors} />
        </div>
    )
}



export function ShowFormErros({ errors }: { errors?: string[] }) {
    if (!errors) return null

    return (
        errors && errors.map(error => (
            <p key={error} className="text-red-400 text-sm mt-2 ml-1">{error}</p>
        ))
    )
}

export function LabelInputForm({ label, name }: { label: string, name: string }) {
    return (
        <label htmlFor={name} className="text-orange-400">{label}</label>
    )
}


export interface InputFormGeneralProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    name: string,
    errors?: string[]
}

export interface InputFormTextProps extends Omit<InputFormGeneralProps, 'type'> {
    type?: 'text' | 'password'
}
export function InputFormText({ label, name, errors, type = 'text', defaultValue, ...props }: InputFormTextProps) {
    const invalidField = (errors && errors.length > 0) ? true : false
    return (
        <div className="flex flex-col transition duration-300">
            <LabelInputForm name={name} label={label} />
            <input
                type={type}
                name={name}
                {...props}
                defaultValue={defaultValue}
                className={`shadow 
                appearance-none 
                border 
                rounded 
                w-full 
                py-2 
                px-3 
                leading-tight 
                focus:outline-none 
                focus:shadow-outline 
                ${invalidField ? "focus:shadow-red-400 focus:border-red-400" : "focus:shadow-orange-400 focus:border-orange-400"}
                ${invalidField ? "border-red-400 text-red-600 " : "text-gray-700 "}
                
            `}
            />
            <ShowFormErros errors={errors} />
        </div>
    )
}
export interface InputFormNumberProps extends Omit<InputFormGeneralProps, 'type'> {
    type?: 'number'
}
export function InputFormNumber({ label, name, errors, type, min = 0, max, defaultValue, ...props }: InputFormNumberProps) {
    const invalidField = (errors && errors.length > 0) ? true : false
    return (
        <div className="flex flex-col transition duration-300">
            <LabelInputForm name={name} label={label} />
            <input
                min={min}
                max={max}
                name={name}
                type={type}
                {...props}
                defaultValue={defaultValue}
                className={`shadow 
            appearance-none 
            border 
            rounded 
            w-full 
            py-2 
            px-3 
            leading-tight 
            focus:outline-none 
            focus:shadow-outline 
            ${invalidField ? "focus:shadow-red-400 focus:border-red-400" : "focus:shadow-orange-400 focus:border-orange-400"}
            ${invalidField ? "border-red-400 text-red-600 " : "text-gray-700 "}
            
        `}
            />
            <ShowFormErros errors={errors} />
        </div>
    )
}

export interface InputFormDateProps extends Omit<InputFormGeneralProps, 'defaultValue'> {
    defaultValue?: Date
}

export function InputFormDate({ label, errors, name, type = 'date', defaultValue, ...props }: InputFormDateProps) {

    return (
        <div className="flex flex-col transition duration-300">
            <LabelInputForm name={name} label={label} />
            <input
                type={type}
                name={name}
                defaultValue={defaultValue ? defaultValue.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                {...props}
                className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline text-gray-700`}
            />
            <ShowFormErros errors={errors} />
        </div>
    )
}