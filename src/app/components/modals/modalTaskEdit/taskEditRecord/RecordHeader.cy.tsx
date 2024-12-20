import React from 'react'
import RecordHeader from './RecordHeader'
import { userMock } from '../../../../../../mocks/entitiesMock'
import { ProviderUserCurrentContext } from '@/app/providers/ProviderUserCurrent'
import { faker } from '@faker-js/faker'

describe('<RecordHeader />', () => {
    it('should render headers record corretly', () => {
        // see: https://on.cypress.io/mounting-react
        const date = new Date()
        cy.mount(
            <ProviderUserCurrentContext session={{
                user: {
                    ...userMock,
                    id: faker.string.uuid(),
                    access_token: '11'
                },
                expires: ''
            }}
            >

                <RecordHeader userinfo={userMock} publication_date={date} />
            </ProviderUserCurrentContext>
        )

        cy.get('div').contains(userMock.name).should('be.visible')
        cy.get('[data-testid = "date_publication"]').should('be.visible')


    })

    it('should render headers record corretly with identify owner and actions', () => {
        // see: https://on.cypress.io/mounting-react
        const date = new Date()
        cy.mount(
            <ProviderUserCurrentContext session={{
                user: {
                    ...userMock,
                    access_token: '11'
                },
                expires: ''
            }}
            >

                <RecordHeader userinfo={userMock} publication_date={date} />
            </ProviderUserCurrentContext>
        )
        cy.get('span').contains('você').should('be.visible')
    })

})