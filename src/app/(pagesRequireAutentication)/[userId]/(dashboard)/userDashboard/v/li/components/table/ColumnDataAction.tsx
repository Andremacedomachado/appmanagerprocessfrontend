import PopoutMenuAction from "@/app/components/popover/PopoutMenuAction"
import { Table } from "@tanstack/react-table"
import { SlOptions } from "react-icons/sl"
import { ActivityInfoPart } from "./DraggableColumnHeader"
import ActionButton from "./action/ActionButton"
import { FiDelete, FiEdit } from "react-icons/fi"


interface ColumnDataActionProps {
    table: Table<ActivityInfoPart>
    taskId: string
}
const ColumnDataAction = ({ table, taskId }: ColumnDataActionProps) => {
    return (
        <PopoutMenuAction
            contentTrigger={
                <div className="p-1 flex items-center justify-center font-semibold hover:bg-zinc-400/20 rounded-md bg-transparent ">
                    <SlOptions size={16}></SlOptions>
                </div>
            }
            placement="top"

            menuNode={
                <>
                    <ActionButton
                        icon={FiEdit}
                        onClick={() => {
                            console.log('edit -', taskId);
                        }}

                    >
                        <span>edit</span>
                    </ActionButton>
                    <ActionButton
                        icon={FiDelete}
                        onClick={() => {
                            console.log('remove-', taskId);
                        }}
                    >
                        <span>remove</span>
                    </ActionButton>
                </>}
        />
    )
}

export default ColumnDataAction;