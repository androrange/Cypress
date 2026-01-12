describe('SauceDemo Logout Flow from Multiple Pages', () => {

  const login = () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
  }

  const logout = () => {
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
    cy.get('#login-button').should('be.visible')
  }


  it('logout from inventory page', () => {
    login()
    cy.url().should('include', '/inventory.html')
    logout()
  })


  it('logout from shopping cart page', () => {
    login()

    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')

    logout()
  })


  it('logout from checkout information page', () => {
    login()

    cy.get('.btn_inventory').first().click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()

    cy.url().should('include', '/checkout-step-one.html')

    logout()
  })


  it('logout from checkout overview page', () => {
    login()

    cy.get('.btn_inventory').eq(0).click()
    cy.get('.btn_inventory').eq(1).click()

    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Test')
    cy.get('[data-test="lastName"]').type('User')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()

    cy.url().should('include', '/checkout-step-two.html')

    logout()
  })

})
