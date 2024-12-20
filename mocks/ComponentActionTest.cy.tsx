import React from 'react'
import { ComponentActionTest } from './ComponentActionTest'
import { getUser } from '@/app/actions/User'
import { checkAuthenticatedOnRequestIntercept, checkAuthenticatedOnRequestMock, loginOperationMock } from './authenticatedRequestTest'
import { getUrlBackEnd } from '@/app/utils/fetchSSR'
import check from '@/app/lib/auth/authenticatedUtilsSSR'


describe('<ComponentActionTest />', () => {
    beforeEach(async () => {
        const user = await loginOperationMock()
        checkAuthenticatedOnRequestMock(user)

    })
    it('renders', async () => {
        // see: https://on.cypress.io/mounting-react
        const response = await getUser({ userId: '0e4d340b-e377-4414-82b6-84483fc0479a' })
    })
})
