module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A7F72',
        primaryLight: '#4CB9A8',
        secondary: '#C4EFE7',
        background: '#EBF7F5',
        accent: '#3DAF9E',
        textPrimary: '#103B36',
        textSecondary: '#4F6B67',
        textMuted: '#6A8480',
        warning: '#DFA350',
        error: '#C05B4D',
        // Extended palette for UI variations
        brand: {
          primary: '#1A7F72',
          'primary-light': '#4CB9A8',
          'primary-dark': '#0F5A51',
          secondary: '#C4EFE7',
          'secondary-dark': '#9DD4CB',
          background: '#EBF7F5',
          'background-light': '#F5FBFA',
          accent: '#3DAF9E',
          'accent-light': '#66C4B6',
        },
        text: {
          primary: '#103B36',
          secondary: '#4F6B67',
          muted: '#6A8480',
          light: '#8FA09D',
        },
      },
      borderRadius: {
        xl: '16px',
        lg: '12px',
        md: '8px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 6px 24px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 8px 32px rgba(0, 0, 0, 0.08)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#103B36',
            'code': {
              backgroundColor: '#EBF7F5',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'pre': {
              backgroundColor: '#EBF7F5',
              color: '#103B36',
              borderRadius: '12px',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
