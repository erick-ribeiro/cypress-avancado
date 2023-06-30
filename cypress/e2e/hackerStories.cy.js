describe('Hacker Stories', () => {
  const initialTerm = 'React'
  const newTerm = 'Cypress'

  context('Hiting the real API', () => {

    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        pathname: '**/search',
        query: {
          query: initialTerm,
          page: '0'
        }
      }).as('searchStories')
  
      cy.visit('/')
  
      cy.wait('@searchStories')
    })

    it('shows 20 stories, then the next 20 after clicking "More"', () => {
      cy.intercept({
        method: 'GET',
        pathname: '**/search',
        query: {
          query: initialTerm,
          page: '1'
        }
      }).as('searchMore')
      
      cy.get('.item').should('have.length', 20)

      cy.contains('More').click()
      cy.wait('@searchMore')
      
      cy.get('.item').should('have.length', 40)
    })

    it('shows only nineteen stories after dimissing the first story', () => {
      cy.get('.button-small')
        .first()
        .click()

      cy.get('.item').should('have.length', 19)
    })

    context('List of stories', () => {
      // Since the API is external,
      // I can't control what it will provide to the frontend,
      // and so, how can I assert on the data?
      // This is why this test is being skipped.
      // TODO: Find a way to test it out.
      it.skip('shows the right data for all rendered stories', () => {})
  
  
  
      // Since the API is external,
      // I can't control what it will provide to the frontend,
      // and so, how can I test ordering?
      // This is why these tests are being skipped.
      // TODO: Find a way to test them out.
      context.skip('Order by', () => {
        it('orders by title', () => {})
  
        it('orders by author', () => {})
  
        it('orders by comments', () => {})
  
        it('orders by points', () => {})
      })
  
    
    })

    context('Search', () => {


      beforeEach(() => {
        cy.intercept({
          method: 'GET',
          pathname: '**/search',
          query: {
            page: '0'
          }
        }).as('searchTerm')
  
        cy.get('#search').clear()
      })
  
      it('types and hits ENTER', () => {
        cy.get('#search').type(`${newTerm}{enter}`)
  
        cy.wait('@searchTerm')
        
        cy.get('.item').should('have.length', 20)
        cy.get('.item')
          .first()
          .should('contain', newTerm)
        cy.get(`button:contains(${initialTerm})`)
          .should('be.visible')
      })
  
      it('types and clicks the submit button', () => {
        cy.get('#search')
          .type(newTerm)
        cy.contains('Submit')
          .click()
  
        cy.wait('@searchTerm')
  
        cy.get('.item').should('have.length', 20)
        cy.get('.item')
          .first()
          .should('contain', newTerm)
        cy.get(`button:contains(${initialTerm})`)
          .should('be.visible')
      })
  
      context('Last searches', () => {
        it('searches via the last searched term', () => {
   
          cy.get('#search')
            .type(`${newTerm}{enter}`)
  
          cy.wait('@searchTerm')
  
          cy.get(`button:contains(${initialTerm})`)
            .should('be.visible')
            .click()
  
          cy.wait('@searchTerm')
  
          cy.get('.item').should('have.length', 20)
          cy.get('.item')
            .first()
            .should('contain', initialTerm)
          cy.get(`button:contains(${newTerm})`)
            .should('be.visible')
        })
  
        it('shows a max of 5 buttons for the last searched terms', () => {
          const faker = require('faker')
  
          cy.intercept({
            method: 'GET',
            pathname: '**/search'
          }).as('search')
  
          Cypress._.times(6, () => {
            cy.get('#search')
              .as('search')
              .clear()
            cy.get('@search')
              .type(`${faker.random.word()}{enter}`)
          })
  
          cy.wait('@search')
  
          cy.get('.last-searches button')
            .should('have.length', 5)
        })
      })
    })

  })

  context.only('Mocking the API', () => {

    beforeEach(() => {
      cy.intercept('GET', `**/search?query=${initialTerm}&page=0`, {fixture: 'stories'}).as('searchStories')
  
      cy.visit('/')
  
      cy.wait('@searchStories')
    })

    it('shows 20 stories, then the next 20 after clicking "More"', () => {
      cy.intercept({
        method: 'GET',
        pathname: '**/search',
        query: {
          query: initialTerm,
          page: '1'
        }
      }).as('searchMore')
      
      cy.get('.item').should('have.length', 20)

      cy.contains('More').click()
      cy.wait('@searchMore')
      
      cy.get('.item').should('have.length', 40)
    })

    it('shows only nineteen stories after dimissing the first story', () => {
      cy.get('.button-small')
        .first()
        .click()

      cy.get('.item').should('have.length', 19)
    })

    context('List of stories', () => {
      // Since the API is external,
      // I can't control what it will provide to the frontend,
      // and so, how can I assert on the data?
      // This is why this test is being skipped.
      // TODO: Find a way to test it out.
      it.skip('shows the right data for all rendered stories', () => {})
  
  
  
      // Since the API is external,
      // I can't control what it will provide to the frontend,
      // and so, how can I test ordering?
      // This is why these tests are being skipped.
      // TODO: Find a way to test them out.
      context.skip('Order by', () => {
        it('orders by title', () => {})
  
        it('orders by author', () => {})
  
        it('orders by comments', () => {})
  
        it('orders by points', () => {})
      })
  
    
    })

    context('Search', () => {


      beforeEach(() => {
        cy.intercept({
          method: 'GET',
          pathname: '**/search',
          query: {
            page: '0'
          }
        }).as('searchTerm')
  
        cy.get('#search').clear()
      })
  
      it('types and hits ENTER', () => {
        cy.get('#search').type(`${newTerm}{enter}`)
  
        cy.wait('@searchTerm')
        
        cy.get('.item').should('have.length', 20)
        cy.get('.item')
          .first()
          .should('contain', newTerm)
        cy.get(`button:contains(${initialTerm})`)
          .should('be.visible')
      })
  
      it('types and clicks the submit button', () => {
        cy.get('#search')
          .type(newTerm)
        cy.contains('Submit')
          .click()
  
        cy.wait('@searchTerm')
  
        cy.get('.item').should('have.length', 20)
        cy.get('.item')
          .first()
          .should('contain', newTerm)
        cy.get(`button:contains(${initialTerm})`)
          .should('be.visible')
      })
  
      context('Last searches', () => {
        it('searches via the last searched term', () => {
   
          cy.get('#search')
            .type(`${newTerm}{enter}`)
  
          cy.wait('@searchTerm')
  
          cy.get(`button:contains(${initialTerm})`)
            .should('be.visible')
            .click()
  
          cy.wait('@searchTerm')
  
          cy.get('.item').should('have.length', 20)
          cy.get('.item')
            .first()
            .should('contain', initialTerm)
          cy.get(`button:contains(${newTerm})`)
            .should('be.visible')
        })
  
        it('shows a max of 5 buttons for the last searched terms', () => {
          const faker = require('faker')
  
          cy.intercept({
            method: 'GET',
            pathname: '**/search'
          }).as('search')
  
          Cypress._.times(6, () => {
            cy.get('#search')
              .as('search')
              .clear()
            cy.get('@search')
              .type(`${faker.random.word()}{enter}`)
          })
  
          cy.wait('@search')
  
          cy.get('.last-searches button')
            .should('have.length', 5)
        })
      })
    })

  })
  
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      pathname: '**/search',
      query: {
        query: initialTerm,
        page: '0'
      }
    }).as('searchStories')

    cy.visit('/')

    cy.wait('@searchStories')
  })

  it('shows the footer', () => {
    cy.get('footer')
      .should('be.visible')
      .and('contain', 'Icons made by Freepik from www.flaticon.com')
  })
})

context('Errors', () => {
  it('shows "Something went wrong ..." in case of a server error', () => {
    cy.intercept('GET','**/search**', { statusCode: 500 }).as('getServerError')
    cy.visit('/')
    cy.wait('@getServerError')

    cy.get('p:contains(Something went wrong ...)').should('be.visible')
  })

  it('shows "Something went wrong ..." in case of a network error', () => {
    cy.intercept('GET','**/search**', { forceNetworkError: true }).as('getNetworkError')
    cy.visit('/')
    cy.wait('@getNetworkError')

    cy.get('p:contains(Something went wrong ...)').should('be.visible')
  })
})