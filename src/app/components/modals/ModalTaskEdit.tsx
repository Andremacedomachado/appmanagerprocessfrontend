"use client"

import useActivityById from "@/app/hooks/consumeApiEndpoint/useActivityById";
import { Dialog, DialogContent, DialogTrigger } from "../popover/Dialog";

import { TaskEdit } from "./modalTaskEdit/index";
import MenuActionInfo from "./modalTaskEdit/taskEditHeader/MenuActionInfo";
import MenuActionRecordEvent from "./modalTaskEdit/taskEditHeader/MenuActionRecordEvent";

import { useCallback, useEffect, useState } from "react";

import RelationDependencyInfo from "./modalTaskEdit/taskEditInfo/RelationDependencyInfo"
import AnnexActivityInfo from "./modalTaskEdit/taskEditInfo/AnnexActivityInfo";
import FormUpdateDataPartial from "../inputs/FormUpdatedDataPartial";
import { updateActivityByIdRequestClient } from "@/app/lib/requestClient/activityRequestClient";

interface ModalTaskEditProps {
    userId: string
}
const ModalTaskEdit: React.FC<ModalTaskEditProps> = ({ userId }) => {
    console.log("user id em modalEdit", userId)
    const { data: infoDataActivity, mutate } = useActivityById({ activityId: 'e274970d-f2d2-4b0c-a3b9-0dfb6a5ffe74' })

    const handlerChangeDescripition = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (infoDataActivity) {
            mutate({ ...infoDataActivity, description: e.target.value, id: infoDataActivity.id }, { revalidate: false })
        }
    }, [infoDataActivity, mutate])

    return (
        <Dialog >
            <DialogTrigger>My trigger</DialogTrigger>
            <DialogContent className="flex flex-1 flex-col  items-center bg-white rounded-md  font-semibold w-[90vw] h-[80vh] overflow-hidden ">
                <TaskEdit.Menu />
                <TaskEdit.ContentRoot>

                    <TaskEdit.Aside>
                        <TaskEdit.AsideMenu>
                            <MenuActionInfo userId={userId} />
                        </TaskEdit.AsideMenu>
                        <TaskEdit.AsideContent>
                            <TaskEdit.Infos>
                                <TaskEdit.Info
                                    title='Processo'
                                >
                                    <FormUpdateDataPartial
                                        initialValue={infoDataActivity?.title ? infoDataActivity?.title : ''}
                                        actionSubmit={async (data) => {
                                            if (infoDataActivity) {
                                                await updateActivityByIdRequestClient({ id: infoDataActivity.id, title: data[1] })
                                                mutate({ ...infoDataActivity, title: Object.values(data)[0] }, { revalidate: false })
                                            }
                                            console.log('external:', data)
                                        }}
                                        inputStyle={`w-5/6`}
                                        placeholder="informe um titulo"
                                        rules={{ minLength: { value: 5, message: 'descrição deve conter mais de cinco caracteres' } }}
                                    />
                                </TaskEdit.Info>
                                <TaskEdit.Info
                                    title="Descrição"
                                >
                                    <FormUpdateDataPartial
                                        initialValue={infoDataActivity?.description ? infoDataActivity?.description : ''}
                                        actionSubmit={data => {
                                            if (infoDataActivity)
                                                mutate({ ...infoDataActivity, description: Object.values(data)[0] }, { revalidate: false })
                                            console.log('external:', data)
                                        }}
                                        inputStyle="w-5/6"
                                        placeholder="informe a descrição"
                                        rules={{ minLength: { value: 5, message: 'descrição deve conter mais de cinco caracteres' } }}
                                    />
                                </TaskEdit.Info>
                                <TaskEdit.Info
                                    title="Relacionamentos"
                                >
                                    <RelationDependencyInfo />
                                </TaskEdit.Info>
                                <TaskEdit.Info
                                    title="Anexos"
                                >
                                    {infoDataActivity?.id && <AnnexActivityInfo activityId={infoDataActivity.id} />}

                                </TaskEdit.Info>
                            </TaskEdit.Infos>
                        </TaskEdit.AsideContent>
                        <TaskEdit.AsideFooter>
                            footer
                        </TaskEdit.AsideFooter>
                    </TaskEdit.Aside>
                    <TaskEdit.Aside>
                        <TaskEdit.AsideMenu>
                            <MenuActionRecordEvent startDate={infoDataActivity?.due_date} />
                        </TaskEdit.AsideMenu>
                        <TaskEdit.AsideContent className="bg-slate-50 flex gap-2 py-4">
                            <TaskEdit.Record />
                        </TaskEdit.AsideContent>
                        <TaskEdit.AsideFooter>
                            footer
                        </TaskEdit.AsideFooter>
                    </TaskEdit.Aside>
                </TaskEdit.ContentRoot>
            </DialogContent>
        </Dialog>
    )
}

export default ModalTaskEdit;