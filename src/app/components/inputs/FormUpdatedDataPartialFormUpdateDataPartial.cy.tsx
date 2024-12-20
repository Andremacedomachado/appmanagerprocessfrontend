import React from 'react'
import FormUpdateDataPartial from './FormUpdatedDataPartial'

describe('<FormUpdateDataPartial />', () => {
    it('should render component corretly ', () => {
        const spyActionSubmit = cy.stub()
        cy.mount(<FormUpdateDataPartial actionSubmit={spyActionSubmit} initialValue='default' inputStyle='' rules={{ minLength: { value: 5, message: 'descrição deve conter mais de cinco caracteres' } }} />)
        cy.get('#field').as('input_data').should('be.visible')
        cy.get('button').contains('Editar').as('button_edit').click().should('be.visible')
        cy.get('@input_data').type(' plus other value').should('be.visible')
        cy.get('button').contains('Save').as('button_save').should('be.visible').click().should('not.be.visible')
    })
})