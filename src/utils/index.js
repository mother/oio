export const mapRelevantChildren = (children, names, modifier) => { // eslint-disable-line
   let childrenNew = children
   if (!Array.isArray(children)) childrenNew = [childrenNew]
   return childrenNew.map((child) => {
      if (names.indexOf(child.type.type) !== -1) {
         return modifier(child)
      } else if (child.props.children) {
         return mapRelevantChildren(child.props.children, names, modifier)
      }
      return child
   })
}
