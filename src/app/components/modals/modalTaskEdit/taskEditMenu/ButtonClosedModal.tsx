import { DialogClose, useDialogContext } from "@/app/components/popover/Dialog";
import { MdClose } from "react-icons/md";

const ButtonClosedModal = () => {
    const { setOpen } = useDialogContext()
    return (
        <div
            onClick={() => setOpen(false)}
            className="rounded-md flex justify-center items-center w-8 h-8 bg-slate-50 shadow-sm">
            <MdClose size={20} />
        </div>
    );
}

export default ButtonClosedModal;