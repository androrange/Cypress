describe('SauceDemo Logout Flow from Multiple Pages', () => {

  // reusable login function
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

  it('✅ Logout from Homepage (Inventory Page)', () => {

    login()

    // verify already in homepage
    cy.url().should('include', '/inventory.html')

    logout()

    cy.log('✅ Successfully logged out from homepage')
  })

  it('✅ Logout from Shopping Cart Page', () => {

    login()

    // go to cart page
    cy.get('.shopping_cart_link').click()

    cy.url().should('include', '/cart.html')

    logout()

    cy.log('✅ Successfully logged out from shopping cart page')
  })

  it('✅ Logout from Checkout Information Page', () => {

    login()

    // add product
    cy.get('.btn_inventory').first().click()

    // go to cart page
    cy.get('.shopping_cart_link').click()

    // go to checkout
    cy.get('[data-test="checkout"]').click()

    cy.url().should('include', '/checkout-step-one.html')

    logout()

    cy.log('✅ Successfully logged out from checkout info page')
  })

  it('✅ Logout from Payment Page (Checkout Overview)', () => {

    login()

    // add 2 products
    cy.get('.btn_inventory').eq(0).click()
    cy.get('.btn_inventory').eq(1).click()

    // go to cart page
    cy.get('.shopping_cart_link').click()

    // go to checkout
    cy.get('[data-test="checkout"]').click()

    // fill customer data
    cy.get('[data-test="firstName"]').type('Test')
    cy.get('[data-test="lastName"]').type('User')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()

    cy.url().should('include', '/checkout-step-two.html')

    // now logout from payment page
    logout()

    cy.log('✅ Successfully logged out from payment page')
  })

})
