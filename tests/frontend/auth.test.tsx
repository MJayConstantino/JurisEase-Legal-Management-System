import { render, screen } from '@testing-library/react'
import { HeaderProps } from '../../src/components/auth/Header'
import { Header } from '../../src/components/auth/Header'

const headerMockProps: HeaderProps = {
  title: 'Mock Title',
  subtitle: 'This is a mock subtitle',
  description: 'This is only a description whose only purpose is mocking',
}

describe('Render Non Interactive Components', () => {
  describe('Render Header Component', () => {
    test('should render the header component with the correct title', () => {
      // Arrange: Render the Header component with mock props
      render(<Header {...headerMockProps} />)

      // Act: Find the element by its title text
      const header = screen.getByText(headerMockProps.title)

      // Assert: Check that the element is in the document
      expect(header).toBeInTheDocument()
    })
  })
})
