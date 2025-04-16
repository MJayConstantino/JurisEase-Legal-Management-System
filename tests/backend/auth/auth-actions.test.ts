import {
  signinAction,
  signUpAction,
  signOutAction,
  fetchUsersAction,
  fetchUserInfoAction,
} from '../../../src/actions/users'
import { z } from 'zod'

//✅  prepare schema for testing
const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(5),
})

//✅  mockUser data for testing the function
const mockUserData = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password',
}

const invalidUserData = {
  name: '',
  email: 'invalidEmail',
  password: 'none',
}

//✅  mocking the supabase server module
jest.mock('../../../src/utils/supabase/server', () => ({
  createSupabaseClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(async (data) => {
        if (
          data.email === mockUserData.email &&
          data.password === mockUserData.password
        ) {
          return { error: null }
        }
        return { error: { message: 'Invalid credentials' } }
      }),
      signUp: jest.fn(async (data) => {
        if (data.email && data.password) {
          return { error: null }
        }
        return { error: { message: 'Failed to Sign Up' } }
      }),
      getSession: jest.fn(async () => ({
        data: { session: { user: { email: mockUserData.email } } },
      })),
      signOut: jest.fn(async () => ({ error: null })),
      getUser: jest.fn(async () => ({
        data: {
          user: {
            user_metadata: {
              full_name: 'Test User',
              avatar_url: 'https://example.com/avatar.jpg',
            },
          },
        },
      })),
    },
    from: jest.fn(() => ({
      select: jest.fn(async () => ({
        data: [
          { user_id: 1, user_name: 'John Doe', user_email: 'john@example.com' },
        ],
        error: null,
      })),
    })),
  })),
}))

describe('When the user tries to use any of the auth functionality', () => {
  // ✅ signinAction success
  describe('If the user tries to sign in', () => {
    fit('should sign in the user if user proided the correct and valid credentials', async () => {
      const formData = new FormData()
      formData.append('email', mockUserData.email)
      formData.append('password', mockUserData.password)

      const result = await signinAction(formData)
      expect(result.error).toBe(null)
      console.log(result)
    })

    //❌ error when the user gives invalid credentials
    fit('should return an error for invalid credentials such as mismatched password and email or none', async () => {
      const formData = new FormData()
      formData.append('email', 'wrong@example.com')
      formData.append('password', 'incorrect')

      const result = await signinAction(formData)
      expect(result.error).toBeDefined
      expect(result.error).toBe('Failed to log in: Invalid credentials')
      // expect(result).toEqual({ error: 'Failed to log in: Invalid credentials' })
      console.log(result)
    })

    //❌ error with zod verfication for non email
    fit('should return an error for invalid credentials such as mismatched password and email or none', async () => {
      const formData = new FormData()
      formData.append('email', 'wrong@example.com')
      formData.append('password', 'incorrect')

      const result = await signinAction(formData)
      expect(result.error).toBeDefined
      expect(result.error).toBe('Failed to log in: Invalid credentials')
      // expect(result).toEqual({ error: 'Failed to log in: Invalid credentials' })
      console.log(result)
    })
  })
})

describe('signUpAction', () => {
  it('should successfully sign up with valid data', async () => {
    const formData = new FormData()
    formData.append('email', 'test@example.com')
    formData.append('password', 'password')
    formData.append('name', 'Test User')

    const result = await signUpAction(formData)
    console.log(result)
  })

  it('should return an error for invalid data', async () => {
    const formData = new FormData()
    formData.append('email', 'invalid-email')
    formData.append('password', 'pass') // Too short

    const result = await signUpAction(formData)
    console.log(result)
  })
})

describe('signOutAction', () => {
  it('should successfully sign out when session exists', async () => {
    const result = await signOutAction()
    console.log(result)
  })
})

describe('fetchUsersAction', () => {
  it('should fetch users successfully', async () => {
    const result = await fetchUsersAction()
    console.log(result)
  })
})

describe('fetchUserInfoAction', () => {
  it('should fetch user info successfully', async () => {
    const result = await fetchUserInfoAction()
    console.log(result)
  })
})
