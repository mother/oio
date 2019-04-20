export const breakpoints = [{
   name: 'a',
   key: '@media (min-width: 0px) and (max-width: 660px)'
}, {
   name: 'b',
   key: '@media (min-width: 660px) and (max-width: 1000px)'
}, {
   name: 'c',
   key: '@media (min-width: 1000px) and (max-width: 1350px)'
}, {
   name: 'd',
   key: '@media (min-width: 1350px) and (max-width: 1700px)'
}, {
   name: 'e',
   key: '@media (min-width: 1700px)'
}]

export const getWindowSize = () => {
   const windowWidth = document.documentElement.clientWidth

   if (windowWidth >= 1700) {
      return 'e'
   } else if (windowWidth >= 1350) {
      return 'd'
   } else if (windowWidth >= 1000) {
      return 'c'
   } else if (windowWidth >= 660) {
      return 'b'
   } else if (windowWidth >= 0) {
      return 'a'
   }

   return null
}

/* eslint-disable */
export const getAttributeForCurrentSize = (currentSize, attributeValue) => {
   let fragments = attributeValue.match(/(.+?)\[([abcdef,-]+)\]/ig)
   if (fragments === null) {
      fragments = [attributeValue]
   }

   for (let fragment of fragments) {
      fragment = fragment.trim()
      const charSet = fragment.match(/\[([abcdef,-]+)\]/i)
      if (Array.isArray(charSet) && charSet.length === 2) {
         const charRegexp = new RegExp(`[${charSet[1]}]`, 'i')
         const match = currentSize.match(charRegexp)
         if (Array.isArray(match)) {
            return fragment.replace(charSet[0], '').trim()
         }
      } else {
         return fragment.trim()
      }
   }

   return null
}
/* eslint-enable */

export const setAttributeForBreakpoints = (
   styleObj, attributeName, attributeProp, attributeFunction
) => {
   if (!attributeProp) {
      return null
   }

   breakpoints.forEach((breakpoint, index) => {
      const attributeValue = getAttributeForCurrentSize(breakpoint.name, attributeProp)

      if (attributeValue) {
         if (attributeFunction) {
            attributeFunction(styleObj, breakpoint, attributeValue)
         } else {
            styleObj[breakpoint.key][attributeName] = attributeValue
         }
      }
   })
}
