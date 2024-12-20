import React from 'react'
import ModalTaskEdit from './ModalTaskEdit'
import { activityMock, userMock } from '../../../../mocks/entitiesMock'
import { faker } from '@faker-js/faker'
import { UserInfo } from '@/app/types/UserInfo'
import { IRecordDependencyProps } from '@/app/types/entities/RecordDependency'
import { IMessageActivityProps } from '@/app/types/entities/MessageActivity'
import { IAnnexActivityProps } from '@/app/types/entities/AnnexActivity'

describe('<ModalTaskEdit />', () => {
    beforeEach(() => {
        cy.viewport('macbook-11')
    })
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.intercept('api/userSimple/getInfoActivity*', activityMock).as('get_activity')

        cy.intercept('api/userSimple/getRecordRelationActivityAdjacent*', [{
            parent_id: "803574bc-9793-4b52-b4f7-1baa5a7f113a",
            children_id: "bf1eef80-0cf3-43c6-b721-aabec664919f",
            dependency_linked_date: faker.date.anytime()
        },
        {
            parent_id: "e274970d-f2d2-4b0c-a3b9-0dfb6a5ffe74",
            children_id: "803574bc-9793-4b52-b4f7-1baa5a7f113a",
            dependency_linked_date: faker.date.anytime()
        }] as IRecordDependencyProps[]).as('get_colaborator_recents')

        cy.intercept('api/userSimple/user*', userMock).as('get_user_current')

        cy.intercept('api/userSimple/getInfoCollaboratorRecentsAllActivity*', [userMock, { ...userMock, name: 'jorge ferreira' }] as UserInfo[]).as('get_collaborator')

        cy.intercept('api/userSimple/getMessageInActivity*', [{
            content: " SOU NOVO",
            type_message: "SYSTEM",
            publication_date: faker.date.anytime(),
            activity_id: "e274970d-f2d2-4b0c-a3b9-0dfb6a5ffe74",
            user_id: "42e53a55-151b-4ca8-926b-96f34ea53d5b",
            updated_at: faker.date.anytime()
        },
        {
            content: " SOU NOVO",
            type_message: "SYSTEM",
            publication_date: faker.date.anytime(),
            activity_id: "e274970d-f2d2-4b0c-a3b9-0dfb6a5ffe74",
            user_id: "42e53a55-151b-4ca8-926b-96f34ea53d5b",
            updated_at: faker.date.anytime()
        }] as IMessageActivityProps[]).as('get_message')

        cy.intercept('api/userSimple/getAnnexInfoByActivityId*', [

        ] as IAnnexActivityProps[]).as('get_annex')


        cy.mount(<ModalTaskEdit userId='1' />)
    })
})