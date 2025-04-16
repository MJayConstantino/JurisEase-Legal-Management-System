import {
  handleLoginSubmit,
  handleSignUpSubmit,
  handleGoogleSignIn,
  handleSignOut,
} from '../../../src/action-handlers/users'
// import { createSupabaseClient } from '../../../src/utils/supabase/client'
// import {
//   signinAction,
//   signUpAction,
//   signOutAction,
// } from '../../../src/actions/users'

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
    if (data.email === 'test@example.com' && data.password === 'password') {
      return { error: null }
    }
    return { error: 'Invalid credentials' }
  }),
  signUpAction: jest.fn(async (formData) => {
    const data = Object.fromEntries(formData.entries())
    if (data.email && data.password) {
      return { error: null }
    }
    return { error: 'Invalid sign-up data' }
  }),
  signOutAction: jest.fn(async () => ({ error: null })),
}))

// ✅ handleLoginSubmit Tests
describe('handleLoginSubmit', () => {
  // remove focus after a while
  fit('should log in successfully with valid credentials', async () => {
    const formData = new FormData()
    formData.append('email', 'test@example.com')
    formData.append('password', 'password')

    const result = await handleLoginSubmit(formData)
    console.log('Login success result:', result)
  })

  it('should return an error for invalid credentials', async () => {
    const formData = new FormData()
    formData.append('email', 'wrong@example.com')
    formData.append('password', 'incorrect')

    const result = await handleLoginSubmit(formData)
    console.log('Login failure result:', result)
  })
})

// ✅ handleSignUpSubmit Tests
describe('handleSignUpSubmit', () => {
  it('should sign up successfully with valid data', async () => {
    const formData = new FormData()
    formData.append('email', 'test@example.com')
    formData.append('password', 'password')
    formData.append('name', 'Test User')

    const result = await handleSignUpSubmit(formData)
    console.log('Sign-up success result:', result)
  })

  it('should return an error for invalid data', async () => {
    const formData = new FormData()
    formData.append('email', 'invalid-email')
    formData.append('password', 'pass') // Too short

    const result = await handleSignUpSubmit(formData)
    console.log('Sign-up failure result:', result)
  })
})

// ✅ handleGoogleSignIn Tests
describe('handleGoogleSignIn', () => {
  it('should sign in successfully with Google', async () => {
    const result = await handleGoogleSignIn()
    console.log('Google sign-in success result:', result)
  })

  it('should return an error for an invalid provider', async () => {
    // jest.spyOn(global, 'createSupabaseClient').mockImplementationOnce(() => ({
    //   auth: {
    //     signInWithOAuth: async () => ({
    //       error: { message: 'Invalid provider' },
    //     }),
    //   },
    // }))

    const result = await handleGoogleSignIn()
    console.log('Google sign-in failure result:', result)
  })
})

// ✅ handleSignOut Tests
describe('handleSignOut', () => {
  it('should successfully sign out', async () => {
    const result = await handleSignOut()
    console.log('Sign-out result:', result)
  })
})
