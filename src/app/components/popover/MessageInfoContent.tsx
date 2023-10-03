"use client"
import { twMerge } from "tailwind-merge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ToolTips";
import { HtmlHTMLAttributes } from "react";
import { Placement } from "@floating-ui/react";


interface MessageInfoContentProps {
    message: string,
    trigger: React.ReactNode,
    classNameContent?: HtmlHTMLAttributes<HTMLElement>["className"],
    placement?: Placement
}

const MessageInfoContent: React.FC<MessageInfoContentProps> = ({ message, trigger, classNameContent = "", placement = "top" }) => {
    return (
        <Tooltip placement={placement}>
            <TooltipTrigger >
                {trigger}
            </TooltipTrigger>
            <TooltipContent >
                <div className={twMerge("bg-zinc-700 text-white rounded-md px-1", classNameContent)}>
                    <span>{message}</span>
                </div>
            </TooltipContent>
        </Tooltip>
    );
}

export default MessageInfoContent;