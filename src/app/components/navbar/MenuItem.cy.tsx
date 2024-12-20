import React from 'react'
import MenuItem from './MenuItem'

describe('<MenuItem />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        const spyHandler = cy.stub().as('handler_onclick')
        const label = 'test'
        cy.mount(<MenuItem label={label} onClick={spyHandler} />)

        cy.get('div').contains(label).should('be.visible').click()

        cy.get('@handler_onclick').should('have.callCount', 1)
    })
})