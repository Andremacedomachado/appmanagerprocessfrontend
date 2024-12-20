import React from 'react'
import TaskEditRecordEvent from './TaskEditRecordEvent'
import { IMessageActivityProps, TYPEMESSAGE } from '@/app/types/entities/MessageActivity'
import { messageMock, userMock } from '../../../../../mocks/entitiesMock'
import { UserInfo } from '@/app/types/UserInfo'

describe('<TaskEditRecordEvent /> with message user', () => {

    it('should render component record message user', () => {
        cy.intercept('api/userSimple/getMessageInActivity*', [{ ...messageMock, content: 'assunto do test', type_message: TYPEMESSAGE.USER }] as IMessageActivityProps[]).as('get_message_user_2')
        cy.intercept('api/userSimple/user*', { ...userMock, name: 'jorge santana' } as UserInfo).as('get_use_info_2')
        cy.mount(
            <div>
                <TaskEditRecordEvent />
            </div>
        )
        cy.get('div').contains('jorge santana').should('be.visible')
        cy.get('span').contains('JS').should('be.visible')
        cy.get('div').contains('assunto do test')
    })
})
