export default function (input, colorInputType = 'hex', colorOutputType = 'rgb') {
   if (colorInputType === 'hex' && colorOutputType === 'rgb') {
      const hex = input.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)

      return {
         r, g, b
      }
   }
}
