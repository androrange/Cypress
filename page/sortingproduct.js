describe('SauceDemo Product Sorting Scenarios', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
  })


  it('sort products from A to Z', () => {
    cy.get('[data-test="product-sort-container"]').select('az')

    cy.get('.inventory_item_name').then($items => {
      const names = [...$items].map(el => el.innerText)
      const sorted = [...names].sort()

      expect(names).to.deep.equal(sorted)
    })
  })


  it('sort products from Z to A', () => {
    cy.get('[data-test="product-sort-container"]').select('za')

    cy.get('.inventory_item_name').then($items => {
      const names = [...$items].map(el => el.innerText)
      const sorted = [...names].sort().reverse()

      expect(names).to.deep.equal(sorted)
    })
  })


  it('sort products from price low to high', () => {
    cy.get('[data-test="product-sort-container"]').select('lohi')

    cy.get('.inventory_item_price').then($items => {
      const prices = [...$items].map(el =>
        Number(el.innerText.replace('$', ''))
      )
      const sorted = [...prices].sort((a, b) => a - b)

      expect(prices).to.deep.equal(sorted)
    })
  })


  it('sort products from price high to low', () => {
    cy.get('[data-test="product-sort-container"]').select('hilo')

    cy.get('.inventory_item_price').then($items => {
      const prices = [...$items].map(el =>
        Number(el.innerText.replace('$', ''))
      )
      const sorted = [...prices].sort((a, b) => b - a)

      expect(prices).to.deep.equal(sorted)
    })
  })

})
