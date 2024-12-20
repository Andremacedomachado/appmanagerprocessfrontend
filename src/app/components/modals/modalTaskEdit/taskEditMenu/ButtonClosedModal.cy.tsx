import React from 'react'
import ButtonClosedModal from './ButtonClosedModal'
import { Dialog, DialogContent, DialogTrigger, useDialogContext } from '@/app/components/popover/Dialog'

describe('<ButtonClosedModal />', () => {
    it('should render component corretly', () => {
        cy.mount(
            <Dialog>
                <DialogTrigger data-testid="trigger">My trigger</DialogTrigger>
                <DialogContent className='flex  w-96 h-96 bg-white'>

                    <div className='flex-1  bg-white'> aleatorio</div>
                    <ButtonClosedModal />

                </DialogContent>

            </Dialog>
        )
        cy.get('[data-testid="trigger"]').click()

        cy.get('[data-testid="button_close"]').should('be.visible').click()
        cy.get('[data-testid="button_close"]').should('not.exist')
    })
})