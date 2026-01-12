describe('SauceDemo Login Test Scenarios', () => {

  it('✅ login then logout successfully', () => {

    cy.visit('https://www.saucedemo.com/')

    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    // verify success login
    cy.url().should('include', '/inventory.html')

    // success indicator
    cy.log('✅ Login Success')

    // logout process
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()

    // verify back to login page
    cy.get('#login-button').should('be.visible')

    // success indicator
    cy.log('✅ Logout Success')
  })


  it('❌ failed login with incorrect password', () => {

    cy.visit('https://www.saucedemo.com/')

    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('wrong_password')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface')

    cy.log('❌ Failed Login – Invalid Password')
  })


  it('❌ failed login with invalid username', () => {

    cy.visit('https://www.saucedemo.com/')

    cy.get('#user-name').type('invalid_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface')

    cy.log('❌ Failed Login – Invalid Username')
  })

  it('❌ failed login with invalid username and incorrect password', () => {

    cy.visit('https://www.saucedemo.com/')

    // both wrong
    cy.get('#user-name').type('invalid_user')
    cy.get('#password').type('wrong_password')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface')

    cy.log('❌ Failed Login – Invalid Username & Invalid Password')
  })

})
