import { create } from "zustand";

interface TaskEditModalStore {
    isOpen: boolean
    onChange: (value: boolean) => void
    onOpen: () => void
    onClose: () => void
}

const useTaskEditModal = create<TaskEditModalStore>((set) => ({
    isOpen: false,
    onChange: (value: boolean) => set({ isOpen: value }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useTaskEditModal;