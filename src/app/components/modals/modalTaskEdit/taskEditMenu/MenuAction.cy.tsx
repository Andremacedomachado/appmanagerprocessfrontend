import React from 'react'
import MenuAction from './MenuAction'

describe('<MenuAction />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<MenuAction onClick={() => console.log('executou')
        } />)
    })
})