import React from 'react'
import SkeletonOverlay from './SkeletonOverlay'

const ComponetTest = () => {
    return (
        <div className='w-auto h-10 border border-slate-400 rounded p-1 m-1'>
            <div className='bg-red-300 w-11/12 h-7 rounded'>

            </div>
        </div>
    )
}

describe('<SkeletonOverlay />', () => {
    it('should render effect overlay corretly', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<SkeletonOverlay><ComponetTest /></SkeletonOverlay>)

        cy.get('[ data-testid="skeleton_overlay"]').as('overlay').should('be.visible')
        cy.get('@overlay').should('have.class', 'before:animate-shimmer')
    })
})