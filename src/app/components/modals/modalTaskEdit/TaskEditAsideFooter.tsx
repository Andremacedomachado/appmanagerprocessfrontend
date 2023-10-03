const TaskEditAsideFooter = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className="flex justify-center items-center border-t-[1px] border-[#dcdfe4]"
        >
            {children}
        </div>
    );
}

export default TaskEditAsideFooter;