// Presumeably will use this function to convert more than just RGB/hex
// May also use to convert from semantic things like: 'Grey'
export default function (input, colorInputType = 'hex', colorOutputType = 'rgb') {
   if (colorInputType === 'hex' && colorOutputType === 'rgb') {
      let hex = input.replace('#', '')

      // If 3-digit hex is passed, convert to 6-digit
      if (hex.length === 3) hex += hex

      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)

      return {
         r, g, b
      }
   }
}
