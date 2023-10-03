'use client'
import { BsCalendar, BsWindowSidebar } from "react-icons/bs"
import { IoIosStats } from "react-icons/io"
import MenuItemViews from "./menuViews/MenuItemViews";

const MenuViews = () => {
    return (
        <div className="flex flex-row gap-3 divide-x-2 px-2 py-1" >
            <div className="flex px-2 justify-center items-center">
                {/* menu icone menu lateral */}
                <BsWindowSidebar size={16} />
            </div>
            <div className="flex flex-row px-2  divide-x-2 overflow-hidden overflow-x-auto space-x-2" >
                {/* listagem de views */}
                <MenuItemViews label="Lista" icon={BsCalendar} onClick={() => { console.log('click') }} selected={true} handleOptions={(e) => { e.stopPropagation(); console.log('clickou em opções') }} />
                <MenuItemViews label="Calendario" icon={BsCalendar} onClick={() => { console.log('click') }} selected={false} />
                <MenuItemViews label="Gantt" icon={IoIosStats} onClick={() => { console.log('click') }} selected={false} iconStyle="rotate-90" />
            </div>
        </div>
    )
}

export default MenuViews;