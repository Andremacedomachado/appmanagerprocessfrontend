import React from 'react'
import RecordComment from './RecordComment'
import { messageMock, userMock } from '../../../../../../mocks/entitiesMock'
import { faker } from '@faker-js/faker'

describe('<RecordComment />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react

        console.log(typeof messageMock.publication_date)
        cy.mount(
            <RecordComment
                message={messageMock}
                user={{
                    id: faker.string.uuid(),
                    name: 'maria silva',
                    email: 'email@gmail.com',
                    organization_linked: {
                        dateLinkSector: new Date(),
                        organizationName: faker.person.jobArea(),
                        organizationId: faker.string.uuid()
                    },
                    roles: [],
                    status: 'Active',
                    created_at: new Date(),
                    updated_at: new Date()
                }}
            />)
    })
})