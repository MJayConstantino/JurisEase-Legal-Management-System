//✅  mockUser data for testing the function
export const mockUserData = {
  name: 'Test User',
  avatar_url: 'https://example.com/avatar.jpg',
  email: 'test@example.com',
  password: 'password',
}

export const invalidUserData = {
  name: '',
  email: 'invalidEmail',
  password: 'none',
}

export const wrongUserData = {
  email: 'wrong@example.com',
  password: 'incorrect',
}

export const getUsersMockResult = {
  user_id: 1,
  user_name: 'John Doe',
  user_email: 'john@example.com',
}
