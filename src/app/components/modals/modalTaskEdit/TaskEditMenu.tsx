'use client'
import MenuAction from "./taskEditMenu/MenuAction";
import ButtonClosedModal from "./taskEditMenu/ButtonClosedModal";
import PathProject from "./taskEditMenu/PathProject";
import MessageInfoContent from "../../popover/MessageInfoContent";

const TaskEditMenu = () => {
    return (
        <nav className="grid grid-flow-col items-center justify-between  w-full p-1 rounded-t-md bg-[#eff0f3] border-b-1 border-[#dcdfe4] ">
            <div className="flex gap-1 px-2">
                <MessageInfoContent
                    message="fechar"
                    trigger={<ButtonClosedModal />}
                    placement="bottom"
                />

                <MenuAction onClick={() => console.log('')} />
            </div>
            <div className="col-start-1 col-span-1 overflow-x-hidden">
                <PathProject pathfolders={['setor', 'projeto', 'atividade']} />
            </div>
        </nav>
    );
}

export default TaskEditMenu;