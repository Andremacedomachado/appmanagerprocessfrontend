"use client"

import { BsFolderPlus } from "react-icons/bs";

const MenuAction = () => {
    return (
        <div className="rounded-md flex justify-center items-center w-8 h-8 bg-slate-50 shadow-sm">

            <button><BsFolderPlus size={20} /></button>
        </div>
    );
}

export default MenuAction;