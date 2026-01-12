describe('SauceDemo Product Sorting Scenarios', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
  })


  // 🔤 A → Z
  it('Sort products from A to Z', () => {

    cy.get('[data-test="product-sort-container"]').select('az')

    cy.get('.inventory_item_name').then($items => {
      const names = [...$items].map(el => el.innerText)
      const sorted = [...names].sort()

      expect(names).to.deep.equal(sorted)

      cy.log('✅ Products sorted A → Z successfully')
    })
  })


  // 🔤 Z → A
  it('Sort products from Z to A', () => {

    cy.get('[data-test="product-sort-container"]').select('za')

    cy.get('.inventory_item_name').then($items => {
      const names = [...$items].map(el => el.innerText)
      const sorted = [...names].sort().reverse()

      expect(names).to.deep.equal(sorted)

      cy.log('✅ Products sorted Z → A successfully')
    })
  })


  // 💰 Low → High
  it('Sort products from price Low to High', () => {

    cy.get('[data-test="product-sort-container"]').select('lohi')

    cy.get('.inventory_item_price').then($items => {
      const prices = [...$items].map(el => Number(el.innerText.replace('$', '')))
      const sorted = [...prices].sort((a, b) => a - b)

      expect(prices).to.deep.equal(sorted)

      cy.log('✅ Products sorted Price Low → High successfully')
    })
  })


  // 💰 High → Low
  it('Sort products from price High to Low', () => {

    cy.get('[data-test="product-sort-container"]').select('hilo')

    cy.get('.inventory_item_price').then($items => {
      const prices = [...$items].map(el => Number(el.innerText.replace('$', '')))
      const sorted = [...prices].sort((a, b) => b - a)

      expect(prices).to.deep.equal(sorted)

      cy.log('✅ Products sorted Price High → Low successfully')
    })
  })

})

describe('End to End Product Sorting + Search + Cart Flow', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
  })

  it('Sort, search, paginate (if exist) and add product to cart successfully', () => {

    // Sort A to Z
    cy.get('[data-test="product-sort-container"]').select('az')
    cy.log('✅ Sorted A → Z')

    // Sort Z to A
    cy.get('[data-test="product-sort-container"]').select('za')
    cy.log('✅ Sorted Z → A')

    // Sort Low → High
    cy.get('[data-test="product-sort-container"]').select('lohi')
    cy.log('✅ Sorted Price Low → High')

    // Sort High → Low
    cy.get('[data-test="product-sort-container"]').select('hilo')
    cy.log('✅ Sorted Price High → Low')

    // Search simulation (sauce demo doesn't have search box – example generic)
    cy.get('body').then($body => {
      if ($body.find('[data-test="search"]').length) {
        cy.get('[data-test="search"]').type('sauce')
        cy.log('✅ Search executed')
      } else {
        cy.log('ℹ️ No search bar available in this app')
      }
    })

    // Add two products
    cy.get('.btn_inventory').eq(0).click()
    cy.get('.btn_inventory').eq(1).click()
    cy.log('✅ Added 2 items to cart')

    // Verify cart badge
    cy.get('.shopping_cart_badge').should('contain', '2')

    // Optional pagination if exists
    cy.get('body').then($body => {
      if ($body.find('.pagination-next').length) {
        cy.get('.pagination-next').click()
        cy.log('✅ Pagination tested')
      } else {
        cy.log('ℹ️ Pagination not available in this app')
      }
    })
  })
})
