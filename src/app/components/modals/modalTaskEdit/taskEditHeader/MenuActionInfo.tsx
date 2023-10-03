'use client'
import { BsPersonAdd, } from "react-icons/bs";
import ButtonCircleOption from "./ButtonCircleOption";
import ButtonCirclePerson from "./ButtonCirclePerson";
import ButtonToggleStatus from "./ButtonToggleStatus";
import ButtonOptionInfo from "./ButtonOpitonInfo";
import ListRecentsCollabortorsByUser from "./ListRecentsCollaboratorsByUser";
import useCollaboratorsRecents from "@/app/hooks/useCollaboratorsRecents";

const MenuActionInfo = (params: { userId: string }) => {

    const { data: collaboradorRecents, isLoading } = useCollaboratorsRecents({ userId: params.userId })

    return (
        <div className="flex flex-row justify-between gap-4 items-baseline px-4 pl-8 pb-2 w-full">
            <ButtonToggleStatus />

            <div className="flex flex-row-reverse relative">

                <ButtonCircleOption
                    icon={BsPersonAdd}
                    onClick={() => {
                        console.log('click add person');
                    }}
                    classname="-ml-3"
                    size={10}
                    message="Adicionar novo colaborador"
                    menuNode={<ListRecentsCollabortorsByUser />}
                />

                {/*  {!isLoading && collaboradorRecents &&
                    collaboradorRecents.map((collaboratorInfo, idx) => (
                        <ButtonCirclePerson
                            fullName={collaboratorInfo.name}
                            classname="-ml-3"
                            key={collaboratorInfo.id}
                            size={10}
                            colorIndex={idx + 1}
                        />

                    ))
                } */}

            </div>

            <div className="flex-1"></div>


            <ButtonOptionInfo
                onClick={() => { }}
                size={20}
            />
        </div>
    );
}

export default MenuActionInfo;