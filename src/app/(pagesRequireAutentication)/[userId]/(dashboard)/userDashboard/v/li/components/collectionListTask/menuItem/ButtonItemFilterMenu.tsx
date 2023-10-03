'use client'
import { IconType } from "react-icons";
import { IoClose } from "react-icons/io5";

export interface ButtonItemFilterMenu {
    selected?: boolean;
    icon?: IconType;
    label?: string;
    onClickClosed: (e: React.MouseEvent<HTMLDivElement>) => void
    classNameParent?: React.ComponentProps<'div'>['className']

    classNameChild?: React.ComponentProps<'div'>['className']
}

const ButtonItemFilterMenu: React.FC<ButtonItemFilterMenu> = ({ icon: Icon, selected, label, onClickClosed, classNameParent, classNameChild }) => {
    const defaultStyleParentDiv = `group relative flex  px-3   py-[4px] gap-1 justify-center  items-center  cursor-pointer overflow-hidden ${selected ? "bg-orange-500 text-white rounded-full" : "bg-transparent"}`;
    const defaultStyleChildDiv = " hidden group-hover:flex group-hover:absolute top-1/5 right-1 z-10 justify-center items-center hover:opacity-20 bg-white rounded-full text-orange-400 w-5 h-5";
    return (
        <div
            className={classNameParent ? classNameParent : defaultStyleParentDiv}
        >
            <div className={`
                            flex flex-row justify-center items-center overflow-hidden gap-1
                        `}
            >

                {Icon && <Icon size={12} />}
                {label && label}
            </div>
            {selected && (<div
                onClick={onClickClosed}
                className={classNameChild ? classNameChild : defaultStyleChildDiv}
            >
                <IoClose size={12} />
            </div>)}
        </div>
    )
}

export default ButtonItemFilterMenu;