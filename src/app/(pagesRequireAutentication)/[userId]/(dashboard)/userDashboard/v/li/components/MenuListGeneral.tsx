'use client'
import { BiFilter } from "react-icons/bi"
import { BsLayers, BsPeople } from "react-icons/bs"
import { IoPersonOutline } from "react-icons/io5"
import { RxEyeOpen } from "react-icons/rx"
import { SlOptions } from "react-icons/sl"
import FilterItemMenuGeneral from "./menuListGeneral/FilterItemMenuGeneral"
import FilterItemComboMenuGeneral from "./menuListGeneral/FilterItemComboMenuGeneral"

const MenuListGeneral = () => {
    return (
        <div className="border-y-2 p-1 flex flex-row justify-between items-center">
            {/* filtros */}
            {/*  <SearchItemMenuGeneral handleOptions={() => { }} onChange={({data})={}} value={{data:''}}/>
 */}
            <div className="flex flex-row justify-center items-center gap-1">
                <FilterItemMenuGeneral icon={BiFilter} onClick={() => { console.log('click filtro'); }} >
                    Filtro
                </FilterItemMenuGeneral>
                <FilterItemMenuGeneral icon={BsLayers} active onClick={() => { console.log('click filtro'); }}>
                    Agruparpor: status
                </FilterItemMenuGeneral>

                <FilterItemComboMenuGeneral elements={[{ onClick: () => { }, label: 'Eu', icon: IoPersonOutline }, { onClick: () => { }, label: 'Responsavel', icon: BsPeople }]} elementSelected={1} />
                <FilterItemMenuGeneral icon={RxEyeOpen} onClick={() => { console.log('click filtro'); }}>
                    Mostrar
                </FilterItemMenuGeneral>
                <FilterItemMenuGeneral icon={SlOptions} onClick={() => { console.log('click filtro'); }} />
            </div>
        </div>
    )
}

export default MenuListGeneral;