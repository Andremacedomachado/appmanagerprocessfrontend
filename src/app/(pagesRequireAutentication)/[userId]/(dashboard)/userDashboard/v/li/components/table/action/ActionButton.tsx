'use client'

import { IconType } from "react-icons"

export interface ActionButtonProps {
    icon?: IconType
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void,
    children?: React.ReactNode
    swapperClassname?: React.ComponentProps<'div'>['className']
}

const defaultClassname: React.ComponentProps<'div'>['className'] = "px-2 rounded-md hover:bg-zinc-400/20 cursor-pointer flex flex-row justify-start items-center gap-1"
const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, children, onClick, swapperClassname = defaultClassname }) => {

    return (
        <div
            onClick={onClick}
            className={swapperClassname}
        >
            {Icon && <Icon size={14} />}
            {children}
        </div>
    )
}

export default ActionButton;