'use client'

interface TaskEditInfosProps {
    children: React.ReactNode
}

const TaskEditInfos: React.FC<TaskEditInfosProps> = ({ children }) => {
    return (
        <div className="flex flex-col justify-start items-start w-full gap-4">
            {children}
        </div>
    );
}

export default TaskEditInfos;