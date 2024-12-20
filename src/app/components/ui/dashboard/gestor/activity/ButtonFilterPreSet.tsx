import { IconType } from "react-icons"

export interface ButtonFilterPreSetProps {
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    icon?: IconType
    id?: string
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export function ButtonFilterPreSet({ onClick, label }: ButtonFilterPreSetProps) {
    return (
        <button type="button" onClick={onClick} className=" border border-slate-100 rounded-md px-1 bg-orange-400 text-white font-semibold">{label}</button>
    )
}
