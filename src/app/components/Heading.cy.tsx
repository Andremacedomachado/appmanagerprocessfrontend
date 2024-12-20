import React from 'react'
import Heading from './Heading'

describe('<Heading />', () => {
    it('should render component corretly', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Heading title='title' center subtitle='subtitle' />)
        cy.get('div').contains('title').should('be.visible')
        cy.get('div').contains('subtitle').should('be.visible')

    })
    it('should render component corretly with out subtitle', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Heading title='title' center />)
        cy.get('div').contains('title').should('be.visible')
        cy.get('div').contains('subtitle').should('not.exist')

    })

    it('should render component corretly with text center', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Heading title='title' center />)
        cy.get('div').should('be.visible').should('have.class', 'text-center')

    })
})