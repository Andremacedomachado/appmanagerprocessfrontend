import { format, formatISO } from "date-fns"
import { ChangeEvent } from "react"

export interface InputFilterDateProps {
    label?: string,
    name: string,
    id: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    errors?: Array<string | undefined>,
    value?: Date
}
export function InputFilterDate({ name, label, id, onChange, errors, value }: InputFilterDateProps) {

    const valueInFormat = value ? formatISO(new Date(value), { representation: 'date' }) : ''
    const arrayError = errors ? errors.filter(e => { return e !== undefined }) as Array<string> : [] as Array<string>
    const existError = arrayError.length > 0;
    return (
        <div className={`flex gap-1 items-baseline ${existError ? "text-red-400 dark:[color-schema:text-red-400]" : ""}`}>
            {label && <label htmlFor={name}>{label} : </label>}
            <input name={name} id={id} type="date" onChange={onChange} value={valueInFormat} min={1950} />
        </div>
    )
}