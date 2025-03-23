export const getTextColor = (red: number, green: number, blue: number): string => {
  return (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? "#000000" : "#ffffff"
}

const floatToRgb = (n: string) => {
  return (Math.round(Number(parseFloat(n).toFixed(2)) * 255).toString(16).padStart(2, '0'))
}

export const floatToHex = (red: string, green: string, blue: string) => {
  return `#${floatToRgb(red)}${floatToRgb(green)}${floatToRgb(blue)}`
}
