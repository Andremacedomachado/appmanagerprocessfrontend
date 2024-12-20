"use client"

import ButtonCirclePerson from "./ButtonCirclePerson";
import ButtonTiggrerShowProfile from "./ButtonTiggrerShowProfile";
import IconAllocated from "./IconAllocated";
import SwapperLinkedInActivity from "./SwapperLinkedInActivity";
import { useCollaboratorsRecents } from "@/app/hooks/useCollaboratorsRecents";
import { UserInfo } from "@/app/types/UserInfo";
import { ChangeEvent, useCallback, useState } from "react";
import SearchItemMenuGeneral from "@/app/(pagesRequireAutentication)/[userId]/(dashboard)/userDashboard/v/li/components/menuListGeneral/SearchItemMenuGeneral";


interface fielttListProps<T, V> {
    arr: T[],
    searchParams: Record<string, V>
}
type fieltListType = <T extends UserInfo, V = String>(props: fielttListProps<T, V>) => T[];

const isObject = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

const fielterList: fieltListType = (props) => {
    let searchLowerCase: string = ''
    if (props.searchParams.values instanceof String) {
        searchLowerCase = props.searchParams.values.toLowerCase()
    }
    if (isObject(props.searchParams)) {
        const values = Object.values(props.searchParams) as string[]
        searchLowerCase = values[0].toLowerCase()
    }

    return props.arr.filter((newValue) => newValue.name.toLowerCase().includes(searchLowerCase))
}


interface CollaboradorRecentsProps {
    id: number,
    name: string,
    email: string,
    colorPerfil: string,
    setor: string
}

export interface ListRecentsCollaboratorsByUserProps {
    collaborators?: UserInfo[]
}


const ListRecentsCollabortorsByUser = ({ collaborators }: ListRecentsCollaboratorsByUserProps) => {
    const [filteredCollaborators, setFilteredCollaborators] = useState<UserInfo[] | undefined>(collaborators)
    const [searchTextInput, setSearchTextInput] = useState<string>('')

    const handlerFilter = useCallback(() => {
        if (collaborators && searchTextInput) {
            const filtered = fielterList<UserInfo, string>({ arr: collaborators, searchParams: { "name": searchTextInput } })
            setFilteredCollaborators(filtered)
        }
        if (searchTextInput == '') {
            setFilteredCollaborators(collaborators)
        }
    }, [collaborators, searchTextInput])

    const handlerChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTextInput(e.target.value)
        handlerFilter()
    }, [handlerFilter])


    return (
        <div className="flex flex-col gap-4 justify-center">

            <div className="border-b-2 py-1 border-slate-400 ">
                <SearchItemMenuGeneral
                    value={searchTextInput}
                    onChange={handlerChangeInput}
                    handleOptions={() => { }}
                />

            </div>
            <div className="flex flex-col gap-2 justify-center" >
                {filteredCollaborators &&
                    filteredCollaborators.map((collaborator, index) => (
                        <div key={collaborator.id} className="group flex justify-center items-center gap-2 hover:bg-slate-200 rounded-md p-1 ">

                            <SwapperLinkedInActivity rounded>
                                <ButtonCirclePerson
                                    size={8}
                                    fullName={collaborator.name}
                                    colorIndex={index}

                                />
                            </SwapperLinkedInActivity>


                            <div className="flex-auto w-24 overflow-hidden whitespace-nowrap text-ellipsis">
                                {collaborator.name.split(' ').map((word, index) => {
                                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                                }).join(' ')}
                            </div>
                            <ButtonTiggrerShowProfile />
                            <IconAllocated size={16} />
                        </div>
                    ))}

                {!filteredCollaborators || filteredCollaborators.length == 0 &&
                    <p className="font-semibold text-center w-full h-full">
                        Nenhum registro encontrado
                    </p>
                }

            </div>
        </div>
    );
}

export default ListRecentsCollabortorsByUser;