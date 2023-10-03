'use client'
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import ButtonItemFilterMenu from "./ButtonItemFilterMenu";

interface ButtonItemSortMenuProps {
    active?: boolean
}

const ButtonItemSortMenu: React.FC<ButtonItemSortMenuProps> = ({ active }) => {
    return (
        <div className="p-1 transition " >
            {!active && (
                <div className="flex flex-col justify-center items-center hover:bg-zinc-600 rounded-full h-4 w-4 bg-zinc-500 p-[2px]">
                    <TbTriangleFilled size={8} className="text-white" />
                    <TbTriangleInvertedFilled size={8} className="text-zinc-300" />
                </div>
            )}
            {active && (
                <ButtonItemFilterMenu
                    icon={TbTriangleFilled}
                    selected={active}
                    onClickClosed={() => { }}

                    classNameParent={"group  px-1 flex h-5  justify-center  items-center  cursor-pointer overflow-hidden bg-orange-500 text-white rounded-full"}
                    classNameChild={"hidden group-hover:flex  justify-center items-center hover:bg-zinc-700 hover:text-zinc-400 bg-white rounded-full text-orange-400 w-4 h-4"}
                />
            )}
        </div>
    )
}

export default ButtonItemSortMenu;