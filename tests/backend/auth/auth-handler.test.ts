import {
  handleLoginSubmit,
  handleSignUpSubmit,
  handleGoogleSignIn,
  handleSignOut,
} from '../../../src/action-handlers/users'
import { mockUserData, invalidUserData, wrongUserData } from './auth-mock-data'

/*
🚨 You don't need to test the handlers if most of your testing relies on database or server actions
    1. Only test handlers that have more than one step business side logic if YOU ARE testing them
    2. An example handler is an additional verification before calling the await <insert action here> 
*/

// ✅ Mocking the location property
Object.defineProperty(global, 'location', {
  value: {
    ancestorOrigins: {
      // if necessary, you can keep this empty or provide a mock value
    },
    hash: '',
    host: 'localhost:3007',
    hostname: 'localhost',
    href: 'http://localhost:3007/',
    origin: 'http://localhost:3007',
    pathname: '/',
    port: '3007',
    protocol: 'http:',
    search: '',
  },
  writable: true,
})

// ✅ Mocking the Supabase Client
jest.mock('../../../src/utils/supabase/client', () => ({
  createSupabaseClient: jest.fn(() => ({
    auth: {
      signInWithOAuth: jest.fn(async ({ provider }) => {
        if (provider === 'google') {
          return { error: null }
        }
        return { error: { message: 'Invalid provider' } }
      }),
      signOut: jest.fn(async () => ({ error: null })),
    },
  })),
}))

// ✅ Mocking the Auth Actions
jest.mock('../../../src/actions/users', () => ({
  signinAction: jest.fn(async (formData) => {
    const data = Object.fromEntries(formData.entries())
    if (
      data.email === mockUserData.email &&
      data.password === mockUserData.password
    ) {
      return { error: null }
    }
    return { error: 'Invalid credentials' }
  }),
  signUpAction: jest.fn(async (formData) => {
    const data = Object.fromEntries(formData.entries())
    if (data.email && data.password && data.name) {
      return { error: null }
    }
    return { error: 'Invalid sign-up data' }
  }),
  signOutAction: jest.fn(async () => ({ error: null })),
}))
describe('When the user clicks any button that prompts the handler functions', () => {
  // ✅ handleLoginSubmit test sucess
  describe('If the user tries to login and the handlerLogSin handler is prompted', () => {
    it('should log in successfully if the user provides valid credentials', async () => {
      const formData = new FormData()
      formData.append('email', 'test@example.com')
      formData.append('password', 'password')

      const result = await handleLoginSubmit(formData)
      expect(result.error).toBe(null)
    })
    //❌ error when the user gives invalid credentials
    it('should return an error if the user provides  invalid credentials', async () => {
      const formData = new FormData()
      formData.append('email', wrongUserData.email)
      formData.append('password', wrongUserData.password)

      const result = await handleLoginSubmit(formData)
      expect(result.error).toBe('Invalid credentials')
    })
  })
  // ✅ handleSignUpSubmit test success
  describe('If the user tries to sign up and the handleSignUpSubnit handler is prompted', () => {
    it('should sign up successfully if user provides valid data', async () => {
      const formData = new FormData()
      formData.append('email', mockUserData.email)
      formData.append('password', mockUserData.password)
      formData.append('name', mockUserData.name)

      const result = await handleSignUpSubmit(formData)
      expect(result.error).toBe(null)
    })
    //❌ error when the user gives invalid credentials
    it('should return an error if user provides invalid data', async () => {
      const formData = new FormData()
      formData.append('email', invalidUserData.email)
      formData.append('password', invalidUserData.password) // Too short

      const result = await handleSignUpSubmit(formData)
      expect(result.error).toBeDefined()
      expect(result.error).toBe('Invalid sign-up data')
    })
  })

  // ✅ handleGoogleSignIn tests sucess
  describe('when the user tries to sign in and clicks the google button', () => {
    it('should sign in successfully with Google', async () => {
      const result = await handleGoogleSignIn()

      expect(result.error).toBe(null)
    })
  })
  // ✅ handleSignOut Tests
  describe('whent he user  clicks any button that prompts the handleSignOut handler', () => {
    it('should successfully sign out the user if there is a session or does nothing', async () => {
      const result = await handleSignOut()
    })
  })
})
