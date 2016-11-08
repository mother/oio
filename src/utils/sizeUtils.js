export const getWindowSize = () => {
   const windowWidth = document.documentElement.clientWidth

   if (windowWidth >= 1650) {
      return 'e'
   } else if (windowWidth >= 1300) {
      return 'd'
   } else if (windowWidth >= 992) {
      return 'c'
   } else if (windowWidth >= 768) {
      return 'b'
   } else if (windowWidth >= 0) {
      return 'a'
   }

   return null
}

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
