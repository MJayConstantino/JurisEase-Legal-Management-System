import type { Preview } from '@storybook/react'
import '../src/app/globals.css'
import { themes } from '@storybook/theming'
const preview: Preview = {
  parameters: {
    docs: { theme: themes.dark },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
