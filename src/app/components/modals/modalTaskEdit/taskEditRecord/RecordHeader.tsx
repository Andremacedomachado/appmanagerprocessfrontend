'use client'

import useCheckUserLoggedById from "@/app/hooks/useCheckUserLoggedById";
import { UserInfo } from "@/app/types/UserInfo";
import { format, parseISO } from "date-fns";
import { TbPencil } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

interface RecordHeaderProps {
    userinfo: UserInfo,
    publication_date: Date,
}

const defaultPrettyText = "font-semibold text-orange-400"

const RecordHeader: React.FC<RecordHeaderProps> = ({ userinfo, publication_date }) => {

    const permissionEdit = useCheckUserLoggedById({ userIdMatch: userinfo.id })
    return (
        <div className="group flex justify-end items-center gap-2 w-full p-1">
            <div className={twMerge("flex-1", defaultPrettyText)}>
                {userinfo?.name}
                {permissionEdit && <span> (você)</span>}
            </div>
            <div className={`${permissionEdit && "group-hover:hidden"} flex transition text-xs font-semibold text-zinc-600`}>
                <span> {format(parseISO(publication_date.toString()), 'dd MMM yyyy')}</span>

            </div>
            {permissionEdit &&
                <div className="group-hover:flex items-center hidden transition">
                    <div className="flex gap-1 justify-center items-center">
                        <div className="h-4 w-4 flex justify-center items-center">
                            <TbPencil size={15} />
                        </div>
                    </div>
                    <span className={defaultPrettyText}> editar</span>
                </div>
            }
        </div>
    );
}

export default RecordHeader;