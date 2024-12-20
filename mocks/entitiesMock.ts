import { UserInfo } from "@/app/types/UserInfo";
import { IActivityProps, STATUSACTIVITY, TYPENODE } from "@/app/types/entities/Activity";
import { IMessageActivityProps, TYPEMESSAGE } from "@/app/types/entities/MessageActivity";
import { faker } from "@faker-js/faker";

export const fakeDateConstant = faker.date.anytime()
export const userMock: UserInfo = {
    id: faker.string.uuid(),
    name: 'André Souza Silva',
    email: 'andre@gmail.com',
    status: 'ACTIVE',
    created_at: fakeDateConstant,
    updated_at: fakeDateConstant,
    organization_linked: {
        dateLinkSector: fakeDateConstant,
        organizationId: faker.string.uuid(),
        organizationName: faker.person.jobArea()
    },
    roles: [
        {
            adjusterId: faker.string.uuid(),
            dateLinkRole: fakeDateConstant,
            roleId: faker.string.uuid(),
            roleName: faker.person.jobTitle()
        }
    ]
}

export const activityMock: IActivityProps = {
    id: faker.string.uuid(),
    title: 'atividade de test',
    description: 'efetuando teste com dados mockados',
    due_date: fakeDateConstant,
    created_at: fakeDateConstant,
    updated_at: fakeDateConstant,
    responsible_id: faker.string.uuid(),
    progress_status: STATUSACTIVITY.DO_TO,
    start_date: fakeDateConstant,
    type_node: TYPENODE.INITIAL
}

export const fakeContentMessage = 'assunto aleatorio para test'
export const messageMock: IMessageActivityProps = {
    activity_id: faker.string.uuid(),
    content: fakeContentMessage,
    publication_date: fakeDateConstant,
    type_message: TYPEMESSAGE.SYSTEM,
    user_id: faker.string.uuid(),
    updated_at: fakeDateConstant
}