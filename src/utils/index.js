import React from 'react'

const deepTraverse = (nodes, targetNodeNames, iteratorFn) => {
   if (!Array.isArray(nodes)) nodes = [nodes]
   return nodes.map((node) => {
      if (node.type && targetNodeNames.includes(node.type.name)) {
         return iteratorFn(node)
      } else if (node.props && node.props.children) {
         const traversedChildren = deepTraverse(node.props.children, targetNodeNames, iteratorFn)
         return React.cloneElement(node, {}, traversedChildren)
      }
      return node
   })
}

export const replaceNodesInDOM = (nodes, targetNodeNames, iteratorFn) => {
   if (!Array.isArray(targetNodeNames)) targetNodeNames = [targetNodeNames]
   return deepTraverse(nodes, targetNodeNames, iteratorFn)
}

export const findNodesinDOM = (rootNodes, ...targetNodeNames) => {
   const results = []
   deepTraverse(rootNodes, targetNodeNames, child => results.push(child))
   return results
}

// TODO: Deprecate
export const mapRelevantChildren = replaceNodesInDOM

// export const mapRelevantChildren = (children, names, modifier) => {
//    let childrenNew = children
//    if (!Array.isArray(children)) childrenNew = [childrenNew]
//    return childrenNew.map((child) => {
//       if (names.indexOf(child.type.name) !== -1) {
//          return modifier(child)
//       } else if (child.props.children) {
//          return mapRelevantChildren(child.props.children, names, modifier)
//       }
//       return child
//    })
// }
