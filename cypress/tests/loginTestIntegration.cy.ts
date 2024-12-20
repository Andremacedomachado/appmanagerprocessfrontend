describe('test flux operation of the authentication', () => {
    it('passes', () => {

        cy.visit('/')


        cy.get('[data-testid="button_menu_show_option_user_profile"]').as('button_menu')

        cy.get('@button_menu').click()

        cy.get('div').contains('Login').as('button_login')

        cy.get('@button_login').click()

        cy.get('#email').as('input_email').type('andre@gmail.com')
        cy.get('#password').as('input_password').type('1234')

        cy.get('#button_submit_modal').as('button_submit').click()
    })
})