export const colors = {
  pink: '#F8D0D0', // Color(0xffF8D0D0)
  lightPink: '#FCEDED', // Color(0xffFCEDED)
  gray: '#505662', // Color(0xff505662)
  headingColor: '#4C3343', // Color(0xff4C3343)
  lightText: '#6C5A77', // Color(0xff6C5A77)
  darkText: '#2C2C2C', // Dark text color
  green: '#4CAF50', // Green for positive tab
  red: '#F44336', // Red for negative tab
} as const;

export type AppColors = typeof colors;

