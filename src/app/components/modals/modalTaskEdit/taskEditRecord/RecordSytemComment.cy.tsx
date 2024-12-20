import React from 'react'
import RecordSystemComment from './RecordSytemComment'
import { messageMock, userMock } from '../../../../../../mocks/entitiesMock'

describe('<RecordSystemComment />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<RecordSystemComment message={messageMock} userCorrelation={undefined} />)
    })
})