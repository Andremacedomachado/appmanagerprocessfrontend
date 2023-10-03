
interface TaskEditContentRootProps {
    children: React.ReactNode
}

const TaskEditContentRoot = ({ children }: TaskEditContentRootProps) => {
    return (
        <div className="grid grid-cols-2 grid-col-row w-full h-full divide-x-[2px] ">
            {children}
        </div>
    );
}

export default TaskEditContentRoot;