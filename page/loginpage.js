describe('SauceDemo Login Scenarios', () => {

  it('login then logout successfully', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.url().should('include', '/inventory.html')

    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()

    cy.get('#login-button').should('be.visible')
  })


  it('failed login with incorrect password', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('wrong_password')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface')
  })


  it('failed login with invalid username', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('#user-name').type('invalid_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface')
  })


  it('failed login with invalid username and password', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('#user-name').type('invalid_user')
    cy.get('#password').type('wrong_password')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface')
  })

})
