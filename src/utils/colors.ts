export const getTextColor = (red: number, green: number, blue: number): string => {
  return (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? "#000000" : "#ffffff"
}
