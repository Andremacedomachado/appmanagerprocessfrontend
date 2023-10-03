'use client'
import { IconType } from "react-icons";

interface FilterItemMenuGeneralProps {
    active?: boolean
    icon?: IconType
    children?: React.ReactNode
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const FilterItemMenuGeneral: React.FC<FilterItemMenuGeneralProps> = ({ children, onClick, icon: Icon, active }: FilterItemMenuGeneralProps) => {
    return (
        <div
            onClick={onClick}
            className={`
                flex 
                flex-row 
                justify-center 
                items-center 
                p-1 
                gap-1 
                text-xs 
                hover:cursor-pointer
                ${active ? " bg-zinc-400/20 text-orange-400 rounded-md" : "hover:rounded-md hover:bg-zinc-400/20"}
                font-semibold  
            `}
        >
            {Icon && (<Icon size={14}>

            </Icon>)}
            {children && (children)}

        </div>
    )
}

export default FilterItemMenuGeneral;