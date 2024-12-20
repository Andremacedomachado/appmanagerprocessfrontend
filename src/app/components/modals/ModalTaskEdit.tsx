
import { Dialog, DialogContent, DialogTrigger } from "../popover/Dialog";

import { TaskEdit } from "./modalTaskEdit/index";
import MenuActionInfo from "./modalTaskEdit/taskEditHeader/MenuActionInfo";
import MenuActionRecordEvent from "./modalTaskEdit/taskEditHeader/MenuActionRecordEvent";


import RelationDependencyInfo from "./modalTaskEdit/taskEditInfo/RelationDependencyInfo"
import AnnexActivityInfo from "./modalTaskEdit/taskEditInfo/AnnexActivityInfo";
import { updateActivityByIdRequestClient } from "@/app/lib/requestClient/activityRequestClient";
import { IActivityProps } from "@/app/types/entities/Activity";
import { UserInfo } from "@/app/types/UserInfo";
import { FormUpdateActivityInfo } from "./modalTaskEdit/taskEditInfo/FormUpdateActivityInfo";
import { IRecordDependencyProps } from "@/app/types/entities/RecordDependency";
import { IAnnexActivityProps } from "@/app/types/entities/AnnexActivity";
import { IMessageActivityProps, TYPEMESSAGE } from "@/app/types/entities/MessageActivity";

interface ModalTaskEditProps {
    userId: string,
    activityInfo?: IActivityProps,
    colaboratorsInActivity?: UserInfo[],
    colaboratorsRecents?: UserInfo[],
    activitiesAdjacents?: { activities: IActivityProps[], records: IRecordDependencyProps[] }
    annexs?: IAnnexActivityProps[],
    messages?: IMessageActivityProps[],
    buttonTitleTrigger?: string
}
const ModalTaskEdit: React.FC<ModalTaskEditProps> = ({ userId, activityInfo, colaboratorsInActivity, colaboratorsRecents, activitiesAdjacents, annexs, messages, buttonTitleTrigger = 'Selecionar' }) => {
    return (
        <Dialog >
            <DialogTrigger >
                <div className="p-2 shadow-md rounded-md font-semibold bg-orange-600 text-white hover:bg-orange-400 transition">
                    {buttonTitleTrigger}
                </div>
            </DialogTrigger>
            <DialogContent className="flex flex-1 flex-col  items-center bg-white rounded-md  font-semibold w-[90vw] h-[80vh] overflow-hidden ">
                <TaskEdit.Menu />
                <TaskEdit.ContentRoot>

                    <TaskEdit.Aside>
                        <TaskEdit.AsideMenu>
                            {
                                activityInfo && <MenuActionInfo userId={userId} collaboratorsInActivity={colaboratorsInActivity} collaboratorsRecents={colaboratorsRecents} activity={activityInfo} />
                            }
                        </TaskEdit.AsideMenu>
                        <TaskEdit.AsideContent>
                            <TaskEdit.Infos>
                                {
                                    activityInfo && <FormUpdateActivityInfo activity={activityInfo} userId={userId} />
                                }
                                <TaskEdit.Info
                                    title="Relacionamentos"
                                >
                                    {
                                        activityInfo?.id && <RelationDependencyInfo
                                            activityId={activityInfo.id}
                                            activitiesAdjacents={activitiesAdjacents?.activities}
                                            recordsRelation={activitiesAdjacents?.records}
                                        />
                                    }

                                </TaskEdit.Info>
                                <TaskEdit.Info
                                    title="Anexos"
                                >
                                    <AnnexActivityInfo annexs={annexs} />

                                </TaskEdit.Info>
                            </TaskEdit.Infos>
                        </TaskEdit.AsideContent>
                        <TaskEdit.AsideFooter>
                            footer
                        </TaskEdit.AsideFooter>
                    </TaskEdit.Aside>
                    <TaskEdit.Aside>
                        <TaskEdit.AsideMenu>
                            {
                                activityInfo && <MenuActionRecordEvent activity={activityInfo} userIdCurrent={userId} />
                            }
                        </TaskEdit.AsideMenu>
                        <TaskEdit.AsideContent className="bg-slate-50 flex gap-2 py-4">
                            <TaskEdit.Record messages={messages} />
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