//SET UP ENUMS FOR MOCK USERS SOON ASAP

describe('User Auth Process', () => {
  // clean user after sign up

  describe('When the User Navigates to Homepage', () => {
    it('should navigate to login, then to sign up', () => {
      cy.visit('/')
      cy.contains('Log In to Your Account').should('exist').and('be.visible')
      cy.wait(800).contains('Log In to Your Account').click()
      cy.wait(800).get('a[href="/signup"]').click()
    })
  })

  describe('When User Tries to Sign Up', () => {
    beforeEach(() => {
      cy.visit('/signup')
    })
    after(() => {})
    it('should raise an error when no fields are filled', () => {
      cy.contains('Sign Up').click()
      cy.wait(1200).contains('Invalid data Inputted:').should('be.visible')
    })

    it('should raise an error if invalid email', () => {
      cy.get('#name').type('Test User')
      cy.get('#email').type('invalid-email')
      cy.get('#password').type('testPassword')
      cy.contains('Sign Up').click()
      cy.wait(1200).contains('Invalid data Inputted:').should('be.visible')
    })

    it('should raise an error if password is less than 5', () => {
      cy.get('#name').type('Test User')
      cy.get('#email').type('Test@test.com')
      cy.get('#password').type('tes')
      cy.contains('Sign Up').click()
      cy.wait(1200).contains('Invalid data Inputted:').should('be.visible')
    })

    it('should sign up user if provided right credentials', () => {
      cy.get('#name').type('Test User')
      //for some reason auth is really so strict with this bruh
      cy.get('#email').type('test@testdomain.com')
      cy.get('#password').type('testPassword')
      cy.contains('Sign Up').click()
      cy.wait(2000)
        .contains('Sign Up Succesful! Confirm your Emeil!')
        .should('be.visible')
    })
    it('should throw an error if the user tries to sign up with the same credentials while the confirmation email was not confirmed ', () => {
      cy.get('#name').type('Test User')
      //for some reason auth is really so strict with this bruh
      cy.get('#email').type('test@testdomain.com')
      cy.get('#password').type('testPassword')
      cy.contains('Sign Up').click()
      cy.wait(2000)
        .contains(/email confirmation/i)
        .should('be.visible')

      // call rpc to confirm the email

      cy.task('confirmUserEmail', 'test@testdomain.com')

      //
    })
    it('should throw an error if the user tries to sign up with exisiting user credentials ', () => {
      cy.get('#name').type('Test User')
      //for some reason auth is really so strict with this bruh
      cy.get('#email').type('test@testdomain.com')
      cy.get('#password').type('testPassword')
      cy.contains('Sign Up').click()
      cy.wait(2000)
        .contains(/have an account/i)
        .should('be.visible')

      //
    })
  })

  describe('When a User tries to Sign In', () => {
    beforeEach(() => {
      cy.visit('/login')
    })

    it('should raise an error if invalid email', () => {
      cy.get('#email').type('invalid-email')
      cy.get('#password').type('wrongpassword')
      cy.get('button[type="submit"]').click()
      cy.wait(1500)
        .contains(/invalid/i)
        .should('be.visible')
    })
    it('should raise an error if provided wrong credentials', () => {
      cy.get('#email').type('test@testdomain.com')
      cy.get('#password').type('wrongpassword')
      cy.get('button[type="submit"]').click()
      cy.wait(1500)
        .contains(/failed to log in/i)
        .should('be.visible')
    })
    it('should lock user out if exceeded 5 tries with wrong credentials', () => {
      let i = 1

      while (i <= 5) {
        cy.wait(1500)
        cy.get('#email').type('test@testdomain.com')
        cy.get('#password').type('wrongpassword')
        cy.get('button[type="submit"]').click()
        i++
      }
      cy.wait(1000)
        .contains(/too many /i)
        .should('be.visible')
      cy.wait(2000)
    })

    it('should sign in user if provided right credentials', () => {
      cy.task('resetLoginAttempts', 'test@testdomain.com')
      cy.get('#email').type('test@testdomain.com')
      cy.get('#password').type('testPassword')
      cy.get('button[type="submit"]').click()
      //verify user session
      cy.wait(3000)
        .contains(/welcome to jurisease/i)
        .should('be.visible')
    })

    // use before() block if you want to authentical the session only once in between tests
    // useful for matters, tasks, billings, global and user profile

    // GOOGLE OAUTH IS TOO CHALLENGING TO BE AUTOMATED BECAUSE OF THE PROTECTION STEPS
    // and cannot be fully testes without makeing a dummy google account
  })

  describe('When User Tries to Sign out', () => {
    it('should log user out if user clicked the signout button, user is redirected to login', () => {
      cy.login('test@testdomain.com', 'testPassword')
      cy.visit('/loggedIn')
      cy.wait(2000)
        .contains(/sign out/i)
        .click()
      cy.wait(3000)
      cy.contains(/welcome/i).should('be.visible')
    })
    // please delete this when testing stuff like matters
    // you can use the data from this when testing still so we can all
    // just delete the data after the global search test
    after(() => {
      cy.task('deleteUser', 'test@testdomain.com')
    })
  })
})
