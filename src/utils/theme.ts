export const theme = {
  colors: {
    primary: '#1565C0',
    primaryLight: '#E3F2FD',
    primaryDark: '#0D47A1',
    surface: '#FFFFFF',
    danger: '#D32F2F',
    success: '#2E7D32',
    warning: '#F57C00',
    text: '#212121',
    textSecondary: '#757575',
    background: '#F5F7FA',
    border: '#E0E0E0',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  shadow: {
    card: '0 2px 8px rgba(0,0,0,0.08)',
    button: '0 2px 4px rgba(0,0,0,0.15)',
    topBar: '0 1px 4px rgba(0,0,0,0.06)',
    bottomNav: '0 -1px 4px rgba(0,0,0,0.06)',
  },
} as const;
