'use client'

import { IconType } from "react-icons";
import { BsPeople } from "react-icons/bs";
import { IoClose, IoPersonOutline } from "react-icons/io5";

interface DataFilterItemComboMenuGeneral {
    label?: string
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void
    icon?: IconType
}

interface FilterItemComboMenuGeneralProps {
    elementSelected?: number;
    elements: DataFilterItemComboMenuGeneral[]
}

const FilterItemComboMenuGeneral: React.FC<FilterItemComboMenuGeneralProps> = ({ elementSelected, elements }) => {
    const handleError = (e: React.MouseEvent<HTMLDivElement>) => { console.log('error') }
    return (
        <div
            className={`
                flex 
                flex-row 
                justify-center 
                items-center 
                text-xs 
                font-semibold  
                ${elementSelected != undefined ? "rounded-full bg-zinc-400/20" : "divide-x-2"} 
                gap-1 
            `}
        >
            {elements.length > 0 && elements.map((element, index) => (
                <div
                    key={index}
                    className={`
                        group
                        relative
                        flex 
                        px-3  
                        py-[4px]
                        gap-1
                        justify-center 
                        items-center 
                        cursor-pointer
                        overflow-hidden
                        ${elementSelected == index ? "bg-orange-500 text-white rounded-full" : "bg-transparent"}
                    `}
                >
                    <div className={`
                            flex flex-row justify-center items-center overflow-hidden p-1 gap-1
                            ${elementSelected == undefined ? "hover:rounded-md hover:bg-zinc-400/20" : ""}
                        `}
                    >

                        {element.icon && <element.icon size={14} />}
                        {element.label && element.label}
                    </div>
                    {index == elementSelected && (<div
                        className="
                        hidden
                        group-hover:flex
                        group-hover:absolute
                        top-1/5
                        right-1
                        z-10
                        justify-center
                        items-center
                        hover:opacity-20
                        bg-white
                        rounded-full
                        text-orange-400
                        w-5
                        h-5
                        "
                    >
                        <IoClose size={14} />
                    </div>)}
                </div>
            ))}
        </div>
    )

}
export default FilterItemComboMenuGeneral;