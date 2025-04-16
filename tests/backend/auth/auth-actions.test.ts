import {
  signinAction,
  signUpAction,
  signOutAction,
  fetchUsersAction,
  fetchUserInfoAction,
} from '../../../src/actions/users'

//🚨 Actual Database Interactions using API TEST should be tested using Edge Functions

import {
  mockUserData,
  wrongUserData,
  invalidUserData,
  getUsersMockResult,
} from './auth-mock-data'

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
    it('should sign in the user if user proided the correct and valid credentials', async () => {
      const formData = new FormData()
      formData.append('email', mockUserData.email)
      formData.append('password', mockUserData.password)

      const result = await signinAction(formData)
      expect(result.error).toBe(null)
    })

    //❌ error when the user gives invalid credentials
    it('should return an error for invalid credentials such as mismatched password and email or none', async () => {
      const formData = new FormData()
      formData.append('email', wrongUserData.email)
      formData.append('password', wrongUserData.password)

      const result = await signinAction(formData)
      expect(result.error).toBeDefined
      expect(result.error).toBe('Failed to log in: Invalid credentials')
    })

    //❌ error with zod verfication for non email format
    it('should return an error for invalid email format (missing @ or such)', async () => {
      const formData = new FormData()
      formData.append('email', invalidUserData.email)
      formData.append('password', mockUserData.password)

      const result = await signinAction(formData)
      expect(result.error).toBeDefined
      expect(result.error).toBe('Invalid Data Inputted: (Invalid Email Format)')
    })
    //❌ error with zod verfication for non password format
    it('should return an error for invalid password format (less than 5 chars)', async () => {
      const formData = new FormData()
      formData.append('email', mockUserData.email)
      formData.append('password', invalidUserData.password)

      const result = await signinAction(formData)
      expect(result.error).toBeDefined
      expect(result.error).toBe(
        'Invalid Data Inputted: (Invalid Password Format)'
      )
    })
  })

  // ✅ signUpAction success
  describe('if the user tries to sign up', () => {
    it('should successfully sign up the user if user provided the correct and valid format', async () => {
      const formData = new FormData()
      formData.append('email', mockUserData.email)
      formData.append('password', mockUserData.password)
      formData.append('name', mockUserData.name)

      const result = await signUpAction(formData)
      expect(result.error).toBe(null)
    })

    //❌ error with zod verfication for non email format
    it('should return an error for invalid email format', async () => {
      const formData = new FormData()
      formData.append('email', invalidUserData.email)
      formData.append('name', mockUserData.name)
      formData.append('password', mockUserData.password) // Too short

      const result = await signUpAction(formData)
      expect(result.error).toBeDefined
      expect(result.error).toBe('Invalid data Inputted: (Invalid Email Format)')
    })

    //❌ error with zod verfication for non password format
    it('should return an error for invalid password format', async () => {
      const formData = new FormData()
      formData.append('email', mockUserData.email)
      formData.append('name', mockUserData.name)
      formData.append('password', invalidUserData.password) // Too short

      const result = await signUpAction(formData)
      expect(result.error).toBeDefined
      expect(result.error).toBe(
        'Invalid data Inputted: (Invalid Password Format)'
      )
    })

    //❌ error with zod verfication for no name provided
    it('should return an error if no name was given', async () => {
      const formData = new FormData()
      formData.append('email', mockUserData.email)
      formData.append('password', mockUserData.password)

      const result = await signUpAction(formData)
      expect(result.error).toBeDefined
      expect(result.error).toBe('Invalid data Inputted: (No Name Provided)')
    })
  })

  // ✅ sucessful signOutAction
  describe('if the user tries to sign out', () => {
    it('should successfully sign out when session exists and do nothign when no session exists', async () => {
      const result = await signOutAction()
      expect(result.error).toBe(null)
    })
  })

  // ✅ sucessful featchUsersAction
  describe('if fetching all records from the users table on Supabase', () => {
    it('should fetch from the database if there are any', async () => {
      const result = await fetchUsersAction()
      expect(result[0].user_id).toBe(getUsersMockResult.user_id)
      expect(result[0].user_email).toBe(getUsersMockResult.user_email)
    })
  })
  // ✅ sucessful fetchUserInfoAction
  describe('if the function made by the developer is fetching data of the user', () => {
    it('should return the user data if the user is logged in', async () => {
      const result = await fetchUserInfoAction()
      expect(result).toBeDefined
      expect(result.full_name).toBe(mockUserData.name)
      expect(result.avatar_url).toBe(mockUserData.avatar_url)
    })
  })
})
