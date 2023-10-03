"use client"

interface TaskEditInfoProps {
    title?: string,
    children: React.ReactNode
}


const TaskEditInfo: React.FC<TaskEditInfoProps> = ({ children, title }) => {

    return (
        <div className="flex flex-col justify-start items-start w-full gap-2 ">
            {title && <h1 className="font-bold text-xl w-full">{title}</h1>}

            <div className="w-full">{children}</div>
        </div>
    );
}

export default TaskEditInfo;