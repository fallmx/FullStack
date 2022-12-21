describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      name: 'Test User',
      username: 'test',
      password: 'test'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login-username').type('test')
      cy.get('#login-password').type('test')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#login-username').type('test')
      cy.get('#login-password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Test user logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'test',
        password: 'test'
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#form-title').type('Tämä on title')
      cy.get('#form-author').type('The Author')
      cy.get('#form-url').type('http://www.website.com/')
      cy.get('#form-submit').click()

      cy.contains('Tämä on title The Author')
    })

    it('blogs are displayed by likes in descending order', function() {
      cy.createBlog({
        title: 'Title with least likes',
        author: 'The Author',
        url: 'http://www.website.com/'
      })
      cy.createBlog({
        title: 'Title with second most likes',
        author: 'The Author',
        url: 'http://www.website.com/'
      })
      cy.createBlog({
        title: 'Title with most likes',
        author: 'The Author',
        url: 'http://www.website.com/'
      })

      cy.contains('Title with most likes').parent().as('most')
      cy.get('@most').contains('view').click()
      cy.get('@most').find('.like-button').click()
      cy.get('@most').contains('likes 1')
      cy.get('@most').find('.like-button').click()
      cy.get('@most').contains('likes 2')

      cy.contains('Title with second most likes').parent().as('second')
      cy.get('@second').contains('view').click()
      cy.get('@second').find('.like-button').click()
      cy.get('@second').contains('likes 1')

      cy.get('.blog').eq(0).should('contain', 'Title with most likes')
      cy.get('.blog').eq(1).should('contain', 'Title with second most likes')
      cy.get('.blog').eq(2).should('contain', 'Title with least likes')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Tämä on title',
          author: 'The Author',
          url: 'http://www.website.com/'
        })
      })

      it('blogs can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('blog can be removed by its owner', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'Tämä on title The Author')
      })

      it('blog cannot be removed by non-owner', function() {
        cy.createUser({
          name: 'Pentti Mies',
          username: 'pentti',
          password: 'pentti'
        })
        cy.login({
          username: 'pentti',
          password: 'pentti'
        })
        cy.contains('view').click()
        cy.get('.blog').should('not.contain', 'remove')
      })
    })
  })
})
