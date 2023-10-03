interface AsideTaskEditProps {
    children: React.ReactNode
}

const TaskEditAside: React.FC<AsideTaskEditProps> = ({ children }) => {
    return (
        <div className=" flex flex-col h-full overflow-hidden p-1">
            {children}
        </div>
    );
}

export default TaskEditAside;