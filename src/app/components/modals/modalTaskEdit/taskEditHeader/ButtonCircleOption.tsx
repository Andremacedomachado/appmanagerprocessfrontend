"use client"

import MessageInfoContent from "@/app/components/popover/MessageInfoContent";
import PopoutMenuAction from "@/app/components/popover/PopoutMenuAction";
import { MouseEvent, HTMLAttributes } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface ButtonCircleOptionProps {
    size?: number,
    sizeIcon?: number,
    onClick: (e: MouseEvent<HTMLDivElement>) => void,
    icon: IconType,
    classname?: HTMLAttributes<HTMLDivElement>['className']
    message?: string
    menuNode: React.ReactNode
}

const ButtonCircleOption: React.FC<ButtonCircleOptionProps> = ({ icon: Icon, size = 10, sizeIcon = 20, onClick, classname = '', message = "", menuNode }) => {
    const componentTriger = <div
        onClick={onClick}
        className={twMerge([`
            relative 
            flex 
            justify-center 
            items-center  
            rounded-full 
            h-${size} w-${size}
            p-1 
            border-2 
            border-dashed 
            transition
            cursor-pointer  
            border-slate-600 
            text-slate-600  
            hover:text-orange-600 
            hover:border-orange-400`, classname])}
    >
        <Icon size={sizeIcon} />
    </div>
    return (
        <MessageInfoContent
            message={message}
            trigger={
                <PopoutMenuAction
                    menuNode={menuNode}
                    contentTrigger={
                        componentTriger
                    }
                    placement="bottom"
                />

            }
        />

    );
}

export default ButtonCircleOption;