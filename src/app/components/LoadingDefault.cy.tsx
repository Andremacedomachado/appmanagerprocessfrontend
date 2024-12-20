import React from 'react'
import LoadingDefault from './LoadingDefault'

describe('<LoadingDefault />', () => {
    it('should render spin loading corretly', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<LoadingDefault size={50} />)
        cy.get('[data-testid="load_default"]').should('be.visible')
    })

    it('should change size conformt prop', () => {
        const size = 20
        cy.mount(<LoadingDefault size={size} />)
        cy.get('[data-testid="load_default"]').then(element => {
            const height = element.height()

            expect(height).eq(size, `${size} === ${size}`)
        })

    })
})