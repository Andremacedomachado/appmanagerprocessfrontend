'use client'

import { twMerge } from "tailwind-merge";

interface TaskEditAsideContent extends React.HTMLProps<HTMLDivElement> {

    children: React.ReactNode
}

const baseSwapperStyle = "flex flex-col justify-start items-start h-[60vh] overflow-y-auto overflow-x-hidden scrollbar px-2"

const TaskEditAsideContent: React.FC<TaskEditAsideContent> = ({ children, className, ...props }) => {
    return (
        <div
            {...props}
            className={twMerge(baseSwapperStyle, className)}
        >
            {children}
        </div>
    );
}

export default TaskEditAsideContent;