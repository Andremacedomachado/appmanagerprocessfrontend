"use client"
import { ReactEventHandler, ReactNode, useState } from "react";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./Popover";
import { Placement } from "@floating-ui/react";
import { twMerge } from "tailwind-merge";

interface PopoutMenuActionProps {
    menuNode: ReactNode;
    placement?: Placement;
    swapperClassname?: React.ComponentProps<'div'>['className'];
    swapperClassNameMerge?: React.ComponentProps<'div'>['className']
    contentTrigger: React.ReactNode;
    closeButton?: boolean
}
const defaultswapperClassname = "flex flex-row justify-center items-center p-2 bg-white shadow-lg rounded-lg border-zinc-400/20 border-2 "
const PopoutMenuAction: React.FC<PopoutMenuActionProps> = ({
    menuNode,
    placement = 'top',
    swapperClassname = defaultswapperClassname,
    contentTrigger,
    closeButton = false,
    swapperClassNameMerge = ""
}) => {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen} placement={placement}>
            <PopoverTrigger onClick={() => setOpen((v) => !v)}>
                {contentTrigger}
            </PopoverTrigger>
            <PopoverContent className={twMerge(swapperClassname, swapperClassNameMerge)}>
                <div className="flex flex-col justify-center items-center">

                    {menuNode}
                    {
                        closeButton && (
                            <div className="border-t-[1px] w-full">
                                <PopoverClose>fechar</PopoverClose>
                            </div>
                        )
                    }
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default PopoutMenuAction;