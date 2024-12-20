import React from 'react'
import UserMenu from './UserMenu'
import MockNextRouter from '../../../../mocks/MockedNextRouter'
import * as nextAuth from 'next-auth/react';
import { SignOutResponse } from 'next-auth/src/react/types'
import { SessionContextValue } from 'next-auth/react';
import { userMock } from '../../../../mocks/entitiesMock';
import useToggle from '@/app/hooks/utils/useToggle';

describe('<UserMenu /> with authentication', () => {

    const renderComponent = () => {
        cy.stub(nextAuth, 'signOut').resolves(() => {
            const isOpen = useToggle()

            isOpen.toggleState()
            return { url: '/' } as SignOutResponse

        })

        cy.stub(nextAuth, 'useSession').returns(
            {
                data: {
                    user: {
                        ...userMock
                    },
                    expires: ''
                },
                status: 'authenticated',
                update: () => Promise.resolve({ user: { ...userMock }, expires: '' })
            } as SessionContextValue
        )

        cy.readFile('public/images/placeholder.jpg', null).then((img) => {
            cy.intercept('_next/image*', {
                statusCode: 200,
                headers: {
                    'Content-Type': 'image/jpg'
                },
                body: img.buffer,
            })
        })

        return cy.mount(<MockNextRouter>
            <UserMenu />
        </MockNextRouter>)
    }

    it('should render UserMenu with  authentication', () => {
        renderComponent()
        cy.get('[data-testid="button_menu_show_option_user_profile"]').should('be.visible').click()
        cy.get('div').contains('Perfil').should('be.visible')
    })

    it('should logout on click button sair', () => {
        renderComponent()
        cy.get('[data-testid="button_menu_show_option_user_profile"]').should('be.visible').click()
        cy.get('div').contains('Sair').should('be.visible').as('button_close').click()
        cy.get('div').contains('Perfil').should('not.exist')

    })
})

describe('<UserMenu /> without authentication', () => {
    const renderComponent = () => {

        cy.stub(nextAuth, 'signOut').resolves(() => {
            return { url: '/' } as SignOutResponse
        })
        cy.stub(nextAuth, 'useSession').returns({
            data: null,
            status: 'unauthenticated',
            update: () => Promise.resolve(null)
        } as SessionContextValue)

        cy.readFile('public/images/placeholder.jpg', null).then((img) => {
            cy.intercept('_next/image*', {
                statusCode: 200,
                headers: {
                    'Content-Type': 'image/jpg'
                },
                body: img.buffer,
            })
        })

        return cy.mount(<MockNextRouter>
            <UserMenu />
        </MockNextRouter>)

    }
    it('should render UserMenu with out authentication', () => {
        renderComponent()
        cy.get('[data-testid="button_menu_show_option_user_profile"]').should('be.visible').click()
        cy.get('div').contains('Login').should('be.visible')
    })

})