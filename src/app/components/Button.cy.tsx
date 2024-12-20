import React from 'react'
import Button, { ButtonProps } from './Button'

const renderComponent = ({ ...props }: ButtonProps) => {
    return cy.mount(<Button {...props} />).as('button')
}

describe('<Button />', () => {
    it('should render button corretly with title', () => {
        const funcSpy = cy.stub().as('handler')
        renderComponent({ label: 'Cypress', onClick: funcSpy })
        cy.get('button').should('contain.text', 'Cypress')
    })

    it('should handler event onClick', () => {
        const funcSpy = cy.stub().as('handler')
        renderComponent({ label: 'Cypress', onClick: funcSpy })
        cy.get('button').click()
        cy.get('@handler').should('have.been.called')
        cy.get('@handler').should('have.callCount', 1)
    })
})