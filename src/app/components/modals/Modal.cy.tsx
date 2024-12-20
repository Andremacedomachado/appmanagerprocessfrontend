import React from 'react'
import Modal, { ModalProps } from './Modal'

describe('<Modal />', () => {

    const renderComponet = ({ ...props }: Partial<ModalProps>) => {
        const handlerSubmitMock = cy.stub().as('handler_submit')
        const handlerCloseMock = cy.stub().as('handler_close')

        const propsWithDefault: Omit<ModalProps, 'onSubmit' | 'onClose'> = {
            ...props,
            title: 'title modal', isOpen: true, actionLabel: 'execute operation'
        }
        return cy.mount(<Modal {...propsWithDefault} onSubmit={handlerSubmitMock} onClose={handlerCloseMock} />)

    }

    const BodyComponet = () => {
        return (
            <div>
                <p>
                    body
                </p>
            </div>
        )
    }
    const FooterComponet = () => {
        return (
            <div>
                <p>
                    footer
                </p>
            </div>
        )
    }
    beforeEach(() => {
        cy.viewport('macbook-11')
    })


    it('should render modal correly conformt props', () => {
        renderComponet({ body: <BodyComponet />, footer: <FooterComponet /> })

        cy.get('div').contains('title modal').as('title').should('be.visible')
        cy.get('div').contains('body').as('content_body').should('exist').should('be.visible')
        cy.get('div').contains('footer').as('content_footer').should('exist').should('be.visible')

        cy.get('button').contains('execute operation').as('button_submit').should('be.visible')
        cy.get('[data-testid="button-close"]').as('button_close').should('be.visible')
    })

    it('should hinde modal when click button close', () => {
        renderComponet({})
        cy.get('[data-testid="button-close"]').as('button_close')
        cy.get('@button_close').click()

        cy.get('@handler_close').should('have.callCount', 1)

        cy.get('[data-testid="control_show_modal"]').should('exist').should('have.class', 'opacity-0')
    })

    it('should handler function when click submit ', () => {
        renderComponet({})
        cy.get('button').contains('execute operation').as('button_submit')
        cy.get('@button_submit').click()

        cy.get('@handler_submit').should('have.callCount', 1)
        cy.get('[data-testid="control_show_modal"]').should('have.class', 'opacity-100')
    })
})