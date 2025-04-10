import { render, screen } from '@testing-library/react'
import { Header, HeaderProps } from '../../../src/components/auth/Header'
import { Footer, FooterProps } from '../../../src/components/auth/Footer'
import '../../../jest.setup'

import user from '@testing-library/user-event'
import React from 'react'

const headerMockProps: HeaderProps = {
  title: 'Mock Title',
  subtitle: 'This is a mock subtitle',
  description: 'This is only a description whose only purpose is mocking',
}

const footerMockProps: FooterProps = {
  text: 'Go to',
  linkHref: 'mocklinkhref.com',
  linkText: 'mocklinkText',
}

describe('When rendering STATIC components', () => {
  describe('When the HEADER component is initialized with the mock data', () => {
    test('should render the header component with the correct title, subtitle and description', () => {
      render(<Header {...headerMockProps} />)
      const header = screen.getByText(headerMockProps.title)
      expect(screen.getByText(/this is a mock subtitle/i)).toBeInTheDocument()
      expect(screen.getByText(headerMockProps.description)).toBeInTheDocument()
      expect(header).toBeInTheDocument()
    })
  })
  describe('When the FOOTER component is initialized with the mock data', () => {
    test('should render the header component with the correct title, subtitle and description', () => {
      render(<Footer {...footerMockProps} />)
      const footer = screen.getByText(footerMockProps.linkText)
      // expect(screen.getByText(/this is a mock subtitle/i)).toBeInTheDocument()
      // expect(screen.getByText(headerMockProps.description)).toBeInTheDocument()
      expect(footer).toBeInTheDocument()
    })
  })
})
