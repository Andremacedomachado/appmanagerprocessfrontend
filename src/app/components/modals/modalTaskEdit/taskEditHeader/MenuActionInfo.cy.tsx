import React from 'react'
import MenuActionInfo from './MenuActionInfo'
import { UserInfo } from '@/app/types/UserInfo'
import { userMock, activityMock } from '../../../../../../mocks/entitiesMock'
import { SWRResponse } from 'swr'
import { IActivityProps } from '@/app/types/entities/Activity'

describe('<MenuActionInfo />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.intercept('api/userSimple/getInfoActivity*', activityMock).as('get_activity')

        cy.intercept('api/userSimple/getInfoCollaboratorRecentsAllActivity*', [userMock]).as('get_activity')
        cy.mount(<MenuActionInfo userId='1' />)
    })
})