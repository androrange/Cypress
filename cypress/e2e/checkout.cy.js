describe('SauceDemo Checkout Scenarios', () => {

  // login reusable (before each test)
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
  })


  it('🛒 Checkout with 2 products successfully', () => {

    // add 2 products
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

    // go to cart
    cy.get('.shopping_cart_link').click()

    // checkout
    cy.get('[data-test="checkout"]').click()

    // fill user info
    cy.get('[data-test="firstName"]').type('Kazuya')
    cy.get('[data-test="lastName"]').type('Ramadhan')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()

    // finish
    cy.get('[data-test="finish"]').click()

    // verify success
    cy.contains('Thank you for your order').should('be.visible')

    cy.log('✅ Successfully checked out 2 products')
  })


  it('🛒 Checkout with 3 products successfully', () => {

    // add 3 products
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()

    // cart
    cy.get('.shopping_cart_link').click()

    // checkout
    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Kazuya')
    cy.get('[data-test="lastName"]').type('Ramadhan')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="finish"]').click()

    cy.contains('Thank you for your order').should('be.visible')

    cy.log('✅ Successfully checked out 3 products')
  })


  it('🚫 Checkout without any product (should not proceed)', () => {

    // go straight to cart without adding product
    cy.get('.shopping_cart_link').click()

    // try checkout
    cy.get('[data-test="checkout"]').click()

    // fill info
    cy.get('[data-test="firstName"]').type('Kazuya')
    cy.get('[data-test="lastName"]').type('Ramadhan')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()

    // verify no items message or empty state
    cy.get('.cart_item').should('not.exist')

    cy.log('❌ Checkout attempted without products – blocked / no items present')
  })


  it('↩️ Cancel checkout process', () => {

  // add 1 product
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  // go to cart
  cy.get('.shopping_cart_link').click()

  // checkout
  cy.get('[data-test="checkout"]').click()

  // fill user info
  cy.get('[data-test="firstName"]').type('Kazuya')
  cy.get('[data-test="lastName"]').type('Ramadhan')
  cy.get('[data-test="postalCode"]').type('12345')
  cy.get('[data-test="continue"]').click()

  // cancel on overview page
  cy.get('[data-test="cancel"]').click()

  // 👉 correct verification
  cy.url().should('include', '/inventory.html')

  cy.log('❌ Checkout cancelled and returned to inventory page')
})

})

describe('SauceDemo Checkout Form Validation (Negative Test)', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    // add product minimal 1 supaya bisa checkout
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()

    // now we are on checkout step-one page
    cy.url().should('include', 'checkout-step-one')
  })


  it('❌ Should show error when all fields are empty', () => {

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'First Name is required')

    cy.log('❌ Failed: All fields empty')
  })


  it('❌ Should show error when First Name is missing', () => {

    cy.get('[data-test="lastName"]').type('Ramadhan')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'First Name is required')

    cy.log('❌ Failed: First Name missing')
  })


  it('❌ Should show error when Last Name is missing', () => {

    cy.get('[data-test="firstName"]').type('Kazuya')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Last Name is required')

    cy.log('❌ Failed: Last Name missing')
  })


  it('❌ Should show error when Postal Code is missing', () => {

    cy.get('[data-test="firstName"]').type('Kazuya')
    cy.get('[data-test="lastName"]').type('Ramadhan')
    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Postal Code is required')

    cy.log('❌ Failed: Postal Code missing')
  })

})
