"use client"

import { MouseEvent } from "react";
import { BsFolderPlus } from "react-icons/bs";
export interface MenuActionProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}
const MenuAction: React.FC<MenuActionProps> = ({ onClick }) => {
    return (
        <div className="rounded-md flex justify-center items-center w-8 h-8 bg-slate-50 shadow-sm">

            <button onClick={onClick}><BsFolderPlus size={20} /></button>
        </div>
    );
}

export default MenuAction;