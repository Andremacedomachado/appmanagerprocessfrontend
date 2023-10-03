"use client"

import { IconType } from "react-icons";
import { SlOptions } from "react-icons/sl";
interface MenuItemViewsProps {
    label: string;
    selected?: boolean;
    handleOptions?: (e: React.MouseEvent<HTMLDivElement>) => void
    disable?: boolean;
    icon?: IconType;
    iconStyle?: string;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const MenuItemViews = ({ icon: Icon, label, disable, onClick, iconStyle, selected, handleOptions }: MenuItemViewsProps) => {
    return (
        <div className="flex flex-col justify-center items-center group">

            <div
                onClick={onClick}
                className={`
                flex 
                flex-row 
                gap-1 
                px-2 j
                ustify-center 
                items-center 
                hover:cursor-pointer
                transition
                ${selected ? "text-orange-400" : "text-black"}
            `}
            >
                {Icon && (
                    <Icon
                        size={16}
                        className={`
                        group-hover:text-orange-400
                        ${iconStyle && (iconStyle)}
                    `}
                    />
                )}
                <div>{label}</div>
                <div
                    onClick={handleOptions}
                    className={`
                    ${selected ? "hidden group-hover:flex z-10 justify-center items-center px-2  text-zinc-700 hover:text-orange-400" : "hidden"}
                `}
                >
                    <SlOptions size={14} />
                </div>
            </div>
            <div className={`
                ${selected ? "bg-orange-400" : "bg-transparent"}
                ${selected ? " bg-orange-400" : "group-hover:bg-zinc-700"}
                w-4/5
                h-1
                rounded-t-md
            `}>
            </div>
        </div>
    )
}

export default MenuItemViews;