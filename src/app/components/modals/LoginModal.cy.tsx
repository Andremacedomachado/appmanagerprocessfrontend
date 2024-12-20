

import { useRouter } from 'next/navigation'

import LoginModal from './LoginModal'
import MockNextRouter from '../../../../mocks/MockedNextRouter'
import * as NextAuthModule from 'next-auth/react'
import { useLoginModal } from '@/app/hooks/useLoginModal'



describe('<LoginModal />', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
    })
    context('', () => {
        const originLoginStored = useLoginModal.getState()
        beforeEach(() => {

            useLoginModal.setState(originLoginStored)
            originLoginStored.onOpen()
        })
        it('should render modal login corretly', () => {
            // see: https://on.cypress.io/mounting-react

            cy.stub(NextAuthModule, 'signIn').as('call_signIn').resolves({
                error: null,
                ok: true,
                status: 200,
                url: '/login'
            } as NextAuthModule.SignInResponse)

            cy.mount(
                <MockNextRouter  >
                    <LoginModal />
                </MockNextRouter>
            )
            cy.contains('Login').as('title').should('be.visible')
            cy.get('[data-testid="button-close"]').should('be.visible')
            cy.get('#email').should('be.visible')
            cy.get('#password').should('be.visible')
            cy.get('button').contains('Continue').should('be.visible')
        })

        it('should call sign in the oparation login', () => {
            cy.stub(NextAuthModule, 'signIn').as('call_signIn').resolves({
                error: null,
                ok: true,
                status: 200,
                url: '/login'
            } as NextAuthModule.SignInResponse)

            cy.mount(
                <MockNextRouter  >
                    <LoginModal />
                </MockNextRouter>
            )

            cy.contains('Login').as('title').should('be.visible')
            cy.get('#email').as('input_email').type('andre@gmail.com')
            cy.get('#password').as('input_password').type('1234')
            cy.get('button').contains('Continue').as('button_handler_login').click()

            cy.get('@call_signIn').should('be.calledOnce')
            cy.get('@push').should('be.calledOnce')

            cy.get('div').contains('Login').should('not.exist')

        })
    })
})