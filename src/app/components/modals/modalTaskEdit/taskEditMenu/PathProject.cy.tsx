import React from 'react'
import PathProject from './PathProject'

describe('<PathProject />', () => {
    it('should render component corretly', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<PathProject pathfolders={['cad1', 'cad2', 'cad3']} />)
        cy.get('div').contains('cad1').as('path_1').should('be.visible')
        cy.get('div').contains('cad2').as('path_2').should('be.visible')
        cy.get('div').contains('cad3').as('path_3').should('be.visible')
    })
})